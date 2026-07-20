import { useAuth } from "./AuthContext";
import { useState } from "react";

export default function Profile() {
  const { user, login, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    setError("");
    const endpoint = isRegistering ? "register" : "login";

    try {
      const res = await fetch(`http://localhost:3000/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) return setError(data.message);

      login({ token: data.token, email }); // auto login
    } catch {
      setError("Something went wrong");
    }
  }

  if (user) {
    return (
      <div className="auth-page">
        <div className="auth-center">
          <div className="auth-card">
            <div className="avatar">
              {user.email[0].toUpperCase()}
            </div>

            <p className="handwriting">hey,</p>
            <p className="user-email">{user.email}</p>

            <button className="primary-btn" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <p className="handwriting top-text">
        {isRegistering ? "join the club." : "welcome back."}
      </p>

      <div className="auth-center">
        <div className="auth-card">
          <h2>{isRegistering ? "Create Account" : "Sign In"}</h2>

          {error && <p className="error">{error}</p>}

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="primary-btn" onClick={handleSubmit}>
            {isRegistering ? "Register" : "Login"}
          </button>

          <p
            className="toggle"
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering
              ? "Already have an account? Login"
              : "No account? Sign up"}
          </p>
        </div>
      </div>
    </div>
  );
}