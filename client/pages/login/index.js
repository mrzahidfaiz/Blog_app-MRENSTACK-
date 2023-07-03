import { useState } from "react";
import Input from "../../components/Input";
import loginSchema from "../../schemas/loginSchema";
import { useFormik } from "formik";
import { login } from "../api/internalApi";
import { setUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/navigation'

const index = () => {

  const navigate = useRouter();

  const dispatch = useDispatch();

  const [error, setError] = useState('');

  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: loginSchema,
  });


  const loginApiHandler = async (e) => {
    e.preventDefault();
    const data = {
      username: values.username,
      password: values.password
    }

    const response = await login(data);
    if(response.status === 200){
      const user = {
        _id: response.data.user._id,
        name: response.data.user.name,
        username: response.data.user.username,
        email: response.data.user.email,
        auth: response.data.auth,
        message: response.data.message,
      }
      dispatch(setUser(user));

      navigate.push('/');
    }else if(response.code === 'ERR_BAD_REQUEST'){
      console.log(response.response);
      setError(response.response.data.message)
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-400">
      <div className="bg-white md:p-16 xs:p-4 rounded shadow-2xl md:w-2/4 xs:w-full ">
        <h2 className="text-3xl font-bold mb-10 text-gray-800">
          Login Your Account
        </h2>

        <form className="space-y-5">
          <div>
            <label className="block mb-1 font-bold text-gray-500">
              Username
            </label>
            <Input
              type="username"
              name="username"
              autoComplete="on"
              value={values.username}
              onBlur={handleBlur}
              onChange={handleChange}
              error={errors.username && touched.username ? 1 : undefined}
              errormessage={errors.username}
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
            onBlur={handleBlur}
            onChange={handleChange}
            error={errors.password && touched.password ? 1 : undefined}
            errormessage={errors.password}
            />
          </div>
          <button onClick={loginApiHandler} className="block w-full text-white bg-gray-600 hover:bg-gray-800 p-4 rounded text-white-900  transition duration-300">
            Login 
          </button>
        </form>
        {error !== "" ? <p className="text-sm text-red-500 mt-6">{error}</p> : ""}
      </div>
    </div>
  );
};

export default index;
