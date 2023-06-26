import { Module } from '@ato-z/ioc';
import { ControllerUploadV1 } from './v1';

export const moduleUpload = new Module({
  prefix: 'upload',
  controller: [ControllerUploadV1],
});
