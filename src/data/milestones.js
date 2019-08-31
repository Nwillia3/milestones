export const addMileStone = mileStone => {
  Store.addMileStone(mileStone);
};

export const getMileStones = () => {
  return Store.getMileStones();
};

const STORAGE_NAME = "mileStones"

class Store {
  static getMileStones() {
    let mileStones;
    if (localStorage.getItem(STORAGE_NAME) === null) {
      mileStones = [];
    } else {
      mileStones = JSON.parse(localStorage.getItem(STORAGE_NAME));
    }
    return mileStones;
  }

  static addMileStone(mileStone) {
    const mileStones = Store.getMileStones();
    mileStones.push(mileStone);
    localStorage.setItem(STORAGE_NAME, JSON.stringify(mileStones));
  }

  static removeMileStone(title) {
    const mileStones = Store.getBooks();
    mileStones.forEach((mileStone, index) => {
      if (mileStone.title === title) {
        mileStones.splice(index, 1);
      }
    });

    JSON.parse(localStorage.setItem(STORAGE_NAME, mileStones));
  }
}
