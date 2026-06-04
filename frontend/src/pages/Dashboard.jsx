import { useEffect, useState } from "react"
import API from "../services/api"
import Navbar from "../components/Navbar"
import "./Dashboard.css"

function Dashboard() {
  const [works, setWorks] = useState([])

  const [form, setForm] = useState({
    category: "",
    context: "",
    beneficiary: "",
    outcome: "",
    effort: ""
  })

  const [editId, setEditId] = useState(null)

  useEffect(() => {
    fetchWorks()
  }, [])

  const fetchWorks = async () => {
    try {
      const res = await API.get("/work")
      setWorks(res.data.works)
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleAdd = async (e) => {
    e.preventDefault()

    try {
      if (editId) {
        await API.put(`/work/${editId}`, form)
        setEditId(null)
      } else {
        await API.post("/work/add", form)
      }

      setForm({
        category: "",
        context: "",
        beneficiary: "",
        outcome: "",
        effort: ""
      })

      fetchWorks()
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async (id) => {
    try {
      await API.delete(`/work/${id}`)
      fetchWorks()
    } catch (err) {
      console.log(err)
    }
  }

  const handleEdit = (work) => {
    setForm({
      category: work.category,
      context: work.context,
      beneficiary: work.beneficiary,
      outcome: work.outcome,
      effort: work.effort
    })

    setEditId(work._id)
  }

  const highEffort = works.filter(
    (w) => w.effort?.toLowerCase() === "high"
  ).length

  const mediumEffort = works.filter(
    (w) => w.effort?.toLowerCase() === "medium"
  ).length

  const lowEffort = works.filter(
    (w) => w.effort?.toLowerCase() === "low"
  ).length

return (
  <>
    <Navbar />

    <div className="dashboard-container">

      <div className="dashboard-header">
        <h1>Welcome Back 👋</h1>
        <p>Track and manage your daily contributions</p>
      </div>

      {/* Stats */}
      <div className="stats-section">

        <div className="stat-card">
          <h3>{works.length}</h3>
          <p>Total Works</p>
        </div>

        <div className="stat-card">
          <h3>{highEffort}</h3>
          <p>High Effort</p>
        </div>

        <div className="stat-card">
          <h3>{mediumEffort}</h3>
          <p>Medium Effort</p>
        </div>

        <div className="stat-card">
          <h3>{lowEffort}</h3>
          <p>Low Effort</p>
        </div>

      </div>

      {/* Form */}
      <div className="form-card">

        <h2>
          {editId ? "Update Work" : "Add New Work"}
        </h2>

        <form onSubmit={handleAdd} className="work-form">

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
          />

          <input
            type="text"
            name="context"
            placeholder="Context"
            value={form.context}
            onChange={handleChange}
          />

          <input
            type="text"
            name="beneficiary"
            placeholder="Beneficiary"
            value={form.beneficiary}
            onChange={handleChange}
          />

          <input
            type="text"
            name="outcome"
            placeholder="Outcome"
            value={form.outcome}
            onChange={handleChange}
          />

          <select
            name="effort"
            value={form.effort}
            onChange={handleChange}
          >
            <option value="">Select Effort</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <button type="submit" className="submit-btn">
            {editId ? "Update Work" : "Add Work"}
          </button>

        </form>

      </div>

      {/* Work Cards */}
      <div className="work-grid">

        {works.map((w) => (
          <div className="work-card" key={w._id}>

            <h3>{w.category}</h3>

            <p>{w.context}</p>

            <p>
              <strong>Beneficiary:</strong> {w.beneficiary}
            </p>

            <p>
              <strong>Outcome:</strong> {w.outcome}
            </p>

            <p>
              <strong>Effort:</strong>{" "}
              <span
                style={{
                  fontWeight: "bold",
                  color:
                    w.effort === "High"
                      ? "#ef4444"
                      : w.effort === "Medium"
                      ? "#f59e0b"
                      : "#22c55e"
                }}
              >
                {w.effort}
              </span>
            </p>

            <div className="card-actions">

              <button
                type="button"
                className="edit-btn"
                onClick={() => handleEdit(w)}
              >
                Edit
              </button>

              <button
                type="button"
                className="delete-btn"
                onClick={() => handleDelete(w._id)}
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  </>
)
}

export default Dashboard