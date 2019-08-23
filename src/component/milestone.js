import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const style = {
  display: "flex",
  padding: "20apx",
  flexDirection: "column"
};

const styleH1 = {
  paddingRight: "10px"
};

const Milestone = ({ milestones }) => {
  let goal = milestones;

  if (goal === null || goal === undefined || !goal) {
    goal = [];
  } else {
    // console.log(goal);
    goal = milestones.map(ms => (
      <div key={ms.title} style={styleH1}>
        <h1> {ms.title}</h1>
        <p>{ms.description}</p>
        <p>{ms.date}</p>
        <Moment format="YYYY/MM/DD">{ms.date}</Moment>
      </div>
    ));
  }

  return <div style={style}> {goal} </div>;
};

Milestone.propTypes = {
  milestones: PropTypes.array.isRequired
};

export default Milestone;
