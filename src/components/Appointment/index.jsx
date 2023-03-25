import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";

// A user will be able to create, edit and delete an appointment
// The <Appointment> component will display differently depending
// on what kind of task the user is completing. Each of these views
// (Empty, Show(booked), Form, Confirm, Status(loading) and Error) will be child components
// of the <Appointment> component.
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  return (
    <article className="appointment">
      {/* header displays the time for the appointment with a separater */}
      <Header time={props.time} />
      {/* every other component is shown conditionally */}
      {mode === EMPTY && (
        <Empty
          onAdd={() => {
            transition(CREATE);
          }}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
        />
      )}
      {mode === CREATE && (
        <Form
          // props.interviewers
          interviewers={[]}
          onSave={props.onSave}
          onCancel={back}
        />
      )}
      {/* before deleting an appointment confirm (cancel button triggers onCancel action, confirm button triggers onConfirm action) */}
      {/* <Confirm
        //doesn't the below have to be onClick with a conditional?
        onConfirm={props.onConfirm}
        onCancel={props.onCancel}
        message={props.message}
      /> */}
      {/* async operations ? status (saving or deleting) */}
      {/* <Status message={props.message} /> */}
      {/* error (saving  or deleting, when close button is clicked onClose action is called) */}
      {/* <Error message="Could not delete appointment." onClose={props.onClose} />
      form a user inputs their information, saves it, and edits it. */}
    </article>
  );
}
