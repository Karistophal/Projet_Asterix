import React from 'react'

function card(props) {
    return (
    <div className="attractions_card">
    <div className="titrevoiture">{props.libelleVehicule}</div>
    <img src={props.photoVehicule} alt={props.libelleVehicule} />
    <div>Description : {props.prixVehicule}</div>
    <div></div>
</div>
  )
}

export default card