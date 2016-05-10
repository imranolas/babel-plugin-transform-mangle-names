class Gorilla {
  constructor(b, c) {
    this.name = b;
    this.jungle = c;
  }

  eat(b) {
    console.log(`just eating my ${ b } in the ${ this.jungle } jungle!`);
  }
}

const a = new Gorilla('Shabani', 'Congo');
a.eat('banana');
