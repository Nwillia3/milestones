// import React from "react";
export const miles = [
  {
    id: "1",
    title: "Got my first paying customer!",
    description:
      "All thanks to indie hackers and contributing to the community I was able to connect with somebody A fellow indie hacker) who needed Dynamic Image for his website"
  },
  {
    id: "2",
    title: "Plausible has 25 paying customers!",
    description:
      "Today I woke up to an email notification that another subscription has been created, taking the number of paying users up to 25! It blows my mind that people are paying for a product I made. What an incredible feeling"
  },
  {
    id: "3",
    title: "4 weeks of No CS Degree",
    description:
      "Hopefully I can get some more sponsors in the following month. I've approached some of the big bootcamps about this but I'm open to adverts from indie makers as well."
  }
];

export const addMileStone = mileStone => {
  Store.addMileStone(mileStone);
};

export const getMileStones = () => {
  return Store.getMileStones();
};

class Store {
  static getMileStones() {
    let mileStones;
    if (localStorage.getItem("mileStones") === null) {
      mileStones = [];
    } else {
      mileStones = JSON.parse(localStorage.getItem("mileStones"));
    }
    return mileStones;
  }

  static addMileStone(mileStone) {
    const mileStones = Store.getMileStones();
    mileStones.push(mileStone);
    localStorage.setItem("mileStones", JSON.stringify(mileStones));
  }

  static removeMileStone(title) {
    const mileStones = Store.getBooks();
    mileStones.forEach((mileStone, index) => {
      if (mileStone.title === title) {
        mileStones.splice(index, 1);
      }
    });

    JSON.parse(localStorage.setItem("mileStones", mileStones));
  }
}
