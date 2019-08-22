import React, { useState } from "react";
import { addMileStone } from "../data/milestones";
import uuid from "uuid/v1";

const AddMileStone = props => {
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
  };

  return (
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
  );
};

export default AddMileStone;
