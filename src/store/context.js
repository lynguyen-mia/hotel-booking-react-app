import { createContext, useContext, useState } from "react";
export const Context = createContext();

export const ContextProvider = (props) => {
  const [searchFields, setSearchFields] = useState({});

  return (
    <Context.Provider value={{ searchFields, setSearchFields }}>
      {props.children}
    </Context.Provider>
  );
};

export const useMyContext = () => useContext(Context);
