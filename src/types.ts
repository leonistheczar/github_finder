export type ResponseType = {
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
export type ReposResponseType = {
    name: string
    full_name: string
    private: boolean
    owner: {
      login: string
      html_url: string
      type: string
      site_admin: boolean
    }
    html_url: string
    description: string | null
    created_at: string
    pushed_at: string
    git_url: string
    language: string | null
    license: {
      key: string
      name: string
      spdx_id: string
    } | null
    default_branch: string
  }[];  