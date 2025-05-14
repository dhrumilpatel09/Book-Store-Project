import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5000/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("✅ Book Deleted Successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar(`❌ Error: ${error.response?.data?.message || "Something went wrong"}`, { variant: "error" });
        console.error("Delete Error:", error);
      });
  };

  return (
    <div className="p-6 min-h-screen flex flex-col items-center bg-gradient-to-br from-red-100 to-red-300">
      <BackButton />
      <h1 className="text-4xl font-semibold my-6 text-red-800">Delete Book</h1>
      {loading && <Spinner />}

      <div className="flex flex-col items-center border-2 border-red-500 bg-white shadow-lg rounded-2xl w-full max-w-lg p-8">
        <h3 className="text-2xl font-medium text-red-700 mb-6 text-center">
          Are you sure you want to delete this book?
        </h3>
        <div className="flex gap-6">
          <button
            className="px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-red-500 to-red-700 rounded-lg shadow-md hover:opacity-90 transition-all"
            onClick={handleDeleteBook}
          >
            Yes, Delete
          </button>
          <button
            className="px-6 py-3 text-lg font-semibold text-gray-800 bg-gray-300 rounded-lg shadow-md hover:bg-gray-400 transition-all"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;
