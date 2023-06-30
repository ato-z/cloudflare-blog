import { Module } from '@ato-z/ioc';
import { ControllerNoteV1 } from './v1';

export const moduleNote = new Module({
  prefix: 'note',
  controller: [ControllerNoteV1],
});
