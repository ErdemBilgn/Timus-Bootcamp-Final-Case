import { Injectable } from '@nestjs/common';
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
      return result.hits;
    } catch (err) {
      return err;
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
