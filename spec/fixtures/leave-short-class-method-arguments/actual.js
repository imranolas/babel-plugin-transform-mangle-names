class Gorilla {
  constructor(n, j) {
    this.name = n;
    this.jungle = j;
  }

  eat(f) {
    console.log(`just eating my ${f} in the ${this.jungle} jungle!`);
  }
}

const shabani = new Gorilla('Shabani', 'Congo');
shabani.eat('banana');
