const Input = (props) => {
  return (
    <>
      <input
        {...props}
        className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
      />
      {props.error && <p className="text-red-500 text-md">{props.errormessage}</p>}
    </>
  );
};

export default Input;
