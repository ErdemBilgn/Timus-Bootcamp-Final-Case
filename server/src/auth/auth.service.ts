import { ForbiddenException, Injectable } from '@nestjs/common';
import { LoginDto, SignUpDto } from './dto';
import { ElasticService } from 'src/elastic/elastic.service';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private readonly elasticService: ElasticService) {}
  async signup(dto: SignUpDto) {
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
      const hash = await argon.hash(dto.password);
      // save the new user in the db

      const result = await this.elasticService.getElasticSearchService().index({
        index: 'users',
        document: {
          name: dto.name,
          email: dto.email,
          hashedPassword: hash,
          authority: dto.authority,
        },
      });

      return result;
    } catch (err) {
      return err.response;
    }
  }

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
      const pwMatches = await argon.verify(
        user._source['hashedPass'],
        dto.password,
      );

      if (!pwMatches) throw new ForbiddenException('Password is incorrect');

      delete user._source['hashedPass'];
      return user;
    } catch (err) {
      return err.response;
    }
  }
}
