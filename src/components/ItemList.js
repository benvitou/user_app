function ItemList({ items, onEditClick, onDeleteClick }) {
  if (items.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-person-x display-1 text-secondary"></i>
        <h3 className="mt-3 text-secondary">No users found</h3>
        <p className="text-muted">Click "Add User" to create one.</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="mb-4 border-bottom pb-2">
        <i className="bi bi-people-fill me-2"></i>
        User List
      </h3>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {items.map(user => (
          <div key={user.id} className="col">
            <div className="card h-100 shadow-sm hover-shadow">
              <div className="card-img-top text-center p-3 bg-light">
                <img
                  src="/images/default-avatar.png"
                  alt={user.name}
                  className="img-fluid rounded-circle"
                  style={{ height: "120px", width: "120px", objectFit: "cover" }}
                />
              </div>
              <div className="card-body text-center">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text text-muted mb-1">
                  <i className="bi bi-geo-alt me-1"></i>{user.address}
                </p>
                <p className="card-text text-muted">
                  <i className="bi bi-telephone me-1"></i>{user.phone}
                </p>
              </div>
              <div className="card-footer bg-transparent border-top-0 text-end">
                <div className="d-flex justify-content-end gap-2">
                  <button 
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => onEditClick(user)}
                  >
                    <i className="bi bi-pencil me-1"></i> Edit
                  </button>
                  <button 
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => onDeleteClick(user)}
                  >
                    <i className="bi bi-trash me-1"></i> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemList;
