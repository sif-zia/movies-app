import { useState } from "react";
import MovieCard from "@/components/MovieCard";
import styles from "../../styles/Movies.module.css";
import { getGenres, getMovies } from "@/utils/db";

export default function AllMovies({ movies, genres }) {
  const [selectedGenre, setSelectedGenre] = useState("");
  
  const filteredMovies = selectedGenre 
    ? movies.filter(movie => movie.genreId === selectedGenre)
    : movies;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Movies</h1>
      <p className={styles.description}>Explore our collection of amazing films</p>

      <div className={styles.filterContainer}>
        <select 
          className={styles.genreSelect} 
          onChange={(e) => setSelectedGenre(e.target.value)} 
          value={selectedGenre}
          aria-label="Filter by genre"
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      {filteredMovies.length === 0 ? (
        <div className={styles.noResults}>
          No movies found for the selected genre.
        </div>
      ) : (
        <ul className={styles.moviesList}>
          {filteredMovies.map((movie) => (
            <li key={movie.id} className={styles.movieItem}>
              <div className={styles.movieLink}>
                <MovieCard movie={movie} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export async function getStaticProps() {
  const movies = await getMovies();
  const genres = await getGenres();

  if (!movies || movies.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      movies,
      genres,
    },
    revalidate: 60 * 60,
  };
}