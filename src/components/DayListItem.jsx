// name={day.name}
// spots={day.spots} We use the spots prop for two purposes. To display the text "{props.spots} spots remaining" and to determine if the day is full. he DayListItem knows what it means to be full but not what it means to be selected. It uses this prop directly to determine which styles to apply.
// selected={day.name === props.day}
// setDay{props.setDay} 


// if selected, should display:
// name, interview spots remaining, 
// also the user must be able to select a particular day to view the interview information for that day.

import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  let dayClass = classNames("day-list__item", {"day-list__item--selected": props.selected, "day-list__item--full": props.spots === 0})
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
}

// export default function formatSpots () {
//   format props.spots
// }