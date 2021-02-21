import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { NotesModule } from './notes/notes.module';
require('dotenv').config()
 
@Module({
  imports: [
    ConfigModule,
    NotesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: ['dist/**/*.entity{.ts,.js}'], // Fix needed to works @see https://docs.nestjs.com/techniques/database
      // synchronize: true, // TODO: Dev only !
      logging: true,
    }),
  ]
})
export class AppModule {}
