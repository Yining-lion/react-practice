"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";

export default function LoginForm() {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let router = useRouter();
  
    async function handleLogin(e: React.FormEvent) {
      e.preventDefault();
      try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("登入成功");
        router.push("/home");
      } catch (err: any) {
        alert("登入失敗：" + err.message);
      }
    }
  
    return (
      <form onSubmit={handleLogin} className="flex flex-col items-center space-y-3">
        <h2 className="text-lg font-bold text-center">登入系統</h2>
        <input
          type="email"
          placeholder="電郵"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="密碼"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button type="submit" className="w-24 bg-gray-200 py-2 rounded hover:bg-gray-300 cursor-pointer">
          登入
        </button>
      </form>
    );
  }

