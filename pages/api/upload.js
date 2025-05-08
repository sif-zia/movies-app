// pages/api/upload.js
import { connectDB } from "@/utils/db";

const data = {
  movies: [
    {
      id: "1",
      title: "Inception",
      directorId: "d1",
      description: "A mind-bending thriller about dreams within dreams.",
      releaseYear: 2010,
      genreId: "g1",
      rating: 8.8
    },
    {
      id: "2",
      title: "The Dark Knight",
      directorId: "d1",
      description: "Batman faces off against the Joker in Gotham City.",
      releaseYear: 2008,
      genreId: "g5",
      rating: 9.0
    },
    {
      id: "3",
      title: "Interstellar",
      directorId: "d1",
      description: "Explorers travel through a wormhole in space.",
      releaseYear: 2014,
      genreId: "g1",
      rating: 8.6
    },
    {
      id: "4",
      title: "The Prestige",
      directorId: "d1",
      description: "Two rival magicians battle for supremacy.",
      releaseYear: 2006,
      genreId: "g5",
      rating: 8.5
    },
    {
      id: "5",
      title: "Parasite",
      directorId: "d2",
      description: "A poor family infiltrates a wealthy household.",
      releaseYear: 2019,
      genreId: "g4",
      rating: 8.6
    },
    {
      id: "6",
      title: "Snowpiercer",
      directorId: "d2",
      description: "Survivors of Earth's second ice age live on a train.",
      releaseYear: 2013,
      genreId: "g1",
      rating: 7.1
    },
    {
      id: "7",
      title: "The Matrix",
      directorId: "d3",
      description: "A hacker discovers his world is a simulation.",
      releaseYear: 1999,
      genreId: "g1",
      rating: 8.7
    },
    {
      id: "8",
      title: "The Matrix Reloaded",
      directorId: "d3",
      description: "Neo continues the fight against the machines.",
      releaseYear: 2003,
      genreId: "g1",
      rating: 7.2
    },
    {
      id: "9",
      title: "Cloud Atlas",
      directorId: "d3",
      description: "Stories intertwine across time and space.",
      releaseYear: 2012,
      genreId: "g2",
      rating: 7.4
    },
    {
      id: "10",
      title: "La La Land",
      directorId: "d4",
      description: "A jazz musician and actress fall in love in LA.",
      releaseYear: 2016,
      genreId: "g3",
      rating: 8.0
    },
    {
      id: "11",
      title: "Whiplash",
      directorId: "d4",
      description: "A drummer faces brutal training to achieve greatness.",
      releaseYear: 2014,
      genreId: "g3",
      rating: 8.5
    },
    {
      id: "12",
      title: "First Man",
      directorId: "d4",
      description: "Neil Armstrong's journey to the moon.",
      releaseYear: 2018,
      genreId: "g2",
      rating: 7.3
    },
    {
      id: "13",
      title: "The Great Gatsby",
      directorId: "d5",
      description: "Lavish parties and mystery in 1920s New York.",
      releaseYear: 2013,
      genreId: "g4",
      rating: 7.2
    },
    {
      id: "14",
      title: "Moulin Rouge!",
      directorId: "d5",
      description: "A poet falls in love with a cabaret star.",
      releaseYear: 2001,
      genreId: "g3",
      rating: 7.6
    },
    {
      id: "15",
      title: "Australia",
      directorId: "d5",
      description: "An English aristocrat travels across the Australian Outback.",
      releaseYear: 2008,
      genreId: "g2",
      rating: 6.6
    },
    {
      id: "16",
      title: "Tenet",
      directorId: "d1",
      description: "A secret agent manipulates time to prevent disaster.",
      releaseYear: 2020,
      genreId: "g1",
      rating: 7.3
    },
    {
      id: "17",
      title: "Okja",
      directorId: "d2",
      description: "A girl raises a genetically modified pig.",
      releaseYear: 2017,
      genreId: "g4",
      rating: 7.3
    },
    {
      id: "18",
      title: "Sense8",
      directorId: "d3",
      description: "Eight strangers are mentally linked.",
      releaseYear: 2015,
      genreId: "g2",
      rating: 8.2
    },
    {
      id: "19",
      title: "Babylon",
      directorId: "d4",
      description: "A tale of early Hollywood's decadence.",
      releaseYear: 2022,
      genreId: "g4",
      rating: 7.1
    },
    {
      id: "20",
      title: "Elvis",
      directorId: "d5",
      description: "The life of music icon Elvis Presley.",
      releaseYear: 2022,
      genreId: "g3",
      rating: 7.4
    }
  ],
  genres: [
    { id: "g1", name: "Science Fiction" },
    { id: "g2", name: "Adventure" },
    { id: "g3", name: "Drama" },
    { id: "g4", name: "Thriller" },
    { id: "g5", name: "Action" }
  ],
  directors: [
    {
      id: "d1",
      name: "Christopher Nolan",
      biography: "British-American director known for complex storytelling and visual innovation."
    },
    {
      id: "d2",
      name: "Bong Joon-ho",
      biography: "South Korean filmmaker acclaimed for combining drama, social commentary, and thrills."
    },
    {
      id: "d3",
      name: "The Wachowskis",
      biography: "Sibling duo behind groundbreaking sci-fi films including The Matrix trilogy."
    },
    {
      id: "d4",
      name: "Damien Chazelle",
      biography: "American director known for musical dramas like Whiplash and La La Land."
    },
    {
      id: "d5",
      name: "Baz Luhrmann",
      biography: "Australian director known for visually extravagant films like Moulin Rouge! and The Great Gatsby."
    }
  ]
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: "Only GET requests allowed" });
  }

  try {
    const db = await connectDB();

    const moviesCollection = db.collection("movies");
    const genresCollection = db.collection("genres");
    const directorsCollection = db.collection("directors");

    // Clear existing data (optional)
    await Promise.all([
      moviesCollection.deleteMany({}),
      genresCollection.deleteMany({}),
      directorsCollection.deleteMany({})
    ]);

    // Insert new data
    await Promise.all([
      moviesCollection.insertMany(data.movies),
      genresCollection.insertMany(data.genres),
      directorsCollection.insertMany(data.directors)
    ]);

    res.status(200).json({ message: "Data uploaded successfully" });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to upload data" });
  }
}
