import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";
import Form from "./Form";

// A user will be able to create, edit and delete an appointment
// The <Appointment> component will display differently depending
// on what kind of task the user is completing. Each of these views
// (Empty, Show(booked), Form, Confirm, Status(loading) and Error) will be child components
// of the <Appointment> component.

export default function Appointment(props) {
  return (
    <article className="appointment">
      {/* header displays the time for the appointment with a separater */}
      <Header time={props.time} />
      {/* every other component is shown conditionally */}
      {/* !appointment ? empty (click on add button (image) will call on add action) */}
      {/* <Empty onAdd={props.onAdd} />
      {/* appointment show (displays name of student and interiewer scheduled, clicking on edit will call onEdit action, clicking on the trash icon will call the on delete action) */}
      {/* <Show
        student={props.student}
        interviewer={props.interviewer}
        onEdit={props.onEdit}
        onDelete={props.onDelete}
      /> */}
      {/* before deleting an appointment confirm (cancel button triggers onCancel action, confirm button triggers onConfirm action) */}
      {/* <Confirm
        ///oesn't the below have to be onClick with a conditional?
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
