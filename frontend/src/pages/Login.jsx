import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import API from "../services/api"
import "./Auth.css"

function Login() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await API.post("/auth/login", form)

      localStorage.setItem("token", res.data.token)

      alert("Login Successful ✅")

      navigate("/dashboard")

    } catch (err) {
      alert("Invalid Email or Password ❌")
    }
  }

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h1>WorkTracker</h1>

        <h3>Welcome Back</h3>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Sign In
          </button>

        </form>

        <p style={{ marginTop: "20px" }}>
          New User?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>

      </div>

    </div>
  )
}

export default Login