import { useState } from 'react';
import ReactDOM from 'react-dom';

function CreateModal({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location:'',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, imageFile);
  };

  return ReactDOM.createPortal(
    <div className="modal-wrapper">
      <div className="modal show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">
                <i className="bi bi-plus-circle me-2"></i>
                Add New Item
              </h5>
              <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label" htmlFor="name">Title</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter music title"
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label" htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter item description"
                    rows="3"
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="lcoation">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter music location"
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label" htmlFor="image">Image</label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleImageChange}
                    className="form-control"
                    accept="image/*"
                  />
                  <div className="form-text">Upload an image for this item (optional)</div>
                </div>
                
                {imagePreview && (
                  <div className="mb-3 text-center">
                    <label className="form-label">Image Preview</label>
                    <div className="border rounded p-2">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="img-fluid"
                        style={{maxHeight: "200px"}}
                      />
                    </div>
                  </div>
                )}
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
                  Create
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

export default CreateModal;
