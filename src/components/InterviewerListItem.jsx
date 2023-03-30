import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

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
