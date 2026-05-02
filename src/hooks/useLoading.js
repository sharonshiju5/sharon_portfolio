import { createContext, useContext, useState, useCallback } from "react";

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [ready, setReady] = useState({ projects: false, tools: false });

  const markReady = useCallback((key) => {
    setReady((prev) => ({ ...prev, [key]: true }));
  }, []);

  const allReady = ready.projects && ready.tools;

  return (
    <LoadingContext.Provider value={{ allReady, markReady }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(LoadingContext);
}
