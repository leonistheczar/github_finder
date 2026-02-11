import { useQuery } from "@tanstack/react-query";
import type { responseType } from "../types";
import { getUser } from "../App";

interface ProfileDataProps {
  user: string;
}

const ProfileData = ({ user }: ProfileDataProps) => {

  const { data, isLoading, isError } = useQuery<responseType, Error>({
    queryKey: ["users", user],
    queryFn: () => getUser(user),
    enabled: !!user,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading user</p>;
  if (!data) return null;

  return (
    <div className="container">
      <div className="overflow-hidden">
        <img
          src={data.avatar_url}
          alt={data.login}
          className="w-16 h-16 mx-auto"
        />
        <p>{data.login}</p>
      </div>
    </div>
  );
};

export default ProfileData;
