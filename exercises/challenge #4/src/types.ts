
export interface SearchError extends Error{
    status:number;// request.status,
}

export interface Session{
    success?:boolean;
    session_id?:string;
}

export interface Token{
    success?:boolean;
    expires_at?:string;
    request_token?:string;
}

interface MovieInfo{
    poster_path?:string|null;
        adult?:boolean;
        overview?:string;
        release_date?:string;
        genre_ids?:number[];
        id?:number;
        original_title:string;
        original_language?:string;
        title?:string;
        backdrop_path?:string|null;
        popularity?:number;
        vote_count?:number;
        video?:boolean;
        vote_average?:number
}

export interface SearchResults{
    page ?: number;
    results ?:MovieInfo[];
    total_pages?:number;
    total_results?:number;
}

export type MovieDBResponse = SearchError | SearchResults | Token | Session;


export interface CreateSessionRequestBody{
    requestToken:string;
}
export interface LoginRequestBody{
    username: string,
    password: string,
    request_token:string;
}
export interface CreateListRequestBody{
    name: string;
    description: string;
    language: string;
}

export interface AddMovieToListRequestBody{
    media_id: number;
}

export type MovieDBRequest = CreateSessionRequestBody | LoginRequestBody | CreateListRequestBody | AddMovieToListRequestBody;