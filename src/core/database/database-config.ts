import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { CreateUsersTable } from '../migrations/migrationJustname';
import { User } from 'src/modules/auth/entities/auth.entity';
import { Class } from 'src/modules/class/entities/class.entity';
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DB_HOST,
      port: 5432,
      username: DB_USER,
      password: DB_PASSWORD,
      database: 'nestpractice',
      entities: [User, Class],
      synchronize: true,
      // migrations: [CreateUsersTable],
      // migrationsTableName: 'typeORM_migration',
    }),
  ],
})
export class DatabaseModule {}
