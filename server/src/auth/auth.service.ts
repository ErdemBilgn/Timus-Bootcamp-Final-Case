import { ForbiddenException, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto';
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
      return err;
    }
  }

  signin() {}
}
