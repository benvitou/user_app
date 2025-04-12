import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ItemList from './components/ItemList';
import CreateModal from './components/CreateModal';
import EditModal from './components/EditModal';
import Swal from 'sweetalert2';

function App() {
  const [items, setItems] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Control body overflow when modal is open
  useEffect(() => {
    if (showCreateModal || showEditModal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [showCreateModal, showEditModal]);

  // Fetch all items from the db.json file
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('https://db-user.onrender.com/items');
        const data = await response.json();
        setItems(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching items:', error);
        setIsLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to load items. Please try again later.'
        });
      }
    };

    fetchItems();
  }, []);

  // Helper function to handle image upload
  const handleImageUpload = async (imageFile) => {
    if (!imageFile) return null;
    
    // Create a new FormData instance
    const formData = new FormData();
    formData.append('image', imageFile);
    
    try {
      // Simulate saving image to public folder in a real app
      // For a real implementation, you would have a server endpoint for file uploads
      // Here we'll just return a filename based on current time to simulate
      const filename = `image-${Date.now()}-${imageFile.name}`;
      
      // In a real app with a proper backend:
      // const response = await fetch('http://localhost:3001/upload', {
      //   method: 'POST',
      //   body: formData
      // });
      // const data = await response.json();
      // return data.filename;
      
      // Copy the file to public/images folder (this is simulated in our case)
      console.log(`Image ${filename} would be saved to public/images/`);
      
      return filename;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Failed to upload image');
    }
  };

  // Create a new item
  const handleCreate = async (newItem, imageFile) => {
    try {
      let imageFilename = null;
      
      if (imageFile) {
        imageFilename = await handleImageUpload(imageFile);
      }
      
      const itemWithImage = {
        ...newItem,
        image: imageFilename || 'default-image.jpg' // Default image if none provided
      };
      
      const response = await fetch('https://db-user.onrender.com/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemWithImage),
      });
      
      const createdItem = await response.json();
      setItems([...items, createdItem]);
      setShowCreateModal(false);
      
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Item created successfully',
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error) {
      console.error('Error creating item:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to create item'
      });
    }
  };

  // Update an existing item
  const handleUpdate = async (updatedItem, imageFile) => {
    try {
      let updatedItemData = { ...updatedItem };
      
      if (imageFile) {
        const imageFilename = await handleImageUpload(imageFile);
        updatedItemData.image = imageFilename;
      }
      
      const response = await fetch(`https://db-user.onrender.com/items/${updatedItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItemData),
      });
      
      const updated = await response.json();
      setItems(items.map(item => item.id === updated.id ? updated : item));
      setShowEditModal(false);
      
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Item updated successfully',
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error) {
      console.error('Error updating item:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update item'
      });
    }
  };

  // Delete an item
  const handleDelete = async (id) => {
    try {
      await fetch(`https://db-user.onrender.com/items/${id}`, {
        method: 'DELETE',
      });
      
      setItems(items.filter(item => item.id !== id));
      
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Item has been deleted successfully',
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error) {
      console.error('Error deleting item:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete item'
      });
    }
  };

  // Handle edit button click
  const handleEditClick = (item) => {
    setCurrentItem(item);
    setShowEditModal(true);
  };

  // Handle delete button click with SweetAlert2 confirmation
  const handleDeleteClick = (item) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete "${item.name}"? This cannot be undone!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(item.id);
      }
    });
  };

  return (
    <div className="app min-vh-100 bg-light">
      <Navbar onAddClick={() => setShowCreateModal(true)} />
      
      <div className="container py-5">
        {isLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading items...</p>
          </div>
        ) : (
          <ItemList 
            items={items} 
            onEditClick={handleEditClick} 
            onDeleteClick={handleDeleteClick} 
          />
        )}
      </div>

      {showCreateModal && (
        <CreateModal 
          onClose={() => setShowCreateModal(false)} 
          onSubmit={handleCreate} 
        />
      )}

      {showEditModal && currentItem && (
        <EditModal 
          item={currentItem} 
          onClose={() => setShowEditModal(false)} 
          onSubmit={handleUpdate} 
        />
      )}
    </div>
  );
}

export default App;
