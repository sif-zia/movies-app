import Head from "next/head";
import { useContext } from "react";
import AppContext from '../context/context';
import styles from "../styles/Home.module.css";
import { useRouter } from 'next/router';
import MovieCard from "../components/MovieCard";
import { getMovies } from "@/utils/db";

export default function Home({ trendingMovies }) {
	const appContext = useContext(AppContext);
	const router = useRouter();

	const handleBrowseGenres = () => {
		router.push('/genres');
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>Movies App</title>
				<meta name="description" content="Assignment 2 AP" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			
			{/* Dark mode is now handled by Layout component */}
			
			<main className={styles.main}>
				<h1 className={styles.title}>Trending Movies</h1>
				
				<div className={styles.moviesList}>
					{trendingMovies.map((movie) => (
						<div key={movie.id} className={styles.movieItem}>
							<MovieCard movie={movie} />
						</div>
					))}
				</div>
				
				<button 
					className={styles.browseButton}
					onClick={handleBrowseGenres}
				>
					Browse Genres
				</button>
			</main>
		</div>
	);
}

export async function getStaticProps() {
	const movies = await getMovies();

	if (!movies || movies.length === 0) {
		return {
			notFound: true,
		};
	}

	const trendingMovies = movies.filter((movie) => movie.rating > 8.5);
	return {
		props: {
			trendingMovies: trendingMovies,
		},
		revalidate: 60 * 60
	};
}