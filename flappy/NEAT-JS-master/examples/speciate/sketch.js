const TOTAL = 60 // 1000;
let birds = [];
let pipes = [];
let gen_dists = [];
let diffGenFits = [];
let simOn = true;
let counter = 0;
let gen = 1; // keep track of # of generations
let slider;
let neat;

let config = {
	model: [
		{nodeCount: 5, type: "input"},
		{nodeCount: 2, type: "output", activationfunc: activation.SOFTMAX}
	],
	mutationRate: 0.1,
	crossoverMethod: crossover.RANDOM,
	mutationMethod: mutate.RANDOM,
	populationSize: TOTAL,
	RGBmode: true,
};

function setup() {
  createCanvas(640, 480);
  slider = createSlider(1, 10, 1);
  for (let i = 0; i < TOTAL; i++) {
    birds[i] = new Bird();
  }
  neat = new NEAT(config);
}

function draw() {
  if (!simOn) {
	  return
  }
  for (let n = 0; n < slider.value(); n++) {
    if (counter % 57 == 0) {
      pipes.push(new Pipe());
    }
    counter++;

    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();

      for (let j = birds.length - 1; j >= 0; j--) {
        if (pipes[i].hits(birds[j]) || counter > 2000) {
          birds[j].dead = true;
        }
      }

      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }

    for (let i = birds.length - 1; i >= 0; i--) {
      if (birds[i].offScreen()) {
        birds[i].dead = true;
      }
    }

    for (let bird of birds) {
      if (!bird.dead) bird.update();
    }

    for (let i = 0; i < TOTAL; i++) {
      neat.setInputs(birds[i].inputss(pipes), i);
    }

    neat.feedForward();

	  let desicions = neat.getDesicions();
    for (let i = 0; i < TOTAL; i++) {
      if (desicions[i] === 1) {
        birds[i].up();
      }
    }

    let finish = true;
    for (let z = 0; z < birds.length; z++) {
      if (!birds[z].dead) {
        finish = false;
        break;
      }
    }
    if (finish) {
      counter = 0;
      pipes = [];
      let totalScore = 0;
      for (let i = 0; i < TOTAL; i++) {
		s = birds[i].score;
		totalScore += s;
        neat.setFitness(s, i);
        birds[i] = new Bird();
      }
	  let avgFit = totalScore/TOTAL;
	  console.log("avg score: " + avgFit);
	  // start saving after stabalization (~20 empicically)
	  if (gen > 20) {
		  neat.storeGen();
	  }
	  let start_gen = null;
	  let end_gen = null;
	  if (gen > 50) {
		  if (gen > 51) {
			  diffGenFits.push(avgFit);
			  if (final_gen > 80) {
				  simOn = false; // stop the simulation
				  break
			  }
		  }
		  // need to make start and end_gen fx of gen
		  // start_gen = ...
		  // end_gen = ...
		  let gen_dist = (end_gen - start_gen);
		  gen_dists.push(gen_dist);
		  console.log("generational distance: " + gen_dist)
	  }
	  neat.doGen(start_gen, end_gen);
	  gen += 1;
	  // update bird colors
	  let colors = neat.getColors();
	  for (let i = 0; i < TOTAL; i++) {
	    birds[i].setColors(colors[i]);
	  }
    }
  }

  // All the drawing stuff
  background(0);

  for (let bird of birds) {
    bird.show();
  }

  for (let pipe of pipes) {
    pipe.show();
  }
}
