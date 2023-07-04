import { atom, useAtom } from 'jotai';

type Theme = 'dark' | 'light';
const readAtom = atom(<Theme>window.sessionStorage.getItem('theme'));

export const themeAtom = atom(
  get => {
    const theme = get(readAtom);
    if (theme !== null) {
      return theme;
    }
    const timeTheme = new Date().getHours() >= 20 ? 'dark' : 'light';
    return timeTheme;
  },
  (get, set, newVal: Theme) => {
    set(readAtom, newVal);
    window.sessionStorage.setItem('theme', newVal);
  },
);

export const useTheme = () => useAtom(themeAtom);
