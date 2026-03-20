import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

function LoginPage() {
  const { login, isLoggingIn } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />

        <button className="btn btn-primary w-full" disabled={isLoggingIn}>
          {isLoggingIn ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-center">
          Don’t have an account? <Link to="/signup" className="link link-primary">Sign up</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;