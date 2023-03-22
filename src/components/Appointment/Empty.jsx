// By default, if there are no appointments scheduled,
// our <Appointment> component will appear empty with a
// button (technically it's an image, but for our purposes,
// we will refer to it as a button). If the user clicks the button,
// they can add an interview. Clicking on the add button will trigger
// the onAdd callback that we will be passing as a prop in our story below.

import React from "react";

export default function Empty(props) {
  return (
    <main className="appointment__add">
      <img
        onClick={props.onAdd}
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
      />
    </main>
  );
}
