import Link from "next/link";
import styles from "../../styles/Genres.module.css";
import { getGenres, getMovies } from "@/utils/db";

export default function Genres({ genres }) {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Genres</h1>
			<div className={styles.genreGrid}>
				{genres.map((genre) => (
					<div key={genre.id} className={styles.genreCard}>
						<Link href={`/genres/${genre.id}`} className={styles.genreLink}>
							<h2 className={styles.genreName}>{genre.name}</h2>
						</Link>
						{genre.description && (
							<p className={styles.genreDescription}>{genre.description}</p>
						)}
						<ul className={styles.moviesList}>
							{genre.movies.map((movie) => (
								<li key={movie.id} className={styles.movieItem}>
									<Link href={`/movies/${movie.id}`} className={styles.movieLink}>
										<span>{movie.title}</span>
										<span className={styles.movieYear}>({movie.releaseYear})</span>
									</Link>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</div>
	);
}

export async function getStaticProps() {
	const genres = await getGenres();
	const movies = await getMovies();

	genres.forEach((genre) => {
		genre.movies = movies.filter((movie) => movie.genreId === genre.id);
	});

	if (!genres || genres.length === 0) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			genres,
		},
		revalidate: 60 * 60,
	};
}