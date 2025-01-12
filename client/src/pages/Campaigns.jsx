import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';
import axios from 'axios';

function Campaigns() {
  const { user, isLoggedIn, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);

  const fetchData = async (userId) => {
    // console.log(userId)
    try {
      const response = await axios.get(backendUrl + `/api/user/user-files/${userId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        }
      });
      // console.log(response.data.success)
      setFiles(response.data.files);
      // console.log(response.data.files);
      // console.log(response.data.message);
      
      setLoading(false);
    } catch (error) {
      console.log("error fetching file", error);
      setLoading(false);
    }
  };

  const handleView = (file) => {
    setSelectedFile(file);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
  };

  const handleDownload = async (file) => {
    try {
      if (!file) {
        alert('no file is present')
      }
      const url = window.URL.createObjectURL(new Blob([file]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file.fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleDelete = async (fileId) => {
    try {
      const { data } = await axios.delete(backendUrl + `/api/user/delete-campaign/${fileId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
  
      if (data.success) {
        console.log("File deleted");
        setFiles(files.filter((file) => file._id !== fileId));
        setIsDeleteModalOpen(false);
        setFileToDelete(null); // Reset fileToDelete
      }
    } catch (error) {
      console.log("Error while deleting file", error);
    }
  };
  
  const openDeleteModal = (file) => {
    setFileToDelete(file);
    setIsDeleteModalOpen(true);
  };
  
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setFileToDelete(null);
  };


  useEffect(() => {
    if (user && user._id) {
      fetchData(user._id);
    }
  }, [isLoggedIn, user]);

  const handleRedirect = () => {
    if (!isLoggedIn) {
      navigate('/');
    }
    navigate('/upload-campaigns');
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center p-6">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-4xl font-semibold text-green-600 text-center mb-6">
          Campaigns
        </h2>
        <p className="text-lg text-gray-300 text-center mb-8">
          Manage and explore your campaigns here. You can view detailed information, track progress, and upload new campaigns to stay on top of your goals.
        </p>

        <div className="text-center mb-6">
          <button
            onClick={handleRedirect}
            className="bg-black text-white py-2 px-6 rounded-lg hover:bg-white hover:text-black transition duration-300"
          >
            Upload Campaign
          </button>
        </div>

        <h3 className="text-2xl font-semibold text-white text-center mb-4">Uploaded Files</h3>
        <ul>
          {files.map((file, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-700 p-4 mb-2 rounded-lg"
            >
              <span>{file.fileName}</span>
              <div className="flex items-center space-x-2">
                {/* View Button */}
                <button
                  onClick={() => handleView(file)}
                  className="bg-green-600 text-white py-1 px-3 rounded-lg hover:bg-green-700 transition duration-300"
                >
                  View
                </button>
                {/* Download Button */}
                <button
                  onClick={() => handleDownload(file)}
                  className="flex items-center bg-blue-600 text-white py-1 px-3 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                    />
                  </svg>
                  Download
                </button>
                {/* Delete Button  */}
                {/* <button onClick={() => handleDelete(file._id)} className='bg-rose-800 px-1 py-1 rounded-md'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>

                </button> */}
                <button onClick={() => openDeleteModal(file)} className='bg-rose-800 px-1 py-1 rounded-md'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path strokeLinecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
             
             


                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal */}
      {isModalOpen && selectedFile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={handleCloseModal}
        >
          <div
            className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-semibold text-green-600 text-center mb-6">
              File Details
            </h2>
            <p className="text-lg text-gray-300 mb-4">
              <strong>File Name:</strong> {selectedFile.fileName}
            </p>
            {/*scrolling  */}
            <div className="h-80 overflow-y-auto bg-gray-800 p-4 rounded-lg">
              <pre className="text-sm text-gray-300">
                {JSON.stringify(selectedFile.data, null, 2)}
              </pre>
            </div>
            <button
              onClick={handleCloseModal}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300 mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* Delete modal */}
      {isDeleteModalOpen && (
  <div
    className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
    onClick={closeDeleteModal}
  >
    <div
      className={`bg-white p-6 rounded-lg shadow-lg w-96 fade-in`}
      onClick={(e) => e.stopPropagation()}
    >
      <h4 className="text-gray-800 text-lg font-semibold mb-4 text-center">
        Are you sure you want to delete <span className="font-bold">{fileToDelete?.fileName}</span>?
      </h4>
      <div className="flex justify-around mt-6">
        <button
          type="button"
          onClick={() => handleDelete(fileToDelete?._id)}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Delete
        </button>
        <button
          type="button"
          onClick={closeDeleteModal}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}


    </div>
  );
}

export default Campaigns;
