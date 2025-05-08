import useSWR from "swr";
import Link from "next/link";
import Head from "next/head";
import styles from "../../styles/Directors.module.css";

export default function Directors() {
	const fetcher = (url) => fetch(url).then((res) => res.json());
	const {data: directors, error} = useSWR('/api/directors', fetcher);

	return (
		<div className={styles.container}>
			<Head>
				<title>Film Directors | Movies App</title>
				<meta name="description" content="Explore famous film directors and their movies" />
			</Head>

			<h1 className={styles.title}>Film Directors</h1>
			
			{error && <div className={styles.error}>Failed to load directors</div>}
			{!directors && !error && <div className={styles.loading}>Loading directors...</div>}
			
			{directors && (
				<div className={styles.directorGrid}>
					{directors.map((director) => (
						<div key={director.id} className={styles.directorCard}>
							<h2 className={styles.directorName}>{director.name}</h2>
							<p className={styles.directorBio}>{director.biography}</p>
							
							<div className={styles.moviesSection}>
								<h3 className={styles.moviesTitle}>Movies</h3>
								{director.movies && director.movies.length > 0 ? (
									<ul className={styles.moviesList}>
										{director.movies.map((movie) => (
											<li key={movie.id} className={styles.movieItem}>
												<Link href={`/movies/${movie.id}`} className={styles.movieLink}>
													<span>{movie.title}</span> 
													<span className={styles.movieYear}>({movie.releaseYear})</span>
												</Link>
											</li>
										))}
									</ul>
								) : (
									<p className={styles.noMovies}>No movies available</p>
								)}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}