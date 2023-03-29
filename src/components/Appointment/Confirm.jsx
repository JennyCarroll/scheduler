import React from "react";
import Button from "components/Button";

// The <Confirm> component should accept the following props:

// message:String
// onConfirm:Function to be called when the user clicks the Confirm button
// onCancel:Function to be called when the user clicks the Cancel button

export default function Confirm(props) {
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{props.message}</h1>
      <section className="appointment__actions">
        <Button onClick={props.onCancel} danger>
          Cancel
        </Button>
        <Button onClick={props.onConfirm} confirm>
          Confirm
        </Button>
      </section>
    </main>
  );
}
