import axios from "axios";
import { Album, Band, Genre } from "../models/improvein";

export async function getBands():Promise<Band[]> {
    return axios.get<Band[]>('https://my-json-server.typicode.com/improvein/dev-challenge/bands').then((response)=>response.data);
}
export async function getBandById(id:number):Promise<Band> {
    return axios.get<Band>(`https://my-json-server.typicode.com/improvein/dev-challenge/bands/${id}`).then((response)=>response.data);
}


export async function getGenres() {
    return axios.get<Genre[]>('https://my-json-server.typicode.com/improvein/dev-challenge/genre').then((response)=>response.data);
}

export interface AlbumsFilter {
    bandId:number;
}

export async function getAlbums(filter?:AlbumsFilter) {
    return axios.get<Album[]>('https://my-json-server.typicode.com/improvein/dev-challenge/albums',{
        params:filter
    }).then((response)=>response.data);
}

export async function db() {
    return axios.get('https://my-json-server.typicode.com/improvein/dev-challenge/db');
}
