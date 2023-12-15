import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { FactoryDetailsDto } from './dto';

@Injectable()
export class FactoryDetailsService {
  constructor(@Inject('POOL') private readonly pool: Pool) {}

  /* GET ALL FACTORY DETAILS */

  async getAllFactoryDetails() {
    try {
      const result = await this.pool.query(`
        SELECT * FROM factoryDetails
      `);

      return result.rows;
    } catch (err) {
      return err;
    }
  }

  /* GET SINGLE FACTORY DETAIL BY ITS OWN ID */

  async getSingleFactoryDetail(id: number) {
    try {
      const result = await this.pool.query(`
        SELECT * FROM factoryDetails WHERE id = ${id}
      `);

      return result.rows;
    } catch (err) {
      return err;
    }
  }

  /* INSERT FACTORY DETAILS */
  async insertFactoryDetails(dto: FactoryDetailsDto) {
    try {
      const result = await this.pool.query(
        `
        INSERT INTO factoryDetails (firm_id, unit, date_range, usage_kw, usage_price, discounted_price)
        VALUES
          (${dto.firmId},'${dto.unit}','(${dto.startDate}, ${dto.endDate})', ${dto.usageKw}, ${dto.usagePrice}, ${dto.discountedPrice})
      `,
      );

      return result.command;
    } catch (err) {
      return err;
    }
  }

  /* UPDATE A SINGLE FACTORY DETAIL */

  async updateSingleFactoryDetail(id: number, dto: FactoryDetailsDto) {
    try {
      const result = await this.pool.query(`
        UPDATE factoryDetails
        SET unit = '${dto.unit}', date_range = '(${dto.startDate}, ${dto.endDate})', usage_kw = ${dto.usageKw}, usage_price = ${dto.usagePrice}, discounted_price = ${dto.discountedPrice}
        WHERE id = ${id}
      `);

      return result.command;
    } catch (err) {
      return err;
    }
  }

  /* DELETE A SINGLE FACTORY DETAIL */

  async deleteSıngleFactoryDetail(id: number) {
    try {
      const result = await this.pool.query(`
        DELETE FROM factoryDetails WHERE id = ${id}
      `);

      return result.command;
    } catch (err) {
      return err;
    }
  }

  /* GET ALL FACTORY DETAILS FOR A FACTORY BY firm_id */

  async getAllDetailsForFactory(firmId: number) {
    try {
      const result = await this.pool.query(`
        SELECT * FROM factoryDetails WHERE firm_id = ${firmId}
      `);

      return result.rows;
    } catch (err) {
      return err;
    }
  }

  /* DELETE ALL FACTORY DETAILS FOR A FACTORY BY firm_id */

  async deleteAllDetalsForFactory(firmId: number) {
    try {
      const result = await this.pool.query(`
        DELETE FROM factoryDetails WHERE firm_id = ${firmId}
      `);

      return result.command;
    } catch (err) {
      return err;
    }
  }

  async createFactoryDetailsTable() {
    try {
      const result = await this.pool.query(
        `
          CREATE TABLE IF NOT EXISTS factoryDetails(
            id SERIAL PRIMARY KEY,
            firm_id INT REFERENCES factories(id) NOT NULL,
            unit TEXT NOT NULL,
            date_range DATERANGE NOT NULL,
            usage_kw INT NOT NULL,
            usage_price INT NOT NULL,
            discounted_price BOOLEAN NOT NULL
          )
        `,
      );

      return result;
    } catch (err) {
      return err;
    }
  }
}
