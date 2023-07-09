import React, { useState, useEffect } from "react";
import { GET_NEWS_API } from "../pages/api/ExternalApi";
import Loader from "../components/Loading";

const Home = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    // IIFE
    (async function newsapicall() {
      const reponse = await GET_NEWS_API();
      setNews(reponse);
    })();

    //clean up function
    setNews([]);
  }, []);

  if (news.length == 0) {
    return <Loader />;
  }

  const handleOpenUrl = (url) => {
    window.open(url, "_blank");
  };

  return (
    <main>
      <div>
        <h1 className="md:text-2xl sm:text-xl text-center pt-4">
          <span className="border-b-2">NEWS</span>
        </h1>
        <div className="grid lg:grid-cols-6 md:grid-cols-3 gap-4 p-4">
          {news.map((n) => (
            <div
              key={n.url}
              onClick={() => handleOpenUrl(n.url)}
              className="flex flex-col cursor-pointer min-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200"
            >
              <img
                src={n.urlToImage}
                alt={n.title}
                className="rounded-t-lg h-[250px]"
              />
              <h3 className="mb-2 md:text-xl sm:text-md font-bold tracking-tight text-gray-900 dark:text-white text-ellipsis overflow-hidden h-28">
                {n.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
