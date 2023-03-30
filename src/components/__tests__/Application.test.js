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
    //3. get first appointment
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

    //8. status mode shows
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    //9. status mode leaves
    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"));

    //10. appointment appears and spots are updated
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

    // 4. Check that the element with the text "Are you sure you want to delete?" is displayed
    expect(
      getByText(appointment, "Are you sure you want to delete?")
    ).toBeInTheDocument();

    // 5. Click the "Confirm" button.
    fireEvent.click(getByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. Wait until the element with the text "Deleting" is removed.
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

    //6. status shows
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    //7. status leaves
    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"));

    //8. edited appointment shows
    expect(queryByText(appointment, "Archie Cohen!")).toBeInTheDocument();

    //9. spots is not updated
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    //reject the axios call we will make when we hit save
    axios.put.mockRejectedValueOnce();
    //1. Render the Application
    const { container, debug } = render(<Application />);

    //2. wait until the text "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    //3. get first appointment
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

    //8. status shows
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    //9. error message shows
    await waitForElement(() => {
      return queryByText(appointment, "Could not save appointment.");
    });

    expect(
      queryByText(appointment, "Could not save appointment.")
    ).toBeInTheDocument();

    // 10. close the error message and it is removed
    fireEvent.click(getByAltText(appointment, "Close"));

    expect(
      queryByText(appointment, "Could not save appointment.")
    ).not.toBeInTheDocument();
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    // 1. Render the Application.
    const { container } = render(<Application />);

    //2. wait until the text "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Delete"));

    //4. confirmation message appears
    expect(
      getByText(appointment, "Are you sure you want to delete?")
    ).toBeInTheDocument();

    //5. Click confirm
    fireEvent.click(queryByText(appointment, "Confirm"));

    //6. status shows
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    //7. error message shows
    await waitForElement(() => {
      return queryByText(appointment, "Could not delete appointment.");
    });

    expect(
      queryByText(appointment, "Could not delete appointment.")
    ).toBeInTheDocument();

    //8. close error message and it is removed
    fireEvent.click(getByAltText(appointment, "Close"));

    expect(
      queryByText(appointment, "Could not delete appointment.")
    ).not.toBeInTheDocument();
  });
});
