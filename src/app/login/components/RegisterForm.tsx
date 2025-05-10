"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("註冊成功");
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert("登入失敗：" + err.message);
      }
    }
  }

  return (
    <form onSubmit={handleRegister} className="flex flex-col items-center space-y-3">
      <h2 className="text-lg font-bold text-center">註冊帳戶</h2>
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
        註冊
      </button>
    </form>
  );
}
