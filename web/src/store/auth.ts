import { atom, useAtom } from 'jotai';

const sign = window.localStorage.getItem('sign');
export const signAtom = atom(sign, (get, set, newPrice: string) => {
  if (get(signAtom) !== newPrice) {
    set(signAtom, newPrice);
    window.localStorage.setItem('sign', newPrice);
  }
});
export const useSign = () => useAtom(signAtom);
