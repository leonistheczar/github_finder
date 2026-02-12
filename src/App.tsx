import SearchForm from "./components/SearchForm";
import ProfileData from "./components/ProfileData"; 
import api from "./api/api";
import type { ResponseType, ReposResponseType  } from "./types";
import { useState } from "react";
export const getUser = async (user: string): Promise<ResponseType> => {
  try {
      const { data } = await api.get(`/users/${user}`);
      return data
    } catch (error) {
      console.error(error);
      throw error;
    }
};
export const getUserRepos = async (user: string): Promise<ReposResponseType[]> => {
  try {
    const { data } = await api.get(`/users/${user}/repos`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch ${user} repositories`);
  }
}
const App = () => {
  const [user,setUser] = useState<string>("");
  return ( 
    <section className="w-full max-w-7xl mx-auto flex flex-col items-center gap-6">
      <div id="search" className="container p-4">
        <h1><span className="italic text-(--accent-600) font-semibold">Search</span>, <span className="italic text-(--accent-600) font-semibold">Explore</span>, <span className="italic text-(--accent-600) font-semibold">Discover</span> GitHub Profiles</h1>
        <SearchForm onSearch={setUser} />
      </div>
      <ProfileData user={user}/>
    </section>
   );
} 
export default App;