export const nameRegex = new RegExp(/^[A-Za-z]+(?: [A-Za-z]+)*$/);
export const passwordRegex = new RegExp(
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{6,}$/,
);
