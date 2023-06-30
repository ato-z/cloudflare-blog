import { ModelBase } from './Base';

export type Note = {
  id: number;
  title: string;
  tags: string;
  content: string;
  createDate: string;
  updateDate: string;
  deleteDate?: string | null;
};

export class ModelNote extends ModelBase<Note> {
  name = 'note';
  hideing = ['deleteDate'] as const;
  appending = {};
  getting = {};
}
