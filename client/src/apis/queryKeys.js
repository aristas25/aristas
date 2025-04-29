export const queryUsersKey = () => ["users"];
export const queryUserKey = (user_id) => ["users", user_id];
export const queryProfessionalsSearchKey = (search) => [
  "professionals",
  search,
];
export const queryAppointmentsKey = (professional_id, currentWeekStart) => [
  "available-slots",
  professional_id,
  currentWeekStart,
];
export const queryAppointmentsUserKey = (user_id) => [
  "appointments",
  "users",
  user_id,
];
export const queryAppointmentsProfessionalKey = (user_id) => [
  "appointments",
  "professionals",
  user_id,
];
export const queryUsersUsernameValidationKey = (param) => [
  "usersUsernameValidation",
  param,
];
export const queryUsersEmailValidationKey = (param) => [
  "usersEmailValidation",
  param,
];
export const queryMedicalHistoryKey = (userId) => ["medicalHistoryKey", userId];
