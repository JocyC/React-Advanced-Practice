import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <section className="error-page section">
      <div className="error-container">
        <h1>oops! you reached a dead end 'o' </h1>
        <Link to="/" className="btn btn-primary">
          let's go back home
        </Link>
      </div>
    </section>
  );
};

export default Error;
