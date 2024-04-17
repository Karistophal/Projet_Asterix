import React from 'react'

function card(props) {
    return (
    <div className="attractions_card">
    <div className="title__attractions">{props.nom}</div>
    <img src={props.image} alt={props.nom} />
    <div>Description : {props.description}</div>
    <div></div>
</div>
  )
}

export default card