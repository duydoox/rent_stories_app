import { useContext, useRef } from 'react';

const usePopup = () => {
  return useContext(PopupContext);
};

export default usePopup;

import React, { useCallback, useMemo, useState } from 'react';
import { CustomModal } from '@/components';

export type PopupT = {
  status?: boolean;
  visible?: (c: React.ReactNode) => void;
  hiden?: () => void;
};

export const PopupContext = React.createContext<PopupT>({});

export const PopupProvider = ({ children }: { children: React.ReactNode }) => {
  const [status, setStatus] = useState(false);
  const child = useRef<React.ReactNode>();

  const visible = useCallback((c: React.ReactNode) => {
    child.current = c;
    setStatus(true);
  }, []);

  const hiden = useCallback(() => {
    setStatus(false);
  }, []);

  const contextValue = useMemo<PopupT>(
    () => ({
      status,
      visible,
      hiden,
    }),
    [status, visible],
  );

  return (
    <PopupContext.Provider value={contextValue}>
      {children}
      <CustomModal visivle={status} onBackButtonPress={() => setStatus(false)}>
        {child.current}
      </CustomModal>
    </PopupContext.Provider>
  );
};
