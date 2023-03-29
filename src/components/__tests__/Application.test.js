import React from "react";
import axios from "axios";

import {
  render,
  prettyDOM,
  getByText,
  cleanup,
  waitForElement,
  queryByAltText,
  getByAltText,
  getByPlaceholderText,
  fireEvent,
  getAllByTestId,
  waitForElementToBeRemoved,
  queryByText,
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  // asynchronous test
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, books an interview and reduces the spots remaing for the first day by 1", async () => {
    //1. Render the Application
    const { container, debug } = render(<Application />);
    //2. wait until the text "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    //3. get first appointment???
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    //4. click the add button
    fireEvent.click(getByAltText(appointment, "Add"));
    //5. enter student name into input
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
    //6. select an interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    //7. click save
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"));

    expect(queryByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    //2. wait until the text "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the element with the text "ARE YOU SURE YOU WANT TO DELETE?!" is displayed
    expect(
      getByText(appointment, "ARE YOU SURE YOU WANT TO DELETE?!")
    ).toBeInTheDocument();

    // 5. Click the "Confirm" button.
    fireEvent.click(getByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. Wait until the element with the text "Deleting" is removed.
    // await waitForElement(() => getByAltText(appointment, "Add"));
    await waitForElementToBeRemoved(() => getByText(appointment, "Deleting"));
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day1 = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day1, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    //2. wait until the text "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Edit"));

    //4. edit name
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Archie Cohen!" },
    });
    //5. save the appointment
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"));

    expect(queryByText(appointment, "Archie Cohen!")).toBeInTheDocument();

    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
    debug();
  });

  it("shows the save error when failing to save an appointment", async () => {
    //when we hit save it makes an axios call
    axios.put.mockRejectedValueOnce();
    //1. Render the Application
    const { container, debug } = render(<Application />);
    //2. wait until the text "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    //3. get first appointment???
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    //4. click the add button
    fireEvent.click(getByAltText(appointment, "Add"));
    //5. enter student name into input
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
    //6. select an interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    //7. click save
    fireEvent.click(getByText(appointment, "Save"));
    //wait for saving to be in the document
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => {
      return queryByText(appointment, "Could not save appointment.");
    });

    expect(
      queryByText(appointment, "Could not save appointment.")
    ).toBeInTheDocument();

    fireEvent.click(getByAltText(appointment, "Close"));

    expect(
      queryByText(appointment, "Could not save appointment.")
    ).not.toBeInTheDocument();
  });
  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    //2. wait until the text "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Delete"));

    expect(
      getByText(appointment, "ARE YOU SURE YOU WANT TO DELETE?!")
    ).toBeInTheDocument();

    fireEvent.click(queryByText(appointment, "Confirm"));

    //wait for deleting to be in the document
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    await waitForElement(() => {
      return queryByText(appointment, "Could not delete appointment.");
    });

    expect(
      queryByText(appointment, "Could not delete appointment.")
    ).toBeInTheDocument();

    fireEvent.click(getByAltText(appointment, "Close"));

    expect(
      queryByText(appointment, "Could not delete appointment.")
    ).not.toBeInTheDocument();
  });
});

// Search the project for other test files that contain a simple "renders without crashing" tes
// We will mock the functions we use from the axios library.
// We will write a test to confirm that the scheduler can load data.
// We will write an asynchronous test that waits for a component to update before proceeding.
// We will use containers to find specific DOM nodes.
// We will chain promises to handle asynchronous testing.
// We will override mock implementations for specific tests.
// We will use setup and teardown functions provided by Jest to perform common tasks.
