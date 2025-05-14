import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar(`❌ Error: ${error.response?.data?.message || "Failed to fetch book details"}`, { variant: "error" });
        console.error("Fetch Error:", error);
      });
  }, [id]);

  const handleEditBook = () => {
    const data = { title, author, publishYear };
    setLoading(true);
    axios
      .put(`http://localhost:5000/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("✅ Book Updated Successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar(`❌ Error: ${error.response?.data?.message || "Failed to update book"}`, { variant: "error" });
        console.error("Update Error:", error);
      });
  };

  return (
    <div className="p-6 min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-100 to-blue-300">
      <BackButton />
      <h1 className="text-4xl font-semibold my-6 text-blue-800">Edit Book</h1>
      {loading && <Spinner />}

      <div className="flex flex-col border-2 border-blue-500 bg-white shadow-lg rounded-2xl w-full max-w-lg p-8">
        <div className="my-4">
          <label className="text-xl font-medium text-gray-600">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-400 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="my-4">
          <label className="text-xl font-medium text-gray-600">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-400 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="my-4">
          <label className="text-xl font-medium text-gray-600">Publish Year</label>
          <input
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-400 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-4">
          <button
            className="px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg shadow-md hover:opacity-90 transition-all"
            onClick={handleEditBook}
          >
            Save Changes
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

export default EditBook;
