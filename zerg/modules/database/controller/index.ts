import { Module } from '@ato-z/ioc';
import { ControllerDatabaseV1 } from './v1';

export const moduleDatabase = new Module({
  prefix: 'database',
  controller: [ControllerDatabaseV1],
});
