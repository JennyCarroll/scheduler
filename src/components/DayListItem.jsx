// If selected, this moldule is responsible for displaying the name, interview spots remaining,
// also the user must be able to select a particular day to view the interview information for that day.

import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  let dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  function formatSpots() {
    if (props.spots === 0) {
      return "no spots remaining";
    }
    if (props.spots === 1) {
      return `${props.spots} spot remaining`;
    }
    if (props.spots > 1) {
      return `${props.spots} spots remaining`;
    }
  }

  return (
    <li className={dayClass} onClick={props.onChange}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}
