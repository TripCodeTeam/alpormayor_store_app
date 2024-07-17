"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import Cookies from "js-cookie";

import { AdminEditAuth } from "@/types/Admin";

interface GlobalContextType {
  user: AdminEditAuth | null;
  loading: boolean;
  setUserData: (userData: AdminEditAuth) => void;
  handleLogout: () => void;
  startLoading: () => void;
  stopLoading: () => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminEditAuth | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const infoSession = Cookies.get("userData");
    if (infoSession) {
      setUser(JSON.parse(infoSession));
    }
  }, []);

  const setUserData = (userData: AdminEditAuth) => {
    setUser(userData);
    Cookies.set("userData", JSON.stringify(userData), { expires: 1 });
  };

  const handleLogout = () => {
    setUser(null);
    Cookies.remove("userData");
  };

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  return (
    <GlobalContext.Provider
      value={{
        user,
        loading,
        setUserData,
        handleLogout,
        startLoading,
        stopLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
}
