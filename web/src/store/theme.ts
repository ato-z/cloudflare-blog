import { atom, useAtom } from 'jotai';

export const themeAtom = atom(() => {
  const timeTheme = new Date().getHours() >= 20 ? 'dark' : 'light';
  return timeTheme;
});

export const useTheme = () => useAtom(themeAtom);
