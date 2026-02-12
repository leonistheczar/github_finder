import { useState } from "react";
interface onSearchProps {
  onSearch: (value: string) => void;
}
const SearchForm = ({ onSearch }: onSearchProps) => {
  const [userInput, setUserInput] = useState("");
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userInput.trim()) {
      // window.scrollBy(0,30);
      onSearch(userInput);
    }
  };
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="relative">
        <input
          required
          type="text"
          id="profile"
          className="peer p-4 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <span
          className="
      absolute top-3.5 left-2
      bg-(--background-50) text-(--text-700)
      transition-all
      peer-focus:-top-2.5 peer-focus:text-(--accent-500) peer-focus:px-5 peer-focus:text-sm
      peer-valid:-top-2.5 peer-valid:z-30 peer-valid:text-(--accent-500) peer-valid:px-5 peer-valid:text-sm">
          Search Username
        </span>
      </div>
      <button
        className="p-2 bg-(--secondary-600) 
          rounded-lg shadow-lg cursor-pointer transition 
          duration-100 hover:bg-(--secondary-400)"
        type="submit"
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;
