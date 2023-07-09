import { MutatingDots } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <MutatingDots
        height="100"
        width="100"
        color="#0096FF"
        secondaryColor="#0096FF"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loading;
