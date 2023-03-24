export function getAppointmentsForDay(state, day) {
  let output = [];
  const array = state.days.filter((eachday) => eachday.name === day);
  if (array.length === 0) {
    return [];
  }
  //return an array of appointments for a given day.
  for (let appointment of array[0].appointments) {
    for (let appointmentId in state.appointments) {
      if (appointment === Number(appointmentId)) {
        output.push(state.appointments[appointmentId]);
      }
    }
  }
  return output;
}
