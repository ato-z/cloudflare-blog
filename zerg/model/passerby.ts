import { ModelBase } from './Base';

export type Passerby = {
  id: number;
  email: string;
  nickname: string;
  lastIp: string;
  createDate: string;
};

export class ModelPasserby extends ModelBase<Passerby> {
  name = 'passerby';
  hideing = [];
  appending = {};
  getting = {};
}
