import React, { useState, useEffect } from "react";
import "components/Application.scss";
import Button from "./Button";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import axios from "axios";

export default function Application() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });
  //state = day,  days, appts.  take day and replace it with day
  const setDay = (day) => setState({ ...state, day });
  const setDays = (days) => setState((prev) => ({ ...prev, days }));

  useEffect(() => {
    axios.get("/api/days").then((response) => {
      setDays(response.data);
    });
  }, []);
  console.log("state:", state);
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {Object.values(state.appointments).map((appointment) => {
          return (
            <Appointment key={appointment.id} {...appointment}></Appointment>
          );
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
//jsx is just html and javascript together inside a javascript file.  Html only exists inside the returns
