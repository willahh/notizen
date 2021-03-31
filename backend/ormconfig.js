module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'wravel',
  password: 'password',
  database: 'notizen',
  entities: ['dist/**/*.entity{.ts,.js}'], // Fix needed to works @see https://docs.nestjs.com/techniques/database
  migrations: ['/Users/willahh/www/projects/notizen/backend/dist/migrations/*.js'], // TODO: Fix path
  cli: {
    migrationsDir: 'src/migrations',
  },
};
