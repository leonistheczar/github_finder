const SearchForm = () => {
    return ( 
        <form className="flex flex-col gap-4">
          <div className="relative">
            <input type="text" id="profle" className="peer w-full p-4 rounded-md border border-gray-300
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:p-2
             " />
            <span className="bg-(--background-50) transition-all text-(--text-700)
             absolute top-3.5 left-2
             peer-focus:-top-2.5 peer-focus:z-30
             peer-focus:text-(--accent-500)
             peer-focus:px-5
             peer-focus:text-sm">Search Username</span>
          </div>
          <button className="" type="submit">Search</button>
        </form>
     );
}
 
export default SearchForm;