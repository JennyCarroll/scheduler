import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

// is being passed
// interviewers: array
// setInterviewer: function
// interviewer: number
export default function InterviewerList(props) {
  let array = props.interviewers.map((interviewer) => {
    const selected = props.interviewer === interviewer.id;
    return (
      <InterviewerListItem
        id={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={selected}
        setInterviewer={props.setInterviewer}
      ></InterviewerListItem>
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{array}</ul>
    </section>
  );
}
