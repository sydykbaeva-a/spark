import { ConfigModule } from '@nestjs/config';

import { DataSource } from 'typeorm';

import typeormDatasourceOptions from './ config-service-data-source';

// This file allows you to run the TypeORM CLI for commands that require a
// data-source file (e.g. generating migrations): you can provide the path
// to this file, and the CLI is able to run it and get the DataSource object.

ConfigModule.forRoot({
  isGlobal: true,
  load: [typeormDatasourceOptions],
});

export default new DataSource({
  ...typeormDatasourceOptions(),
  // If we include this option in typeormDatasourceOptions, then it's
  // configured for TypeORM when NestJS runs, and this tries to load the
  // migration classes and complains about importing outside a module (I think
  // it's loading TS files in a JS context).
  //
  // We don't need TypeORM to know about migrations outside CLI usage, so a
  // simple way to solve this is to only add the directory here:
  migrations: ['./migrations/**/*.ts'],
});
