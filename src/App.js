import React, { Fragment, useState, useEffect } from "react";
import "./App.css";
import Milestone from "./component/milestone";
import { getMileStones, addMileStone } from "./data/milestones";

import uuid from "uuid/v1";

function App() {
  const [data, setData] = useState();
  const [formData, setFormData] = useState({
    id: `${uuid()} + ${Math.random()}`,
    title: "",
    description: ""
  });

  const { title, description } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    addMileStone(formData);
    setData(getMileStones());
  };

  return (
    <Fragment>
      <form onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="MileStone"
            name="title"
            value={title}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="MileStone"
            name="description"
            value={description}
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
      </form>

      <div className="App">
        <Milestone milestones={data} />
      </div>
    </Fragment>
  );
}

export default App;
