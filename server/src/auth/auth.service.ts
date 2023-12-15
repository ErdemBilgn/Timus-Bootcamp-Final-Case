import { ForbiddenException, Injectable } from '@nestjs/common';
import { LoginDto, SignUpDto } from './dto';
import { ElasticService } from 'src/elastic/elastic.service';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly elasticService: ElasticService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /* -------------------  SIGNUP LOGIC  -------------------*/

  async signup(dto: SignUpDto): Promise<Tokens> {
    try {
      // Check for existing users for the passed email
      const hitUsers = await this.elasticService
        .getElasticSearchService()
        .search({
          index: 'users',
          query: { term: { 'email.keyword': { value: dto.email } } },
        });

      if (hitUsers.hits.hits.length !== 0)
        throw new ForbiddenException('Credentials taken');

      // generate the password hash
      const hash = await this.hashData(dto.password);

      // save the new user in the db
      const result = await this.elasticService.getElasticSearchService().index({
        index: 'users',
        document: {
          name: dto.name,
          email: dto.email,
          authority: dto.authority,
          hashedPassword: hash,
        },
      });

      const tokens = await this.signTokens(
        result._id,
        dto.name,
        dto.email,
        dto.authority,
      );
      await this.updateRtHash(result._id, tokens.refresh_token);
      return tokens;
    } catch (err) {
      return err.response;
    }
  }

  /* -------------------  LOGIN LOGIC  -------------------*/

  async login(dto: LoginDto) {
    try {
      const result = await this.elasticService
        .getElasticSearchService()
        .search({
          index: 'users',
          query: { term: { 'email.keyword': { value: dto.email } } },
        });

      if (result.hits.hits.length === 0) {
        throw new ForbiddenException('Email is incorrect');
      }
      const user = result.hits.hits[0];
      const passwordMatches = await argon.verify(
        user._source['hashedPassword'],
        dto.password,
      );

      if (!passwordMatches) {
        console.log('error');
        throw new ForbiddenException('Password is incorrect');
      }

      const tokens = await this.signTokens(
        user._id,
        user._source['name'],
        user._source['email'],
        user._source['authority'],
      );
      await this.updateRtHash(user._id, tokens.refresh_token);

      delete user._source['hashedPassword'];
      return {
        user,
        tokens,
      };
    } catch (err) {
      return err.response;
    }
  }

  /* -------------------  LOGOUT LOGIC  -------------------*/

  async logout(userId: string) {
    try {
      await this.elasticService.getElasticSearchService().update({
        index: 'users',
        id: userId,
        doc: {
          hashedRT: null,
        },
      });
    } catch (err) {
      return err;
    }
  }

  /* -------------------  REFRESH TOKENS  -------------------*/

  async refreshTokens(userId: string, rt: string) {
    try {
      const user = await this.elasticService.getElasticSearchService().get({
        index: 'users',
        id: userId,
      });

      if (!user || !user._source['hashedRT'])
        throw new ForbiddenException('Access Denied');

      const rtMatches = await argon.verify(user._source['hashedRT'], rt);

      if (!rtMatches) throw new ForbiddenException('Access Denied');

      const tokens = await this.signTokens(
        user._id,
        user._source['name'],
        user._source['email'],
        user._source['authority'],
      );
      await this.updateRtHash(user._id, tokens.refresh_token);

      return tokens;
    } catch (err) {
      return err;
    }
  }

  /* -------------------  HELPERS  -------------------*/

  // hashes the data passed in
  async hashData(data: string) {
    return await argon.hash(data);
  }

  // Signs an access token and a refresh token and returns them as Tokens type.
  async signTokens(
    userId: string,
    name: string,
    email: string,
    authority: string,
  ): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          name,
          email,
          authority,
        },
        {
          secret: this.configService.get('ACCESS_TOKEN_SECRET_KEY'),
          expiresIn: 15 * 60,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          name,
          email,
          authority,
        },
        {
          secret: this.configService.get('REFRESH_TOKEN_SECRET_KEY'),
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  // Hashes the refresh token and saves it in the db.
  async updateRtHash(userId: string, rt: string) {
    const hash = await this.hashData(rt);
    await this.elasticService.getElasticSearchService().update({
      index: 'users',
      id: userId,
      doc: {
        hashedRT: hash,
      },
    });
  }
}
