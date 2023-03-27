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

export function getInterviewersForDay(state, day) {
  let output = [];
  const arrayOfDayObj = state.days.filter((eachday) => eachday.name === day);
  if (arrayOfDayObj.length === 0) {
    return [];
  }
  //return an array of interviewer objects for a given day.
  for (let interviewer of arrayOfDayObj[0].interviewers) {
    for (let interviewerId in state.interviewers) {
      if (interviewer === Number(interviewerId)) {
        output.push(state.interviewers[interviewerId]);
      }
    }
  }
  //output is an array of interviewer objects (state.interviewers)
  return output;
}

// export function getInterviewersForDay(state, days) {
//   // console.log(state.days);
//   const filterDays = state.days.filter((day) => day.name === days);
//   if (filterDays.length < 1) {
//     return [];
//   }
//   const filteredInteviewers = filterDays[0].interviewers.map(
//     (interviewerKey) => state.interviewers[interviewerKey]
//   );
//   //does it have to be an array?  why can't I just put  it in curly braces above with interviewerKey in front?
//   console.log("filteredInteviewers:", filteredInteviewers);
//   console.log("filterdays:", filterDays);

//   return filteredInteviewers;
// }

export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }

  return {
    student: interview.student,
    interviewer: {
      id: interview.interviewer,
      name: state.interviewers[interview.interviewer]?.name,
      avatar: state.interviewers[interview.interviewer]?.avatar,
    },
  };
}
