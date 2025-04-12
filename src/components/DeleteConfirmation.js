function DeleteConfirmation({ item, onCancel, onConfirm }) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
          
          <p className="mb-6">
            Are you sure you want to delete <strong>{item.name}</strong>? This action cannot be undone.
          </p>
          
          <div className="flex justify-end space-x-2">
            <button
              onClick={onCancel}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
  export default DeleteConfirmation;
