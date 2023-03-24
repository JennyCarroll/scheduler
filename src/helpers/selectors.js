export function getAppointmentsForDay(state, day) {
  let output = [];
  const arrayOfDayObj = state.days.filter((eachday) => eachday.name === day);
  if (arrayOfDayObj.length === 0) {
    return [];
  }
  //return an array of appointments for a given day.
  for (let appointment of arrayOfDayObj[0].appointments) {
    for (let appointmentId in state.appointments) {
      if (appointment === Number(appointmentId)) {
        output.push(state.appointments[appointmentId]);
      }
    }
  }
  //output is an array of appointment objects (state.appointments)
  return output;
}

export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }

  return {
    student: interview.student,
    interviewer: {
      id: interview.interviewer,
      name: state.interviewers[interview.interviewer].name,
      avatar: state.interviewers[interview.interviewer].avatar,
    },
  };
}
