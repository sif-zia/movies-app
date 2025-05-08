// utils/db.js
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGO_URI;
let client;
let db;

export async function connectDB() {
	if (db) return db; // Return cached DB if already connected

	try {
		client = new MongoClient(uri, { useUnifiedTopology: true });
		await client.connect();
		db = client.db(); // Default DB from URI
		console.log("MongoDB Connected");
		return db;
	} catch (error) {
		console.error("MongoDB connection error:", error);
		throw error;
	}
}

export async function disconnectDB() {
	if (client) {
		await client.close();
		console.log("MongoDB Disconnected");
	}
}
export async function getMovies() {
	const db = await connectDB();
	const moviesCollection = db.collection("movies");
	const movies = await moviesCollection.find({}).toArray();

	return movies.map(movie => ({
		...movie,
		_id: movie._id.toString(),
	}));
}

export async function getGenres() {
	const db = await connectDB();
	const genresCollection = db.collection("genres");
	const genres = await genresCollection.find({}).toArray();

	return genres.map(genre => ({
		...genre,
		_id: genre._id.toString(),
	}));
}

export async function getDirectors() {
	const db = await connectDB();
	const directorsCollection = db.collection("directors");
	const directors = await directorsCollection.find({}).toArray();

	return directors.map(director => ({
		...director,
		_id: director._id.toString(),
	}));
}