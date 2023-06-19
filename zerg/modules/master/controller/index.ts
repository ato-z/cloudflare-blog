import { Module } from '@ato-z/ioc';
import { ControllerMasterV1 } from './v1';

export const moduleMaster = new Module({
  prefix: 'master',
  controller: [ControllerMasterV1],
});
