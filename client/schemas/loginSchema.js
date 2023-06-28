import * as yup from "yup";



const loginSchema = yup.object().shape({
  username: yup.string().min(6).max(25).required("Username is required!"),
  password: yup.string().matches().required("Password is Required!"),
});

export default loginSchema;
