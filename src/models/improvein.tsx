export interface Album{
    id:number;
    bandId:number;
    name:string;
    year:number;
}

export interface Member{
    name:string;
}

export interface Band{
    id:number;
    name:string;
    genreCode:string;
    year:number;
    country:string;
    members:Member[];
}

export interface Genre{
    code:string;
    name:string;
}