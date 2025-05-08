import { getGenres } from "@/utils/db";

export default async function handler(req, res) {
	const genres = await getGenres();

	if (req.method === "GET") {
		if (!genres || genres.length === 0) {
			return res.status(404).json({ message: "No directors found" });
		}

		res.status(200).json(genres);
	}
}