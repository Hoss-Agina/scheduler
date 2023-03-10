import React from "react";
import DayListItem from "components/DayListItem";


export default function DayList(props){
  const dayListArray = props.days.map(elm => {
    return (
      <DayListItem
        key={elm.id}
        name={elm.name}
        spots={elm.spots}
        selected={elm.name === props.value}
        setDay={props.onChange}
      />
    )
  })


  return(
    <ul>   
      {dayListArray}  
    </ul>
  )
}