import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class ElasticService {
  constructor(private elasticsearchService: ElasticsearchService) {}

  getElasticSearchService() {
    return this.elasticsearchService;
  }

  async createIndice(indexName) {
    this.elasticsearchService.indices.create({ index: indexName });
  }
}
