import SearchForm from "./components/SearchForm";
const App = () => {
  return ( 
    <section className="w-full max-w-7xl mx-auto">
      <div className="container p-4">
        <h1><span className="italic text-(--accent-500) font-semibold">Search</span>, <span className="italic">Explore,</span> <span className="italic">Discover</span> GitHub Profiles</h1>
        <SearchForm />
      </div>
    </section>
   );
} 
export default App;