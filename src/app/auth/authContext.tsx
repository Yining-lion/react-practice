// Context Provider Pattern
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../lib/firebase";

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) { // React.ReactNode： 表示可以被渲染的所有內容 (TypeScript 中的型別)
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => { // Firebase 的 onAuthStateChanged() 方法會回傳一個函式，這個函式的用途是拿來取消這個監聽器
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe(); // 元件卸載時清除監聽器
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}> {/* value={...} 是 Context 傳遞資料的唯一入口*/}
      {children}
    </AuthContext.Provider>
  ); // <AuthProvider> 用在 layout.tsx
}

export const useAuth = () => useContext(AuthContext);
