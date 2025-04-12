import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function EditModal({ item, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    address: '',
    phone: '',
  });

  useEffect(() => {
    if (item) {
      setFormData({
        id: item.id,
        name: item.name,
        address: item.address,
        phone: item.phone,
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return ReactDOM.createPortal(
    <div className="modal-wrapper">
      <div className="modal show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">
                <i className="bi bi-pencil-square me-2"></i>
                Edit User
              </h5>
              <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label" htmlFor="edit-name">Name</label>
                  <input
                    type="text"
                    id="edit-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="edit-address">Address</label>
                  <textarea
                    id="edit-address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="form-control"
                    rows="2"
                    required
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="edit-phone">Phone</label>
                  <input
                    type="tel"
                    id="edit-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-secondary"
                >
                  <i className="bi bi-x-circle me-1"></i>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  <i className="bi bi-check-circle me-1"></i>
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show" onClick={onClose}></div>
    </div>,
    document.body
  );
}

export default EditModal;
