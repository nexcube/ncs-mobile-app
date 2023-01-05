import React, {createContext, useState} from 'react';

const UserContext = createContext();

export const UserContextProvider = ({children}) => {
  const [user, setUser] = useState({});

  const isHO = user.departCode === 'EPXHEAD' || user.departCode === 'CHBHEAD';

  return <UserContext.Provider value={[user, setUser, isHO]}>{children}</UserContext.Provider>;
};

export default UserContext;
