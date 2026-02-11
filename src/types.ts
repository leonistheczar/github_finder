export type responseType = {
    login: string,
    id: number,
    avatar_url: string,
    html_url: string,
    type: string,
    user_view_public: string,
    name: string,
    location: string,
    bio: string,
    twitter_username: string,
    public_repos: number,
    followers: number,
    following: number,
    hireable?: boolean,
    email?: string | null
}