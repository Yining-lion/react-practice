import LoginForm from "./login/components/LoginForm";
import RegisterForm from "./login/components/RegisterForm";

export default function LoginPage() {
  return (
    <div className="p-6 max-w-[300px] mx-auto space-y-10">
      <LoginForm />
      <RegisterForm />
    </div>
  );
}