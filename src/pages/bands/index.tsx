import React, { useEffect, useState } from 'react';
import { getBands, getGenres } from '@api/improvein';
import { Band, Genre } from '@models/improvein';
import CardBand from './CardBand';

const PageBands = () => {

    const [bands, setBands] = useState<Band[]>([]);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [searchValue, setSearchValue] = useState("");
    const [genreValue, setGenreValue] = useState("");

    const onClickClear = () => {
        setSearchValue("");
        setGenreValue("");
    }

    useEffect(() => {
        getBands().then((items)=>{
            setBands(items);
        });
        getGenres().then(item=>{
            setGenres(item);
        })
        return () => {
            
        }
    }, [])


    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Bands</h5>
                    <br/>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="search">Search</label>
                                <input type="text" className="form-control" id="search" placeholder="Search" value={searchValue} onChange={ev=>setSearchValue(String(ev.target.value).toLocaleLowerCase().trim())}/>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="form-group">
                                <label htmlFor="genre">Genre</label>
                                <select className="form-control" id="genre" value={genreValue} onChange={ev=>setGenreValue(ev.target.value)}>
                                    <option value="">Select the genre</option>
                                    {
                                        genres.map((genre)=>{
                                            return (<option value={genre.code} key={genre.code}>{genre.name}</option>)
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <button type="button" className="btn btn-primary" onClick={onClickClear}>Clear</button>
                </div>
            </div>
            <div className="row">
                {
                    bands.filter(band=>{
                        let test1 = false;
                        if(genreValue.length>0){
                            test1 = band.genreCode === genreValue;
                        }
                        let test2 = false;
                        if(searchValue.length >0){
                            test2 = band.name.toLocaleLowerCase().indexOf(searchValue) !== -1 
                                || band.country.toLocaleLowerCase().indexOf(searchValue) !== -1
                                || band.year.toString() === searchValue;
                        }
                        let test = false;
                        if(genreValue.length>0 && searchValue.length >0){
                            test = test2 && test1;
                        } else if(genreValue.length>0 || searchValue.length >0){
                            test = test2 || test1;
                        } else {
                            test = true;
                        }
                        
                        return test;
                    }).map(band=>{
                        return <CardBand key={band.id} item={band} />
                    })
                }
            </div>
            
        </div>
    )
}

export default PageBands
