import { useState } from "react";
import { motion } from "framer-motion";

interface onSearchProps {
  onSearch: (value: string) => void;
}

const SearchForm = ({ onSearch }: onSearchProps) => {
  const [userInput, setUserInput] = useState("");

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userInput.trim()) {
      window.scrollBy(0, 120);
      onSearch(userInput);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <input
          required
          type="text"
          id="profile"
          className="peer p-4 w-full rounded-md border border-gray-300 focus:border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <span
          className="
            absolute top-3.5 left-2
            bg-(--background-50) text-(--text-700)
            transition-all px-2
            peer-focus:-top-3.5 peer-focus:text-(--accent-500) peer-focus:text-sm
            peer-valid:-top-3.5 peer-valid:z-30 peer-valid:text-(--accent-500) peer-valid:text-sm"
        >
          Search Username
        </span>
      </motion.div>

      <motion.button
        className="p-2 bg-(--secondary-600) 
          rounded-lg shadow-lg cursor-pointer transition 
          duration-100 hover:bg-(--secondary-400)"
        type="submit"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        whileTap={{ scale: 0.97 }}
      >
        Search
      </motion.button>
    </form>
  );
};

export default SearchForm;