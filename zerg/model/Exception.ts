import { ModelBase } from './Base';

export type Exception = {
  id: number;
  url: string;
  method: string;
  header: string;
  body: string;
  params: string;
  message: string;
  stack?: string;
  createDate: string;
};

export class ModelException extends ModelBase<Exception> {
  name = 'exception';
  hideing = [];
  appending = {};
  getting = {};
}
