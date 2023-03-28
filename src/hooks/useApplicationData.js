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
          return { ...prev, appointments };
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
        //spreading prev (which is all state) and changing just the appointments object of objects)
        return { ...prev, appointments };
      });
    });
  }

  //state = day,  days, appts.  take day and replace it with day
  const setDay = (day) => setState({ ...state, day });

  return { state, setDay, bookInterview, cancelInterview };
}
