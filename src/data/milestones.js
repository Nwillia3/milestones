export const addMileStone = mileStone => {
  Store.addMileStone(mileStone);
};

export const removeMileStone = mileStone => {
  Store.removeMileStone(mileStone);
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
    let mileStones = Store.getMileStones();
    mileStones.push(mileStone);

    mileStones = mileStones.sort((a, b) => {
      return new Date(b.startDate) - new Date(a.startDate);
    })

    localStorage.setItem(STORAGE_NAME, JSON.stringify(mileStones));
  }

  static removeMileStone(idx) {
    let mileStones = Store.getMileStones();
    mileStones.splice(idx, 1);

    mileStones = mileStones.sort((a, b) => {
      return new Date(b.startDate) - new Date(a.startDate);
    })
    localStorage.setItem(STORAGE_NAME, JSON.stringify(mileStones));
  }

}
