# GitHub Finder

A modern, responsive web application for searching and exploring GitHub users and repositories. Built with React and powered by the GitHub REST API.

![GitHub Finder](https://img.shields.io/badge/React-18.x-blue)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

- **User Search** - Search for GitHub users by username with real-time results
- **User Profiles** - View detailed user information including bio, location, and statistics
- **Repository Browser** - Explore user repositories with sorting and filtering options
- **Responsive Design** - Fully optimized for desktop, tablet, and mobile devices
- **Rate Limit Awareness** - Built-in rate limit tracking and user notifications
- **Optimized Performance** - Smart caching and data fetching with TanStack Query
- **Dark Mode** - Eye-friendly interface for extended browsing sessions

## Tech Stack

- **React 18** - Modern UI library with hooks
- **Vite** - Lightning-fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework for rapid UI development
- **Axios** - Promise-based HTTP client for API requests
- **TanStack Query** - Powerful data synchronization and caching
- **GitHub REST API** - Official GitHub API for fetching user and repository data

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16.x or higher)
- npm or yarn package manager
- A GitHub account (for generating a personal access token)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/leonistheczar/github_finder.git
cd github-finder
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
VITE_GITHUB_TOKEN=your_github_personal_access_token
```

**How to get a GitHub Personal Access Token:**

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token"
3. Give it a descriptive name
4. Select scopes: `public_repo` and `read:user`
5. Click "Generate token"
6. Copy the token and paste it in your `.env` file

> **Note:** Keep your token secure and never commit the `.env` file to version control.

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Build for Production

```bash
npm run build
# or
yarn build
```

The optimized production build will be in the `build` folder.

## Project Structure

```
github-finder/
├── public/             # Static assets
├── src/
│   ├── api/           # API service layer
│   ├── components/    # Reusable UI components
│   ├── App.jsx        # Main application component
│   └── main.jsx       # Application entry point
├── .env               # Environment variables (not committed)
├── .gitignore         # Git ignore rules
├── index.html         # HTML template
├── package.json       # Project dependencies
├── tailwind.config.js # TailwindCSS configuration
└── vite.config.js     # Vite configuration
```

## API Rate Limits

GitHub API has the following rate limits:

- **Unauthenticated requests:** 60 requests per hour
- **Authenticated requests:** 5,000 requests per hour

The application displays your remaining rate limit in the UI and provides warnings when approaching the limit.

## Features in Detail

### User Search
Search for GitHub users by entering a username or partial match. Results are displayed with avatars, usernames, and quick stats.

### User Profile
Click on any user to view their complete profile including:
- Profile picture and bio
- Location and company information
- Follower and following counts
- Public repository count
- Account creation date

### Repository List
Browse through a user's public repositories with information such as:
- Repository name and description
- Star and fork counts
- Primary programming language
- Last update timestamp

## Performance Optimizations

- **Smart Caching** - TanStack Query caches API responses to minimize redundant requests
- **Debounced Search** - Search input is debounced to prevent excessive API calls
- **Lazy Loading** - Components and routes are loaded on demand
- **Optimized Images** - Avatar images are optimized for faster loading

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- GitHub REST API documentation
- React team for the amazing library
- TailwindCSS for the utility-first CSS framework
- TanStack Query for powerful data fetching

## Contact

Email - [ali.at.grind@gmail.com](mailto:ali.at.grind@gmail.com)

Project Link: [https://github.com/leonistheczar/github_finder](https://github.com/leonistheczar/github_finder)

---

Made with ❤️ by [Muhammad Ali](https://github.com/leonistheczar)