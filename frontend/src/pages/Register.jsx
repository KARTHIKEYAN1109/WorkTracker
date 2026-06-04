import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import API from "../services/api"
import "./Auth.css"

function Register() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
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
      await API.post("/auth/register", form)

      alert("Registration Successful ✅")

      navigate("/login")

    } catch (err) {
      alert("Registration Failed ❌")
    }
  }

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h1>WorkTracker</h1>

        <h3>Create Account</h3>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={form.name}
            onChange={handleChange}
            required
          />

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
            Create Account
          </button>

        </form>

        <p style={{ marginTop: "20px" }}>
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>

      </div>

    </div>
  )
}

export default Register