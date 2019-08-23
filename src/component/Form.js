import React from "react";

const Form = ({ onSubmit, onChange, title, description }) => {
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

export default Form;
