import { register } from "../api/internalApi";
import { useFormik } from "formik";
import { setUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import Input from "../../components/Input";
import signupSchema from "../../schemas/signupSchema";
import { useState } from "react";
import { useRouter } from "next/navigation";

const index = () => {
  const dispatch = useDispatch();
  const navigate = useRouter();

  const [error, setError] = useState("");

  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: signupSchema,
  });

  const registerApiHandler = async (e) => {
    e.preventDefault();
    const data = {
      name: values.name,
      username: values.username,
      email: values.email,
      password: values.password,
      confirmpassword: values.confirmpassword,
    };
    const response = await register(data);
    if (response.status === 201) {
      const user = {
        _id: response.data.user._id,
        name: response.data.user.name,
        username: response.data.user.username,
        email: response.data.user.email,
        auth: response.data.auth,
        message: response.data.message,
      };
      dispatch(setUser(user));
      alert(response.data.message);
      navigate.push("/");
    } else if (response.code === "ERR_BAD_REQUEST") {
      console.log(response);
      setError(response.response.data.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-400">
      <div className="bg-white md:p-16 xs:p-4 rounded shadow-2xl md:w-2/4 xs:w-full ">
        <h2 className="text-2xl font-bold mb-10 text-gray-800">
          Create Your Account
        </h2>

        <form className="space-y-5">
          <div>
            <label className="block mb-1 font-bold text-gray-500">Name</label>
            <Input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.name && touched.name ? 1 : undefined}
              errormessage={errors.name}
            />
          </div>

          <div>
            <label className="block mb-1 font-bold text-gray-500">
              Username
            </label>
            <Input
              type="username"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.username && touched.username ? 1 : undefined}
              errormessage={errors.username}
            />
          </div>

          <div>
            <label className="block mb-1 font-bold text-gray-500">Email</label>
            <Input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email && touched.email ? 1 : undefined}
              errormessage={errors.email}
            />
          </div>

          <div>
            <label className="block mb-1 font-bold text-gray-500">
              Password
            </label>
            <Input
              type="password"
              name="password"
              autoComplete="on"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password && touched.password ? 1 : undefined}
              errormessage={errors.password}
            />
          </div>
          <div>
            <label className="block mb-1 font-bold text-gray-500">
              Confirm Password
            </label>
            <Input
              type="password"
              name="confirmpassword"
              autoComplete="on"
              value={values.confirmpassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                errors.confirmpassword && touched.confirmpassword
                  ? 1
                  : undefined
              }
              errormessage={errors.confirmpassword}
            />
          </div>

          <div className="flex items-center">
            <input type="checkbox" id="agree" required />
            <label htmlFor="agree" className="ml-2 text-gray-700 text-sm">
              I agree to the terms and privacy.
            </label>
          </div>

          <button
            onClick={registerApiHandler}
            className="block w-full bg-gray-600 hover:bg-gray-800 p-4 rounded text-white transition duration-300"
          >
            Sign Up
          </button>
        </form>
        {error !== "" ? (
          <p className="text-red-500 text-sm m-6 ">{error}</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default index;
