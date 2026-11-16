import { randomUUID } from "crypto";
import { Rating } from "./index";

export interface Movie {
    readonly id: string;
    name: string;
    description?: string;
}

const movie_1: Movie = { id: randomUUID(), name: "Spectre" };
// console.log(movie_1);

interface RatedMovie extends Movie {
    rating: Rating
}

const movie_2: RatedMovie = { id: randomUUID(), name: "Django Unchained", rating: 5 };

const movieAsString: string = '{ "id": "abc123", "name": "Inglorious Basterdz" }';
const movie_3 = JSON.parse(movieAsString) as Movie;
// console.log(movie_3)


const movies: Movie[] = [movie_1, movie_2, movie_3];

const searchStr = "Django Unchained";

const foundMovie: Movie | undefined = movies.find(m => m.name === searchStr);

if (foundMovie) {
    console.log((foundMovie as RatedMovie).rating);
}



interface APIResponse<T> {
    message: string;
    data: T[]; 
}

const res: APIResponse<Movie> = { message: "Successfully obtained from DB", data: movies };