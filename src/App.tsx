import SearchForm from "./components/SearchForm";
import ProfileData from "./components/ProfileData"; 
import api from "./api/api";
import type { ResponseType, ReposResponseType  } from "./types";
import { useState } from "react";
import { motion } from "motion/react";
export const getUser = async (user: string): Promise<ResponseType> => {
  try {
      const { data } = await api.get(`/users/${user}`);
      return data
    } catch (error) {
      throw new Error(`Failed to fetch ${user}`);
    }
};
export const getUserRepos = async (user: string): Promise<ReposResponseType[]> => {
  try {
    const { data } = await api.get(`/users/${user}/repos`);
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch ${user} repositories`);
  }
}
const App = () => {
  const [user,setUser] = useState<string>("");
  return ( 
    <motion.section
      className="w-full max-w-7xl mx-auto flex flex-col items-center gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75 }}
    >
      <motion.div
        id="search"
        className="container p-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.1, ease: "easeOut" }}
        >
          <span className="italic text-(--accent-600) font-semibold">Search</span>,{" "}
          <span className="italic text-(--accent-600) font-semibold">Explore</span>,{" "}
          <span className="italic text-(--accent-600) font-semibold">Discover</span> GitHub Profiles
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          <SearchForm onSearch={setUser} />
        </motion.div>
      </motion.div>

      <motion.div
        key={user}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full"
      >
        <ProfileData user={user} />
      </motion.div>
    </motion.section>
  );
} 
export default App;