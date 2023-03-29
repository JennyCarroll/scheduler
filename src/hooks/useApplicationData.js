import React, { useState, useEffect } from "react";
import Application from "../components/Application";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);
  //you can only use prev in the callback of a setter
  //findIndex is for when the objects in an array are complex objects
  function updateSpots(type) {
    const index = state.days.findIndex((day) => day.name === state.day);
    const copy = [...state.days];
    let newDay;
    //the objects inside state.days array of objects are still objects
    for (let day of copy) {
      if (day.name === state.day) {
        newDay = { ...day };
        if (type === "subtract") {
          //this is mutating state before the set state is happening.  the indiviual object in days are still pointing to the state
          newDay.spots = newDay.spots - 1;
        }
        if (type === "add") {
          newDay.spots = newDay.spots + 1;
        }
        if (type === "edit") {
          continue;
        }
      }
    }
    copy[index] = newDay;
    return copy;
  }
  //this is the way that they expected us to solve it
  function updateSpots2(appointments, appointmentId) {
    const foundDay = state.days.find((d) =>
      d.appointments.includes(appointmentId)
    );
    const spots = foundDay.appointments.filter(
      (id) => appointments[id].interview === null
    ).length;
    return state.days.map((d) =>
      d.appointments.includes(appointmentId) ? { ...d, spots } : d
    );
  }

  function bookInterview(id, interview) {
    //allows us to change the local state when we book an interview
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        setState((prev) => {
          const appointment = {
            ...prev.appointments[id],
            interview: { ...interview },
          };
          const appointments = {
            ...prev.appointments,
            [id]: appointment,
          };
          const isEdit =
            state.appointments[id].interview === null ? "subtract" : "edit";
          const days = updateSpots(isEdit);
          return { ...prev, appointments, days: days };
          // return {
          //   ...prev,
          //   appointments,
          //   days: updateSpots2(appointments, id),
          // };
        });
      });
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`).then((response) => {
      setState((prev) => {
        const appointment = {
          ...prev.appointments[id],
          interview: null,
        };
        const appointments = {
          ...prev.appointments,
          [id]: appointment,
        };
        const days = updateSpots("add");
        return { ...prev, appointments, days: days };
        // return { ...prev, appointments, days: updateSpots2(appointments, id) };
      });
    });
  }

  //state = day,  days, appts.  take day and replace it with day
  const setDay = (day) => setState({ ...state, day });

  return { state, setDay, bookInterview, cancelInterview };
}
