import React, { useState, useEffect } from "react";
// import copy from "./assets/copy.svg";
// import linkIcon from "./assets/link.svg";
// import loader from "./assets/loader.svg";
// import tick from "./assets/tick.svg";
import { useLazyGetSummaryQuery } from "./article";
import { AiFillCopy } from "react-icons/ai";
import { FiLoader } from "react-icons/fi";
import { BsFillStickyFill } from "react-icons/bs";
import { AiOutlineLink } from "react-icons/ai";

const Demo = () => {
  const [article, setArticle] = useState({ url: "", summary: "" });
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);

      setAllArticles(updatedAllArticles);

      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);

    setTimeout(() => setCopied(false), 2500);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form
          onSubmit={handleSubmit}
          action="#"
          className="relative flex justify-center items-center"
        >
          <AiOutlineLink className="absolute left-0 my-2 ml-3 w-5" />
          {/* <img
            src={linkIcon}
            alt="Link-Icon"
            className="absolute left-0 my-2 ml-3 w-5"
          /> */}
          <input
            type="url"
            placeholder="Enter a URL.."
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            onKeyDown={handleKeyDown}
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            &#9166;
          </button>
        </form>
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div
              key={index}
              className="link_card"
              onClick={() => setArticle(item)}
            >
              <div onClick={() => handleCopy(item.url)} className="copy_btn">
                {copied === item.url ? (
                  <BsFillStickyFill className="w-[40%] h-[40%] object-contain" />
                ) : (
                  <AiFillCopy className="w-[40%] h-[40%] object-contain" />
                )}
                {/* <img
                  src={""}
                  alt="Copy/Tick-Icon"
                  className="w-[40%] h-[40%] object-contain"
                /> */}
              </div>
              <p className="flex-1 font-serif text-blue-700 font-medium text-sm truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          // <img src={loader} alt="Loader" className="w-20 h-20 object-contain" />
          <FiLoader className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="font-serif font-bold text-black text-center">
            Ooopsy, Doopsy! <br />
            <span className="font-serif font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-serif font-bold text-gray-600 text-xl">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="font-serif font-medium text-sm text-gray-700">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
