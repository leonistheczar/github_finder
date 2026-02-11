import { useState } from "react";
interface onSearchProps {
  onSearch: (value: string) => void;
}
const SearchForm = ({onSearch}: onSearchProps) => {
  const [userInput, setUserInput] = useState('');
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(userInput.trim()){
      onSearch(userInput);
    }
  }
    return ( 
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="relative">
            <input required type="text" id="profle" className="peer w-full p-4 rounded-md border border-gray-300
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:p-2"
             value={userInput} 
             onChange={(e) => setUserInput(e.target.value)}/>
            <span className="bg-(--background-50) transition-all text-(--text-700)
             absolute top-3.5 left-2
             peer-focus:-top-2.5 peer-focus:z-30
             peer-focus:text-(--accent-500)
             peer-focus:px-5
             peer-focus:text-sm
             peer-valid:-top-2.5 peer-valid:z-30
             peer-valid:text-(--accent-500)
             peer-valid:px-5
             peer-valid:text-sm">Search Username</span>
          </div>
          <button className="" type="submit">Search</button>
        </form>
     );
}
 
export default SearchForm;