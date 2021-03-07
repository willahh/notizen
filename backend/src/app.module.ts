import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { NotesModule } from './notes/notes.module';
import { UsersModule } from './users/users.module';
import { TagsModule } from './tags/tags.module';
require('dotenv').config();

// TODO: Setup a simple environement process to avoid the use of conditions
let host = '';
if (process.env.DB_INSTANCE_NAME) { // prod
  host = `/cloudsql/${process.env.DB_INSTANCE_NAME}/`;
} else {
  host = process.env.HOST;
}
const port = Number(process.env.DATABASE_PORT);
const user = process.env.DATABASE_USER;
const password = process.env.DATABASE_PASSWORD;
const database = process.env.DATABASE_NAME;

console.log('-----');
console.log('Start backend with env variables :');
console.log('host', host);
console.log('port', port);
console.log('user', user);
console.log('database', database);
console.log('-----');

@Module({
  imports: [
    ConfigModule,
    NotesModule,
    UsersModule,
    TagsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: host,
      port: port,
      username: user,
      password: password,
      database: database,
      entities: ['dist/**/*.entity{.ts,.js}'], // Fix needed to works @see https://docs.nestjs.com/techniques/database
      // synchronize: true, // TODO: Dev only !
      logging: true,
    }),
  ],
})
export class AppModule {}
