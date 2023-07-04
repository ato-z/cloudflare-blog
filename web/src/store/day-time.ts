import { atom, useAtom, SetStateAction } from 'jotai';

const dayStepAtom = atom(0);

export const useDayStep = () => useAtom(dayStepAtom);
