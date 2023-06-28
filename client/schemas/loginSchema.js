import * as yup from "yup";

const passwordMessage = "8 to 25 characters One UpperCase One LowerCase and One Number";

const loginSchema = yup.object().shape({
  username: yup.string().min(6).max(25).required("Username is required!"),
  password: yup.string().matches(passwordMessage).required("Password is Required!"),
});

export default loginSchema;
