import Validator from "validator";
import isEmpty from "./isEmpty";

function validateSignUp(data: any) {
  let errors: any = {};

  data.Email = !isEmpty(data.Email) ? data.Email : "";
  data.Password = !isEmpty(data.Password) ? data.Password : "";
  data.ConfirmPassword = !isEmpty(data.ConfirmPassword)
    ? data.ConfirmPassword
    : "";

  if (Validator.isEmpty(data.Email)) {
    errors.hasFilledRequired = false;
  } else if (!Validator.isEmail(data.Email)) {
    errors.Email = "Invalid email";
  }

  if (Validator.isEmpty(data.Password)) {
    errors.hasFilledRequired = false;
  } else if (data.Password.length < 8) {
    errors.Password = "Password length must be 8 characters";
  }

  if (Validator.isEmpty(data.ConfirmPassword)) {
    errors.hasFilledRequired = false;
  } else if (
    !Validator.isEmpty(data.Password) &&
    !Validator.isEmpty(data.ConfirmPassword)
  ) {
    if (data.Password !== data.ConfirmPassword) {
      errors.ConfirmPassword =
        "Confirm password and password field aren't matched";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
export default validateSignUp;
