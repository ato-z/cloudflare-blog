/**
 * 面包屑
 */
import { atom, useAtom } from 'jotai';

export const navsAtom = atom<
  Array<{
    title: string;
    path: string;
  }>
>([]);
export const useNavs = () => useAtom(navsAtom);
