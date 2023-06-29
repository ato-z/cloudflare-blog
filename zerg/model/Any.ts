import { ModelBase } from './Base';

export class ModelAny extends ModelBase<any> {
  getting = {};
  // 隐藏字段
  hideing = [];
  // 可见字段
  appending = {};

  tablePrefix = '';

  constructor(public override name: string) {
    super();
  }
}
