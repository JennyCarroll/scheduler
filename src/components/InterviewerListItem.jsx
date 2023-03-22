import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

// receives
// id:number
// name: string
// avatar: url
// selected: boolean
// setInterviewer (sets selected interviewer was on their id)
// has two states, selected (highlight item and show name of interviewer
// and not selected, show the image of the interviewer
export default function InterviewerListItem(props) {
  const conditionalClasses = classNames("interviewers__item-image", {
    "interviewers__item--selected": props.selected,
  });
  const interviewerName = props.selected ? props.name : "";
  return (
    <li className={conditionalClasses} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {interviewerName}
    </li>
  );
}
