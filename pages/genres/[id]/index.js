import Link from "next/link";
import styles from "../../../styles/Genre.module.css";
import { getGenres, getMovies } from "@/utils/db";

export default function Genre({ genre, movies }) {
  return (
    <div className={styles.container}>
      <Link href="/genres" className={styles.backLink}>
        <span className={styles.backLinkIcon}>←</span> Back to Genres
      </Link>
      
      <div className={styles.genreHeader}>
        <h1 className={styles.title}>Genre: {genre.name}</h1>
        {genre.description && (
          <p className={styles.genreDescription}>{genre.description}</p>
        )}
      </div>

      {!movies && <div className={styles.loading}>Loading...</div>}
      {movies && movies.length === 0 && (
        <div className={styles.error}>No movies found in this genre.</div>
      )}
      
      {movies && movies.length > 0 && (
        <ul className={styles.moviesList}>
          {movies.map((movie) => (
            <li key={movie.id} className={styles.movieItem}>
              <Link href={`/movies/${movie.id}`} className={styles.movieLink}>
                <h3 className={styles.movieTitle}>{movie.title}</h3>
                <span className={styles.movieYear}>({movie.releaseYear})</span>
                {movie.rating && (
                  <span className={styles.movieRating}>★ {movie.rating.toFixed(1)}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const movies = (await getMovies()).filter((movie) => movie.genreId === params.id);
  const genres = await getGenres();
  const genre = genres.find((genre) => genre.id === params.id);

  if (!genre) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      genre: genre,
      movies,
    },
  };
}