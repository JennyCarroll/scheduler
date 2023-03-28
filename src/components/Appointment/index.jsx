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
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
//status(loading)
const SAVING = "SAVING";
const DELETING = "DELETING";
//errors
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }

  function confirm() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }

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
          student={props.interview?.student}
          interviewer={props.interview?.interviewer.name}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onSave={save} onCancel={back} />
      )}

      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}

      {/* async operations ? status (saving or deleting) */}
      {mode === SAVING && <Status message="Saving" />}

      {mode === DELETING && <Status message="Deleting" />}

      {/* before deleting an appointment confirm (cancel button triggers onCancel action, confirm button triggers onConfirm action) */}
      {mode === CONFIRM && (
        <Confirm
          onConfirm={confirm}
          onCancel={back}
          message="ARE YOU SURE YOU WANT TO DELETE?!"
        />
      )}

      {/* error (saving  or deleting, when close button is clicked onClose action is called) */}
      {mode === ERROR_SAVE && (
        <Error message="Could not save appointment." onClose={back} />
      )}

      {mode === ERROR_DELETE && (
        <Error message="Could not delete appointment." onClose={back} />
      )}
    </article>
  );
}
