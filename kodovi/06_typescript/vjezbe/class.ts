import { randomUUID } from "crypto";
import { Movie } from "./interface";

class MovieService {

    /*
    readonly name: string;
    constructor(name: string) {
        this.name = name;
    }*/

    private movies: Movie[];    
    // syntactic sugar
    constructor(readonly name: string) {
        this.movies = [];
    }

    add() {

    }
}