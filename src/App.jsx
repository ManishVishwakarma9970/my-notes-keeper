
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Trash2, NotebookPen, StickyNote } from "lucide-react";

const App = () => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [task, setTask] = useState([]);

  // Load saved notes
  useEffect(() => {
    const savedTasks = localStorage.getItem("notes");
    if (savedTasks) {
      setTask(JSON.parse(savedTasks));
    }
  }, []);

  // Save notes to localStorage
  useEffect(() => {
    if (task.length > 0) {
      localStorage.setItem("notes", JSON.stringify(task));
    }
  }, [task]);

  // Add note
  const submitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "" || details.trim() === "") return;
    setTask([...task, { title, details }]);
    setTitle("");
    setDetails("");
  };

  // Delete note
  const deleteNote = (idx) => {
    const copy = [...task];
    copy.splice(idx, 1);
    setTask(copy);
  };

  const noteBg =
    'bg-[url("data:image/png;base64,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")]';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col lg:flex-row">
      {/* HEADER LOGO */}
      <div className="absolute top-5 left-5 flex items-center gap-2">
        <NotebookPen size={28} className="text-yellow-400" />
        <h1 className="text-lg sm:text-xl font-bold tracking-wide">
          <span className="text-yellow-400">Smart</span>Notes
        </h1>
      </div>

      {/* LEFT FORM */}
      <motion.form
        onSubmit={submitHandler}
        className="flex flex-col gap-4 p-8 sm:p-12 lg:w-1/2 items-start mt-16 lg:mt-0 w-full"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 flex items-center gap-2">
          <StickyNote className="text-yellow-400" /> Add Notes
        </h1>

        <input
          className="px-4 sm:px-5 font-medium outline-none w-full py-2 border-2 border-yellow-500 rounded bg-transparent placeholder-gray-400 text-white focus:ring-2 focus:ring-yellow-400 transition"
          type="text"
          placeholder="Enter Notes Heading"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="px-4 sm:px-5 font-medium outline-none w-full py-2 border-2 border-yellow-500 rounded bg-transparent placeholder-gray-400 text-white h-28 sm:h-32 focus:ring-2 focus:ring-yellow-400 transition"
          placeholder="Write Details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />

        <button className="flex items-center justify-center gap-2 active:scale-95 bg-yellow-400 font-semibold w-full text-black px-5 py-2 rounded-lg shadow-md hover:bg-yellow-300 transition">
          <PlusCircle size={18} /> Add Note
        </button>
      </motion.form>

      {/* RIGHT SIDE NOTES */}
      <motion.div
        className="p-8 sm:p-12 lg:w-1/2 border-t-2 lg:border-t-0 lg:border-l-2 border-gray-700 overflow-y-auto"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 flex items-center gap-2">
          📜 Recent Notes
        </h1>

        <div className="flex flex-wrap gap-5 justify-center sm:justify-start">
          {task.map((elem, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className={`flex flex-col justify-between items-start relative rounded-2xl text-black bg-cover bg-center py-5 px-4 ${noteBg} shadow-xl h-48 sm:h-52 w-36 sm:w-40`}
            >
              <div>
                <h3 className="leading-tight text-base sm:text-lg font-bold">
                  {elem.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-tight font-semibold text-gray-700">
                  {elem.details}
                </p>
              </div>

              <button
                onClick={() => deleteNote(idx)}
                className="w-full cursor-pointer active:scale-95 bg-red-500 hover:bg-red-600 text-white p-1 text-xs sm:text-sm rounded font-bold flex items-center justify-center gap-1 transition"
              >
                <Trash2 size={14} /> Delete
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>

    </div>
  );
};

export default App;
