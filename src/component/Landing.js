import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Landing = props => {
  return (
    <Fragment>
      <header className="main-header">
        <Link to="/">
          <h1 className="brand-log"> Logo</h1>

          <h1 className="brand-log-name"> MS</h1>
        </Link>
        <nav className="main-nav">
          <ul>
            <li>
              <Link to="/product">View Product</Link>
            </li>
            <li>
              <Link to="/product">Github</Link>
            </li>
          </ul>
        </nav>
      </header>
      <section className="home-main-section">
        <div className="call-to-action">
          <h1 className="title">Conquer Milestommes</h1>
          <span className="subtite">Never stop never settle</span>
          <Link to="/product" className="btn">
            View Product
          </Link>
        </div>
        <div className="img-wrapper">
          <div className="snow-image" />
        </div>
      </section>
    </Fragment>
  );
};

export default Landing;
