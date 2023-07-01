import { ModelBase } from './Base';

export type PasserbyIp = {
  id: number;
  ip: string;
  total: number;
  from: string;
  createDate: string;
  lastTime: number;
  lastDate: string;
};

export class ModelPasserbyIp extends ModelBase<PasserbyIp> {
  name = 'passerbyIp';
  hideing = [];
  appending = {};
  getting = {};
}
