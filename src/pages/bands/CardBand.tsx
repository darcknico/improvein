import { Band } from '@app/models/improvein'
import React from 'react'
import styled from "styled-components";

export type CardBandProps = {
    item:Band,
}

const CardBandStyle = styled.div`
`;


const CardBand = ({item}:CardBandProps) => {
    return (
        <CardBandStyle className="col-md-3 col-12">
            <div className="card m-3">
                <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <br/>
                    <div className="">
                        <small>{item.year} - {item.country}</small>
                    </div>
                </div>
                <div className="card-footer">
                    <a type="button" className="btn btn-primary" href={`/bands/${item.id}`}>Details</a>
                </div>
            </div>
        </CardBandStyle>
    )
}

export default CardBand
