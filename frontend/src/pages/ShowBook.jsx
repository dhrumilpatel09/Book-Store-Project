// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowBook = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("⚠️ Failed to load book details. Please try again.");
        console.error("Fetch Error:", error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <BackButton />
      <h1 className="text-4xl font-bold text-blue-800 my-6">📖 Book Details</h1>

      {loading && <Spinner />}
      {error && <p className="text-red-600 font-semibold text-lg">{error}</p>}

      {book && !loading && (
        <div className="border-2 border-blue-500 bg-white shadow-lg rounded-lg w-[500px] p-6 mx-auto">
          <div className="mb-4">
            <span className="text-lg font-semibold text-gray-700">🆔 ID:</span>
            <span className="ml-2 text-gray-600">{book._id}</span>
          </div>
          <div className="mb-4">
            <span className="text-lg font-semibold text-gray-700">📌 Title:</span>
            <span className="ml-2 text-gray-600">{book.title}</span>
          </div>
          <div className="mb-4">
            <span className="text-lg font-semibold text-gray-700">✍️ Author:</span>
            <span className="ml-2 text-gray-600">{book.author}</span>
          </div>
          <div className="mb-4">
            <span className="text-lg font-semibold text-gray-700">📅 Publish Year:</span>
            <span className="ml-2 text-gray-600">{book.publishYear}</span>
          </div>
          <div className="mb-4">
            <span className="text-lg font-semibold text-gray-700">🕒 Created At:</span>
            <span className="ml-2 text-gray-600">
              {book.createdAt ? new Date(book.createdAt).toLocaleString() : "N/A"}
            </span>
          </div>
          <div className="mb-4">
            <span className="text-lg font-semibold text-gray-700">🔄 Last Updated:</span>
            <span className="ml-2 text-gray-600">
              {book.updatedAt ? new Date(book.updatedAt).toLocaleString() : "N/A"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
