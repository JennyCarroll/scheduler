// does not have a state. everything is passed downto it as props:
// 1. days: Array of day objects {id name spots}
// 2. day:string of the selected day
// 3. setDay: function setDay(day) {}

// responsible for rendering a list of DayListItems components
// it doesn't have any styles of its own so it doesn't need a DayList.scss file
import React from "react";
import DayListItem from "./DayListItem";

export default function DayList (props) {
  let array = props.days.map((day) => {
    const selected = props.day === day.name
    return (
      <DayListItem 
      key={day.id} 
      name={day.name} 
      spots={day.spots} 
      selected={selected} 
      setDay={props.setDay}/>
    )
  })
  return (<ul>{array}</ul>)
};