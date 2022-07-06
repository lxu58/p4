
let particle_population = 500;

function setup() {
  createCanvas(1280, 720);

  //generate group of particle
  particle = new Array(particle_population);
  for (let i = 0; i < particle.length; i++) {
    particle[i] = new Particles(random(0, width), random(0, height));
  }

  barrier = [];
}

function draw() {
  background(98, 99, 96);


  makeBarrier();
  makeParticle();
  
  for (let i = 0; i < particle.length; i++) {
    particle[i].display();
  }

}

function makeBarrier() {
  if (barrier.length > 0) {
    for (let i = barrier.length - 1; i >= 0; i--) {
      if (barrier[i].lifePoints <= 0) {
        barrier.splice(i, 1);
      } else {
        barrier[i].update();
        barrier[i].display();
      }
    }
  }
}

function makeParticle() {
  if (particle.length < particle_population) {
    for (let i = 0; i <= particle_population - particle.length; i++) {
      particle.push(new Particles(random(0, width), random(0, height)));
    }
  }
  if (particle.length > particle_population) {
    particle.splice(particle_population, particle.length);
  }
  for (let i = 0; i < particle.length; i++) {
    particle[i].do();
  }
}


function mouseClicked() {
  barrier.push(new Barrier());
}
