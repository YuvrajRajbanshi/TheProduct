import { useState, useEffect } from "react";
import {
  getUser,
  getToken,
  setUser,
  setToken,
  clearAuthData,
  removeUser,
  removeToken,
} from "../utils/storage";

export const useAuth = () => {
  const [user, setUserState] = useState(null);
  const [token, setTokenState] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize from localStorage
    const storedUser = getUser();
    const storedToken = getToken();

    setUserState(storedUser);
    setTokenState(storedToken);
    setIsLoading(false);
  }, []);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    setUserState(userData);
    setTokenState(authToken);
  };

  const logout = () => {
    clearAuthData();
    setUserState(null);
    setTokenState(null);
  };

  const isAuthenticated = !!token;

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
};
