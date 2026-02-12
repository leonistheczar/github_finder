import { useQuery } from "@tanstack/react-query";
import type { reposResponseType, responseType } from "../types";
import { getUser, getUserRepos } from "../App";
import { SyncLoader } from "react-spinners";

interface ProfileDataProps {
  user: string;
}
const ProfileData = ({ user }: ProfileDataProps) => {

  const { data, isLoading, isError } = useQuery<{ user: responseType, repos: reposResponseType[] }, Error>({
    queryKey: ["users", user],
    queryFn: async () => { 
      const [userData, reposData] = await Promise.all([
      getUser(user),
      getUserRepos(user)
    ])
    return { user: userData, repos: reposData }},
    enabled: !!user,
  });

  if (isLoading) return <SyncLoader color="#1a75dd" />;
  if (isError) return <p>Error loading user</p>;
  if (!data) return null;
  console.log(data);
  return (
    <div className="container">
      <div></div>
    </div>
  );
};

export default ProfileData;
