import "./Navbar.css"

function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/"
  }

  return (
    <nav className="navbar">
      <h2 className="logo">WorkTracker</h2>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  )
}

export default Navbar