import { ModelBase } from './Base';

export type Master = {
  id: number;
  name: string;
  nickname: string;
  cover: number;
  intro: string;
  password: string;
  createDate: string;
  deleteDate?: string;
};

export class ModelMaster extends ModelBase<Master> {
  name = 'master';
  hideing = ['deleteDate'] as const;
  appending = {};
  getting = {};
}
