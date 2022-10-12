import React, { createContext, useContext } from "react";

import { RootStore } from './store/PlaceOrderStore';

const store = new RootStore();
const storeContext = createContext(store);

const useStore = () => {
  return useContext(storeContext);
};

const StoreProvider: React.FC = ({ children }) => (
  <storeContext.Provider value={store}>{children}</storeContext.Provider>
);

export { useStore, StoreProvider };
