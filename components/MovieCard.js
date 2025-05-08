import Link from 'next/link';
import styles from '../styles/MovieCard.module.css';

export default function MovieCard({ movie }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>
        <Link href={`/movies/${movie.id}`} className={styles.link}>
          {movie.title}
        </Link>
      </h3>
      <div className={styles.content}>
        {movie.description && (
          <p className={styles.description}>{movie.description}</p>
        )}
        <div className={styles.meta}>
          <span className={styles.year}>{movie.releaseYear}</span>
          {movie.rating && (
            <span className={styles.rating}>★ {movie.rating.toFixed(1)}</span>
          )}
        </div>
      </div>
    </div>
  );
}