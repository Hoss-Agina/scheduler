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

export const getInterview = function(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewerStringNum = String(interview["interviewer"]);
  const interviewInfo = state["interviewers"][interviewerStringNum];
  const finalInterview = {...interview, interviewer: interviewInfo};
  return finalInterview;
}
