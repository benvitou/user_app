function Navbar({ onAddClick }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <a className="navbar-brand fw-bold" href="/">
          <i class="fa-solid fa-music"></i>
          User App
        </a>

        <button className="btn btn-light ms-auto" onClick={onAddClick}>
          <i className="bi bi-plus-circle me-2"></i>
          Add new User
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
