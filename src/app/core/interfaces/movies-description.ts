export interface MoviesDescription {
    id:number,
    backdrop_path:string,
    genre_ids:number[],
    original_language:string,
    overview:string,
    release_date:string,
    vote_average:number,
    title:string,
    poster_path?:string,
    origin_country?:string,
    adult?:string,
    original_name?:string
    popularity?:number;
    first_air_date?:string
   name?:string

    
}
