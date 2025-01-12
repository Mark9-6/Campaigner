import React, { useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'

function UploadCampaigns() {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false); // For drag-and-drop
  const { user, backendUrl, isLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "text/csv") {
      setFile(droppedFile);
    } else {
      alert("Please upload a valid CSV file.");
    }
  };

  const handleUpload = async () => {
    if (!isLoggedIn) {
      alert("Please Log In");
      navigate("/");
      return;
    }
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", user._id); // Use logged-in user ID

    try {
      const response = await axios.post(`${backendUrl}/api/user/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!response.data.success) {
        alert(response.data.message);
      } else {
        alert("File uploaded successfully");
        navigate("/campaigns");
      }
    } catch (error) {
      console.error(error.response || error.message);
      alert(error.response?.data?.message || "Error uploading file");
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center p-6">
      <div
        className={`bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md ${
          isDragging ? "border-2 border-green-600" : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <h2 className="text-2xl font-semibold text-green-600 text-center mb-6">
          Upload Campaigns
        </h2>
        <div className="mb-4">
          <div
            className={`flex items-center justify-center border-2 border-dashed rounded-lg py-8 ${
              isDragging ? "border-green-600 bg-gray-700" : "border-gray-500"
            }`}
          >
            {file ? (
              <p className="text-sm text-green-400">{file.name}</p>
            ) : (
              <p className="text-sm text-gray-400">
                Drag and drop your CSV file here or click to upload
              </p>
            )}
          </div>
        </div>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-green-600 file:text-white
                    hover:file:bg-green-700"
        />
        <button
          onClick={handleUpload}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 mt-4"
        >
          Upload
        </button>
      </div>
    </div>
  );
}

export default UploadCampaigns;
