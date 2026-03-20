import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

function SignUpPage() {
  const navigate = useNavigate();
  const { signup, isSigningUp } = useAuthStore();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signup(formData);
    if (res) navigate("/login");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-center">Create Account</h1>

        <input
          type="text"
          placeholder="Full Name"
          className="input input-bordered w-full"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        />

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

        <button className="btn btn-primary w-full" disabled={isSigningUp}>
          {isSigningUp ? "Creating..." : "Sign Up"}
        </button>

        <p className="text-sm text-center">
          Already have an account? <Link to="/login" className="link link-primary">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUpPage;