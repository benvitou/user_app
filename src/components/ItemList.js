function ItemList({ items, onEditClick, onDeleteClick }) {
  if (items.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-inbox display-1 text-secondary"></i>
        <h3 className="mt-3 text-secondary">No items found</h3>
        <p className="text-muted">Click "Add Item" to create one.</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="mb-4 border-bottom pb-2">
        <i className="bi bi-list-ul me-2"></i>
        Your Music
      </h3>
      
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {items.map(item => (
          <div key={item.id} className="col">
            <div className="card h-100 shadow-sm hover-shadow">
              <div className="card-img-top text-center p-3 bg-light">
                <img 
                  src='/images/default-image.png'
                  alt={item.name}
                  className="img-fluid rounded"
                  style={{height: "180px", objectFit: "cover"}}
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text text-muted">{item.description}</p>
                <p className="card-text text-muted">{item.location}</p>
              </div>
              <div className="card-footer bg-transparent border-top-0">
                <div className="d-flex justify-content-end gap-2">
                  <button 
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => onEditClick(item)}
                  >
                    <i className="bi bi-pencil me-1"></i> Edit
                  </button>
                  <button 
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => onDeleteClick(item)}
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
