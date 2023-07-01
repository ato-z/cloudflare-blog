import { Module } from '@ato-z/ioc';
import { ControllerPasserbyV1 } from './v1';

export const modulePasserby = new Module({
  prefix: 'passerby',
  controller: [ControllerPasserbyV1],
});
