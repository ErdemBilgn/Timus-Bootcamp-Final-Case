import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { FactoriesDto } from './dto';

@Injectable()
export class FactoriesService {
  constructor(@Inject('POOL') private readonly pool: Pool) {}

  /* GET ALL FACTORIES */

  async getAllFactories() {
    try {
      const result = await this.pool.query(
        `
        SELECT * FROM factories
      `,
      );
      return result.rows;
    } catch (err) {
      return err;
    }
  }

  /* GET SINGLE FACTORY BY ID */

  async getSingleFactory(id: number) {
    try {
      const result = await this.pool.query(`
        SELECT * FROM factories WHERE id = ${id}
      `);

      return result.rows;
    } catch (err) {
      return err;
    }
  }

  /* CREATE FACTORY */

  async insertFactory(dto: FactoriesDto) {
    try {
      const result = await this.pool.query(
        `
        INSERT INTO factories (firm_name, membership_date, membership_end_date, employee_count, free_member)
        VALUES
          ('${dto.firm_name}','${dto.membership_date}', '${dto.membership_end_date}', ${dto.employee_count}, ${dto.free_member})
      `,
      );
      return result;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  /* UPDATE A FACTORY */
  async updateFactory(id: number, dto: FactoriesDto) {
    try {
      const result = await this.pool.query(`
        UPDATE factories
        SET firm_name = '${dto.firm_name}', membership_date = '${dto.membership_date}', membership_end_date = '${dto.membership_end_date}', employee_count = ${dto.employee_count}, free_member = ${dto.free_member}
        WHERE id = ${id}
      `);

      return result;
    } catch (err) {
      return err;
    }
  }

  /* DELETE A FACTORY */

  async deleteSingleFactory(id: number) {
    try {
      const result = await this.pool.query(`
        DELETE FROM factories WHERE id = ${id}
      `);

      return result;
    } catch (err) {
      return err;
    }
  }

  /*  --------------------------------  TABLE CREATOR FUNCTIONS  -------------------------------- */
  async createFactoryTable() {
    try {
      const result = await this.pool.query(
        `
          CREATE TABLE IF NOT EXISTS factories(
            id SERIAL PRIMARY KEY,
            firm_name TEXT NOT NULL,
            membership_date DATE NOT NULL,
            membership_end_date DATE NOT NULL,
            employee_count INT NOT NULL,
            free_member BOOLEAN NOT NULL
          )
        `,
      );

      return result;
    } catch (err) {
      return err;
    }
  }
}
