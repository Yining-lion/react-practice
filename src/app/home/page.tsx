"use client";

import { useAuth } from "../auth/authContext";
import { useRouter } from "next/navigation";
import { auth } from "../lib/firebase"
import RegisterForm from "../login/components/RegisterForm";
import ProtectedRoute from "../auth/ProtectedRoute";

export default function LoginPage() {
    const { user } = useAuth();
    const router = useRouter();

    const handleStart = () => {
        router.push("/record");
      };
    
    const handleLogout = () => {
        auth.signOut();
        router.push("/login");
    };

    return (
        <ProtectedRoute>
            <div className="p-6 w-300 mx-auto space-y-5">
                <h1 className="text-center text-xl">
                您已經使用 {user?.email} 登入
                </h1>
                <div className="flex justify-center" >
                    <button
                        className="w-24 bg-gray-200 py-2 rounded hover:bg-gray-300 cursor-pointer mr-5"
                        onClick={handleStart}
                    >
                    立刻開始
                    </button>
                    <button
                        className="w-24 bg-gray-200 py-2 rounded hover:bg-gray-300 cursor-pointer"
                        onClick={handleLogout}
                    >
                    登出
                    </button>
                </div>
                <div className="p-6 max-w-[300px] mx-auto space-y-5">
                    <RegisterForm />
                </div>
            </div>
        </ProtectedRoute>
        
    );
}