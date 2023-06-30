import { Module } from '@ato-z/ioc';
import { ControllerExceptionV1 } from './v1';

export const moduleException = new Module({
  prefix: 'exception',
  controller: [ControllerExceptionV1],
});
