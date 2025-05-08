import fs from "fs";
import Link from "next/link";
import path from "path";
import { ArrowLeft } from "lucide-react";
import styles from "../../../../styles/MovieDirector.module.css";
import { getDirectors, getMovies } from "@/utils/db";

export default function MovieDirector({ director, movieTitle }) {
  if (!director) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <Link href={`/movies/${director.movies[0].id}`} className={styles.backLink}>
        <ArrowLeft size={16} /> Back to {movieTitle}
      </Link>
      
      <div className={styles.header}>
        <h1 className={styles.name}>{director.name}</h1>
        <h2 className={styles.biography}>{director.biography}</h2>
      </div>
      
      <div className={styles.moviesSection}>
        <h3 className={styles.moviesTitle}>Filmography</h3>
        <ul className={styles.moviesList}>
          {director.movies.map((movie) => (
            <li key={movie.id} className={styles.movieItem}>
              <Link href={`/movies/${movie.id}`} className={styles.movieLink}>
                <span>{movie.title}</span>
                <span className={styles.movieYear}>{movie.releaseYear}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const movies = await getMovies();
  const directors = await getDirectors();

  const movie = movies.find((movie) => movie.id === params.id);
  const directorId = movie.directorId;
  const director = directors.find((director) => director.id === directorId);
  director.movies = movies.filter((movie) => movie.directorId === directorId);
  
  if (!director) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      director: director,
      movieTitle: movie.title,
    },
  };
}

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), "data", "movies.json");
  const jsonData = fs.readFileSync(filePath);
  const movies = JSON.parse(jsonData).movies;

  const paths = movies.map((movie) => ({
    params: { id: movie.id },
  }));

  return {
    paths: paths,
    fallback: true,
  };
}