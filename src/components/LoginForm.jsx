import { useState } from "react";

export default function LoginForm() {
  const [form, setForm] = useState({ userId: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login form submitted:", form);
    alert(
      `Login Submitted\n\nUserID: ${form.userId}\nPassword: ${form.password}`,
    );
  };

  return (
    <section className="tab-panel">
      <h2 className="tab-title">Profile Tab.</h2>
      <div className="card login-card">
        <h3 className="card-title">
          User <strong>Login</strong>
        </h3>
        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="userId">UserID</label>
          <input
            id="userId"
            name="userId"
            type="text"
            value={form.userId}
            onChange={handleChange}
            placeholder="Enter your user ID"
            autoComplete="username"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
          />

          <button type="submit" className="primary-btn">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
