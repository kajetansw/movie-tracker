# Movie Tracker

A web application for searching and tracking your favorite movies using The Movie Database (TMDB) API.

## Features

- Search for movies by title
- View detailed movie information including director and cast
- Save movies to your favorites list

## Getting Started

### Prerequisites

- Node.js (v20 or higher)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/movie-tracker.git
cd movie-tracker
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your TMDB API token:

```
VITE_TMDB_ACCESS_TOKEN=your_access_token_here
```

4. Start the development server:

```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run unit tests
- `npm run test:ui` - Run unit tests with UI
- `npm run test:coverage` - Generate unit test coverage report

## Tech Stack

- React 19
- TypeScript
- Redux Toolkit
- RTK Query
- React Router
- SASS
- Vite
- Vitest

## API Reference

This project uses [The Movie Database (TMDB) API](https://developer.themoviedb.org/docs) for fetching movie data.
