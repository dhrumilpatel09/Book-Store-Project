// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";
import { useSnackbar } from "notistack";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar("❌ Error fetching books", { variant: "error" });
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-blue-800">📚 Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-blue-700 text-5xl hover:scale-110 transition-all cursor-pointer" />
        </Link>
      </div>

      {/* View Toggle Buttons */}
      <div className="flex justify-center items-center gap-6 my-6">
        <button
          className={`px-6 py-2 rounded-md font-semibold text-white transition-all ${
            showType === "table"
              ? "bg-blue-600 shadow-lg"
              : "bg-gray-400 hover:bg-gray-500"
          }`}
          onClick={() => setShowType("table")}
        >
          Table View
        </button>
        <button
          className={`px-6 py-2 rounded-md font-semibold text-white transition-all ${
            showType === "card"
              ? "bg-blue-600 shadow-lg"
              : "bg-gray-400 hover:bg-gray-500"
          }`}
          onClick={() => setShowType("card")}
        >
          Card View
        </button>
      </div>

      {/* Books Display */}
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
