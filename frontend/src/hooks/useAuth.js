import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { useRouter } from "next/router";
import { setCookie, getCookie, deleteCookie } from "cookies-next";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const router = useRouter();

  useEffect(() => {
    let isAuthenticated = getCookie("isAuthenticated");
    if (isAuthenticated != true) {
      if (router.pathname !== "/") {
        router.push("/");
      }
    } else {
      if (router.pathname == "/") {
        router.push("/machine");
      }
    }
  }, [children]);

  async function signIn(userName, password) {
    let user = userName;
    let pass = password;
    await api
      .post(`/auth/login`, {
        userName: `${user}`,
        password: `${pass}`,
      })
      .then((response) => {
        const accessToken = response.data;
        console.log(response.data);
        setCookie("accessToken", accessToken, 0.1);
        setCookie("isAuthenticated", true, 0.1);
        router.push("/machine", undefined, {
          shallow: true,
        });
      })
      .catch((error) => alert("Login failure, Please try again"));
  }

  function logout() {
    deleteCookie("accessToken");
    deleteCookie("isAuthenticated");
    router.push("/");
  }

  return (
    <AuthContext.Provider value={{ signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const auth = useContext(AuthContext);
  return auth;
}

export { AuthContext, AuthProvider, useAuth };
