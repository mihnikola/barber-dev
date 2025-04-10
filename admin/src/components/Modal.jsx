const Modal = ({ showModal, setShowModal, onConfirm }) => {
  if (!showModal) return null; // Don't render if showModal is false

  const handleConfirm = () => {
    onConfirm(); // Call the confirm action
    setShowModal(false); // Close the modal
  };

  const handleCancel = () => {
    setShowModal(false); // Close the modal without confirming
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleCancel} // Close the modal when clicking outside the modal
    >
      <div
        className="bg-white p-6 rounded-lg shadow-xl w-96"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <h2 className="text-xl font-semibold mb-4">Sigurni ste?</h2>
        <p className="mb-6">Da li želite da obrišete ovu uslugu?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            Otkaži
          </button>
          <button
            onClick={handleConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Potvrdi
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
