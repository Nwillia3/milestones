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
