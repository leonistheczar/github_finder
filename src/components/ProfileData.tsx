import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { ReposResponseType, ResponseType } from "../types";
import { getUser, getUserRepos } from "../App";
import { SyncLoader } from "react-spinners";
import {
  MapPin,
  Building2,
  Link2,
  Users,
  UserCheck,
  BookMarked,
  Star,
  GitFork,
  ArrowUpRight,
  Calendar,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProfileDataProps {
  user: string;
}

type UserWithRepos = {
  user: ResponseType;
  repos: ReposResponseType[];
};

const fetchUserData = async (user: string): Promise<UserWithRepos> => {
  const [userData, reposData] = await Promise.all([
    getUser(user),
    getUserRepos(user),
  ]);
  return { user: userData, repos: reposData };
};

type Tab = "overview" | "repos";

const ProfileData = ({ user }: ProfileDataProps) => {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const { data, isLoading, isError } = useQuery<UserWithRepos, Error>({
    queryKey: ["users", user],
    queryFn: () => fetchUserData(user),
    enabled: !!user,
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading)
    return (
      <div className="flex justify-center py-12">
        <SyncLoader color="var(--accent-500)" size={10} />
      </div>
    );

  if (isError)
    return (
      <motion.p
        className="text-center text-(--accent-600) py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        User not found. Please try another username.
      </motion.p>
    );

  if (!data) return null;

  const { user: profile, repos } = data;
  const sortedRepos = [...repos].sort(
    (a, b) => (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0),
  );

  return (
    <motion.div
      className="w-full max-w-3xl mx-auto bg-(--background-50) rounded-2xl border border-(--background-200) shadow-[0_8px_32px_rgba(0,0,0,0.08)] overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="grid grid-cols-3">
        {/* LEFT PANE */}
        <div className="p-6 shrink-0 flex flex-col items-center gap-3.5 bg-(--background-100) border-r border-(--background-200)">
          <motion.img
            src={profile.avatar_url}
            alt={profile.login}
            className="w-24 h-24 rounded-full object-cover border-3 border-(--accent-400) block"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <p className="font-semibold text-sm text-(--text-900) truncate max-w-40">
              {profile.name ?? profile.login}
            </p>
            <p className="text-xs text-(--text-500) mt-0.5">@{profile.login}</p>
          </motion.div>

          {/* Stats box */}
          <motion.div
            className="w-full p-2 bg-(--background-50) border border-(--background-200) rounded-lg px-3.5 py-3 flex flex-col gap-2.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <Stat icon={<BookMarked size={12} />} label="Repos" value={profile.public_repos} />
            <Stat icon={<Users size={12} />} label="Followers" value={profile.followers} />
            <Stat icon={<UserCheck size={12} />} label="Following" value={profile.following} />
          </motion.div>
        </div>

        {/* RIGHT PANE */}
        <div className="col-span-2 flex flex-col overflow-hidden">
          <div className="flex p-3 gap-5 border-b border-(--background-200)">
            {(["overview", "repos"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  text-sm font-medium
                  border-x-0 border-t-0 border-b-2
                  bg-transparent shadow-none rounded-none
                  cursor-pointer transition-all duration-150 capitalize tracking-wide
                  ${
                    activeTab === tab
                      ? "border-(--accent-500) text-(--accent-500)"
                      : "border-transparent text-(--text-500) hover:text-(--text-700)"
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="flex-1 px-6 py-5 overflow-y-auto">
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  className="flex flex-col gap-4"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  {profile.bio ? (
                    <p className="text-sm text-(--text-700) leading-relaxed">{profile.bio}</p>
                  ) : (
                    <p className="text-sm text-(--text-400) italic">No bio provided.</p>
                  )}

                  <div className="flex flex-col gap-2">
                    {profile.location && <MetaRow icon={<MapPin size={13} />} text={profile.location} />}
                    {profile.created_at && (
                      <MetaRow
                        icon={<Calendar size={13} />}
                        text={new Date(profile.created_at).toLocaleDateString()}
                      />
                    )}
                    {profile.company && <MetaRow icon={<Building2 size={13} />} text={profile.company} />}
                    {profile.blog && (
                      <MetaRow
                        icon={<Link2 size={13} />}
                        text={profile.blog}
                        href={profile.blog.startsWith("http") ? profile.blog : `https://${profile.blog}`}
                      />
                    )}
                  </div>

                  <div className="flex justify-center bg-(--secondary-200) transition duration-100 hover:bg-(--secondary-300) cursor-pointer p-2 rounded-lg">
                    <a href={profile.html_url} target="_blank" rel="noopener noreferrer">
                      Visit GitHub Profile
                    </a>
                  </div>
                </motion.div>
              )}

              {activeTab === "repos" && (
                <motion.div
                  key="repos"
                  className="flex flex-col gap-2"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <div className="grid grid-cols-2 gap-2">
                    {sortedRepos.slice(0, 6).map((repo, i) => (
                      <motion.div
                        key={repo.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: i * 0.05, ease: "easeOut" }}
                      >
                        <RepoCard repo={repo} />
                      </motion.div>
                    ))}
                  </div>
                  {repos.length > 6 && (
                    <a
                      href={`${profile.html_url}?tab=repositories`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-(--accent-500) no-underline flex items-center justify-center gap-1.5 pt-1.5"
                    >
                      View all {repos.length} repositories <ArrowUpRight size={13} />
                    </a>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <motion.div
        id="top-repos"
        className="border-t border-(--background-200) bg-(--background-100) px-5 py-2.5 flex items-center gap-2.5 overflow-x-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <span className="text-[0.7rem] font-semibold text-(--text-400) uppercase tracking-widest whitespace-nowrap shrink-0">
          Top repos
        </span>

        <div className="w-px h-4 bg-(--background-300) shrink-0" />

        {sortedRepos.slice(0, 5).map((repo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1 bg-(--background-50) border border-(--background-200) rounded-full no-underline whitespace-nowrap shrink-0 transition-colors duration-150"
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent-400)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--background-200)")}
          >
            <span className="text-[0.78rem] font-medium text-(--accent-600)">{repo.name}</span>
            {repo.language && (
              <span className="text-[0.7rem] text-(--text-400)">· {repo.language}</span>
            )}
            <span className="text-[0.7rem] text-(--text-400) flex items-center gap-0.5">
              <Star size={10} />
              {repo.stargazers_count ?? 0}
            </span>
          </a>
        ))}
      </motion.div>
    </motion.div>
  );
};

/* ── Helpers ── */

const Stat = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) => (
  <div className="flex items-center justify-between">
    <span className="flex items-center gap-1.5 text-xs text-(--text-500)">
      {icon}
      {label}
    </span>
    <span className="text-xs font-semibold text-(--text-800)">{value.toLocaleString()}</span>
  </div>
);

const MetaRow = ({
  icon,
  text,
  href,
}: {
  icon: React.ReactNode;
  text: string;
  href?: string;
}) => {
  const inner = (
    <span
      className={`flex items-center gap-2 text-[0.82rem] ${
        href ? "text-(--accent-500)" : "text-(--text-600)"
      }`}
    >
      <span className="text-(--text-400) flex">{icon}</span>
      {text}
    </span>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="no-underline">
      {inner}
    </a>
  ) : (
    <div>{inner}</div>
  );
};

const RepoCard = ({ repo }: { repo: ReposResponseType }) => (
  <a
    href={repo.html_url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex flex-col gap-1.5 p-3 bg-(--background-100) border border-(--background-200) rounded-lg no-underline transition-colors duration-150"
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = "var(--accent-300)";
      e.currentTarget.style.background = "var(--background-50)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = "var(--background-200)";
      e.currentTarget.style.background = "var(--background-100)";
    }}
  >
    <p className="text-sm font-semibold text-(--accent-600) truncate">{repo.name}</p>
    {repo.description && (
      <p className="text-xs text-(--text-500) leading-[1.45] line-clamp-2">{repo.description}</p>
    )}
    <div className="flex items-center gap-2 mt-auto pt-1">
      {repo.language && (
        <span className="text-[0.7rem] text-(--text-400)">{repo.language}</span>
      )}
      <span className="ml-auto flex items-center gap-0.5 text-[0.7rem] text-(--text-400)">
        <Star size={11} /> {repo.stargazers_count ?? 0}
      </span>
      <span className="flex items-center gap-0.5 text-[0.7rem] text-(--text-400)">
        <GitFork size={11} /> {repo.forks_count ?? 0}
      </span>
    </div>
  </a>
);

export default ProfileData;