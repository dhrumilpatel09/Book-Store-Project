// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CreateBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear: Number(publishYear), // Ensure it's a number
    };

    setLoading(true);
    axios
      .post("http://localhost:5000/books", data) // ✅ Fix backend URL
      .then(() => {
        setLoading(false);
        enqueueSnackbar("✅ Book Created Successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("❌ Error Creating Book", { variant: "error" });
        console.error("Error:", error.response ? error.response.data : error);
      });
  };

  return (
    <div className="p-6 min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-100 to-blue-300">
      <BackButton />
      <h1 className="text-4xl font-semibold my-6 text-blue-800">Create Book</h1>
      {loading ? <Spinner /> : ""}

      <div className="flex flex-col border-2 border-blue-600 bg-white shadow-lg rounded-2xl w-full max-w-lg p-6">
        <div className="my-4">
          <label className="text-xl font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-400 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
        <div className="my-4">
          <label className="text-xl font-medium text-gray-700">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-400 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
        <div className="my-4">
          <label className="text-xl font-medium text-gray-700">Publish Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-400 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        <button
          className="p-3 text-lg text-white font-semibold bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg hover:opacity-90 transition-all shadow-md"
          onClick={handleSaveBook}
        >
          Save Book
        </button>
      </div>
    </div>
  );
};

export default CreateBooks;
