// If we break the <Form> down, we can identify the following features:

// track the state of the two elements
// (the student's name (the text input field) as a string and the selected interviewer's ID as a number)
// use an <input /> element to accept the name of the student,
// and the <InterviewerListItem /> component to display the selected interviewer.
// When we create the appointment, the student will default to "".
// The interviewer state will default to null.
// If there is an interview booked, then the name of the student
// and the ID of the interviewer should be used to initialize these values.

// Remember that the <InterviewerList> component takes a callback we named onChange.
// We can use this to keep track of the currently selected interviewer within the <Form> component.
// when the user clicks on the save button, it will be able to pass the state as arguments to an onSave callback.

// The <Form> component should have the following actions:
// setStudent:Function
// setInterviewer:Function

// The <Form> component should take the following props:
// student:String
// interviewers:Array
// interviewer:Number
// onSave:Function
// onCancel:Function

import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            onChange={(event) => setStudent(event.target.value)}
            name="name"
            type="text"
            placeholder="Enter Student Name"
          />
        </form>
        <InterviewerList interviewers={props.interviewers} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={props.onCancel}>
            Cancel
          </Button>
          <Button confirm onClick={props.onSave}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}

// Wait a minute. We were told that student and interviewer would be passed down as props when we first read about the Appointment Form.

// Why would we store something in state if it's going to be passed down as a prop? If it's being passed down, shouldn't the state of that data be set somewhere in a parent component?

// There are two things to think about here:

// Those values won't always be passed to the form. They'll only be passed when an existing appointment is being edited. If they are passed down, these data become the default values.

// Whether or not the values passed, the <Form> is the only place a user can change the value of the student's name or the interviewer.

// If we think about that second point, we realize that when a user is interacting with the <Form>, the values need to be updated immediately to give the user visual feedback. Once a user inputs data and saves, the <Form> disappears and is replaced by a saved appointment. Outside the view of using the <Form>, we don't need to store the student or interviewer in state because they are not being changed; they are not bound to an interactive element.

// So, we're choosing to hold the interviewer and student in state in the <Form>. Those are the only pieces of data the <Form> requires to do its job, and all components are on a need-to-know basis when it comes to data in React.
