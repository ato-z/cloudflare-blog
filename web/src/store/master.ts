import { masterDataGet } from '@web/api';
import { tailErr } from '@web/helper';
import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';

export const masterAtom = atom<Master | null>(null);
export const useMaster = () => {
  const [master, setMaster] = useAtom(masterAtom);

  useEffect(() => {
    if (master === null) {
      masterDataGet()
        .then(master => setMaster(master))
        .catch(tailErr);
    }
  }, [setMaster]);

  return [
    master,
    (post: Partial<Master>) =>
      setMaster({ ...(master ?? {}), ...post } as Master),
  ] as const;
};
