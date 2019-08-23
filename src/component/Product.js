import React, { Fragment, useState } from "react";
import uuid from "uuid/v1";
import Milestone from "./milestone";
import { getMileStones, addMileStone } from "../data/milestones";
import Form from "./Form";
import "../Product.css";

import Modal from "./Modal";

function Product() {
  const [data, setData] = useState(getMileStones());

  const [toggleData, setToggleData] = useState(true);

  const [formData, setFormData] = useState({
    id: `${uuid()} + ${Math.random()}`,
    title: "",
    description: "",
    date: Date.now()
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

  // get a sort by date
  const sortByDate = () => {
    let mileStones = data;

    toggleData
      ? (mileStones = data.sort((a, b) => (a.date < b.date ? 1 : -1)))
      : (mileStones = data.sort((a, b) => (a.date > b.date ? 1 : -1)));
    setData(mileStones);
    setToggleData(!toggleData);
  };

  const handleClick = e => {
    sortByDate();
  };

  const onKeyUp = e => {
    //get value of input
    let val = e.target.value;
    let goals = data;

    val === ""
      ? (goals = data)
      : (goals = data.filter(goal => goal.title === e.target.value));

    console.log(goals);
    setData(goals);
  };

  const [modal, setModal] = useState(false);

  const openModal = e => {
    setModal(true);
  };

  const closeModal = e => {
    setModal(false);
  };

  return (
    <section>
      <Fragment>
        <button onClick={e => handleClick(e)}>
          {toggleData ? "Newest" : "Oldest"}
        </button>

        <button onClick={e => openModal(e)}>open Modal</button>

        <input type="text" onKeyUp={e => onKeyUp(e)} />
        {modal ? (
          <div onClick={() => closeModal()} className="back-drop" />
        ) : null}

        <Modal
          className="modal"
          show={modal}
          close={() => closeModal()}
          text="show something"
        />

        <Form
          onChange={e => onChange(e)}
          onSubmit={e => onSubmit(e)}
          title={title}
          description={description}
        />

        <div className="App">
          <Milestone milestones={data} />
        </div>
      </Fragment>
    </section>
  );
}

export default Product;
