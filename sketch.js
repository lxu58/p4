
let particle_population = 1000;
let random_value = 0;

let particle_yellow = 1;
let particle_white = 2;
let particle_hit = 3;


function setup() {
  createCanvas(1024, 680);
  createP("right-click to generate a barrier to repel particles");

  //generate group of particle
  particle = new Array(particle_population);
  particle_type = new Array(particle_population);

  for (let i = 0; i < particle.length; i++) {

    random_value = random(0, 999);

    if(random_value % 1000 >= 50){

    particle[i] = new Particles_Yellow(random(0, width), random(0, height));
    particle_type[i] = particle_yellow;

    }else if (random_value % 1000 < 50 && random_value % 100 >= 5){

      particle[i] = new Particles_White(random(0, width), random(0, height));
      particle_type[i] = particle_white;

    }else{

      particle[i] = new Particles_Hit(random(0, width), random(0, height));
      particle_type[i] = particle_hit;

    }

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
