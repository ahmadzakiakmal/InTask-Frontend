import React, { createContext, useState } from "react";

// Create the LoadingContext
export const LoadingContext = createContext();

// Create the LoadingContextProvider component
export const LoadingContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
