import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [filters, setFilters] = useState(null);

  return (
    <AppContext.Provider value={{ messages, setMessages, filters, setFilters }}>
      {children}
    </AppContext.Provider>
  );
};
