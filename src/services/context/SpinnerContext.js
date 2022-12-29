import React, {createContext, useState} from 'react';

const SpinnerContext = createContext();

export const SpinnerContextProvider = ({children}) => {
  const [spinConfig, setSpinConfig] = useState({visible: false, text: 'Loading...'});

  return (
    <SpinnerContext.Provider value={[spinConfig, setSpinConfig]}>
      {children}
    </SpinnerContext.Provider>
  );
};

export default SpinnerContext;
