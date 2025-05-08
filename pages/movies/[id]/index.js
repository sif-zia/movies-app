import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../../styles/Movie.module.css";
import { ArrowLeft, Star, Film, Calendar, User } from "lucide-react";
import { getDirectors, getGenres, getMovies } from "@/utils/db";

export default function MovieDetail({ movie, genre }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!movie) {
    return <div className={styles.error}>Movie not found</div>;
  }

  const handleNavigateToDirector = () => {
    router.push(`/movies/${movie.id}/director`);
  };

  return (
    <div className={styles.container}>
      <Link href="/movies" className={styles.backLink}>
        <ArrowLeft size={16} /> Back to all movies
      </Link>
      
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>{movie.title}</h1>
          <p className={styles.description}>{movie.description}</p>
        </div>
        
        <div className={styles.content}>
          <div className={styles.metaGrid}>
            <div className={styles.metaItem}>
              <p className={styles.metaLabel}>Release Year</p>
              <div className={styles.metaValue}>
                <span className={styles.year}>
                  <Calendar size={18} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                  {movie.releaseYear}
                </span>
              </div>
            </div>
            
            <div className={styles.metaItem}>
              <p className={styles.metaLabel}>Rating</p>
              <div className={styles.rating}>
                <span className={styles.ratingValue}>
                  <Star size={16} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                  {movie.rating}/10
                </span>
              </div>
            </div>
            
            <div className={styles.metaItem}>
              <p className={styles.metaLabel}>Genre</p>
              <div className={styles.metaValue}>
                <Film size={18} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                <Link href={`/genres/${genre.id}`}>
                  {genre.name}
                </Link>
              </div>
            </div>
            
            <div className={styles.metaItem}>
              <p className={styles.metaLabel}>Director</p>
              <div className={styles.metaValue}>
                <button onClick={handleNavigateToDirector} className={styles.directorButton}>
                  <User size={18} /> {movie.director}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const movies = await getMovies();
  const directors = await getDirectors();
  const genres = await getGenres();

  const movie = movies.find((movie) => movie.id === params.id);
  if (!movie) {
    return {
      notFound: true,
    };
  }
  
  movie.director = directors.find((director) => director.id === movie.directorId).name;
  const genre = genres.find((genre) => genre.id === movie.genreId);

  return {
    props: {
      movie: movie,
      genre: genre || {}
    }
  };
}

export async function getStaticPaths() {
  const movies = await getMovies();

  const paths = movies.map((movie) => ({
    params: { id: movie.id },
  }));

  return {
    paths: paths,
    fallback: true,
  };
}