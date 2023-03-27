import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

// is being passed
// interviewers: array
// onChange: function
// value: number
export default function InterviewerList(props) {
  let array = props.interviewers.map((interviewer) => {
    const selected = props.value === interviewer.id;
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={selected}
        setInterviewer={() => props.onChange(interviewer.id)}
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
