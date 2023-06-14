import React from "react";
// import logo from "./assets/logo.svg";
import { GiReactor } from "react-icons/gi";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        {/* <img src={logo} alt="Logo" className="w-28 object-contain" /> */}
        <GiReactor className="w-28 object-contain" />
        <button
          type="button"
          className="black_btn"
          onClick={() => window.open("https://github.com", "_blank")}
        >
          Github
        </button>
      </nav>
      <h1 className="head_text">
        Summerize Articles with <br className="max-md:hidden" />
        <span className="orange_gradient">OpenAI GPT-4</span>
      </h1>
      <h2 className="desc">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe tempora
        iusto possimus aut laborum, nihil quas laboriosam totam? Blanditiis,
        quasi.
      </h2>
    </header>
  );
};

export default Hero;
