import React from "react";
import PropTypes from "prop-types";

const style = {
  display: "flex",
  padding: "20apx",
  flexDirection: "row"
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
      </div>
    ));
  }

  return <div style={style}> {goal} </div>;
};

Milestone.propTypes = {
  milestones: PropTypes.array.isRequired
};

export default Milestone;
