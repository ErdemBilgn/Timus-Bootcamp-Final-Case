import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from 'src/auth/dto';
import { ElasticService } from 'src/elastic/elastic.service';

@Injectable()
export class UsersService {
  constructor(private readonly elasticService: ElasticService) {}
  async getAllUsers() {
    try {
      const result = await this.elasticService
        .getElasticSearchService()
        .search({
          index: 'users',
          query: { match_all: {} },
        });
      return result.hits.hits;
    } catch (err) {
      return err;
    }
  }

  async getMe(userId: string) {
    try {
      const result = await this.elasticService.getElasticSearchService().get({
        index: 'users',
        id: userId,
      });
      return result;
    } catch (err) {
      return err;
    }
  }

  async updateMe(userId: string, dto: UpdateUserDto) {
    try {
      console.log(dto);
      const result = await this.elasticService
        .getElasticSearchService()
        .update({
          index: 'users',
          id: userId,
          doc: {
            name: dto.name,
            email: dto.email,
            authority: dto.authority,
          },
        });
      return result;
    } catch (err) {
      throw err;
    }
  }

  async deleteSingleUser(id: string) {
    try {
      const result = this.elasticService.getElasticSearchService().delete({
        index: 'users',
        id: id,
      });
      return result;
    } catch (err) {
      return err;
    }
  }

  createIndice() {
    return this.elasticService.createIndice('users');
  }
}
