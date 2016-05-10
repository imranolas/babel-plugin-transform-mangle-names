class Gorilla {
  constructor(name, jungle) {
    this.name = name;
    this.jungle = jungle;
  }

  eat(food) {
    console.log(`just eating my ${food} in the ${this.jungle} jungle!`);
  }
}

const shabani = new Gorilla('Shabani', 'Congo');
shabani.eat('banana');
