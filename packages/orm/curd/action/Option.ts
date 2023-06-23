/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { WhereParmaValue } from '../core/ParseWhereParams';

export interface Option<T> {
  where?: {
    and?: {
      [P in keyof T]?: WhereParmaValue;
    };
    or?: {
      [P in keyof T]?: WhereParmaValue;
    };
  };
  join?: 'AND' | 'OR';
  order?: [keyof T & string, 'DESC' | 'ASC'];
}

export interface SelectOption<T> extends Option<T> {
  field?: Array<keyof T & string> | string;
  limit?: number | [number, number];
}

export interface UpdateOption<T> extends Option<T> {
  limit?: number;
}

export interface DeleteOption<T> extends Option<T> {
  limit?: number;
}
