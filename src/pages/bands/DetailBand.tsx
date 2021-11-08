import { getAlbums, getBandById } from '@app/api/improvein';
import { Album, Band } from '@app/models/improvein';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

const PageDetailBand = () => {
    const {id} = useParams<any>();
    const [band, setBand] = useState<Band>();
    const [albums, setAlbums] = useState<Album[]>([]);

    useEffect(() => {
        getBandById(id).then((item)=>setBand(item));
        getAlbums({bandId:id}).then((items)=>{
            setAlbums(items);
        });
        return () => {
            
        }
    }, [id])

    return (
        <div>
            <div className="row">
                <div className="col-12">
                    {
                        band && (
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{band.name}</h5>
                                    <br/>
                                    <div className="">
                                        <small>{band.year} - {band.country}</small>
                                    </div>
                                    <br/>
                                    <h6>Members</h6>
                                    <ul className="list-group">
                                        {
                                            band.members.map((member,index)=>{
                                                return (<li className="list-group-item" key={index}>{member.name}</li>)
                                            })
                                        }
                                    </ul>
                                    <br/>
                                    <h6>Albums</h6>
                                    <ul className="list-group">
                                        {
                                            albums.map((album,index)=>{
                                                return (<li className="list-group-item" key={index}>{`${album.year} - ${album.name}`}</li>)
                                            })
                                        }
                                    </ul>
                                </div>
                                <div className="card-footer">
                                    <a type="button" className="btn btn-primary" href="/bands">Back</a>
                                </div>
                            </div>
                        )
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default PageDetailBand
