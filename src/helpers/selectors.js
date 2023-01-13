export const getAppointmentsForDay = function(state, day) {
  let appointmentArr = [];
  const arrOfDays = state["days"]
  for (let elm of arrOfDays) {
    if (elm["name"] === day) {
      appointmentArr = elm["appointments"];
    }
  }
  appointmentArr =  appointmentArr.map(appointment => {
    return state["appointments"][String(appointment)];
  })
  return appointmentArr
}
