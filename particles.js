class Particles {
	constructor(posX, posY){
    	this.location = createVector(posX, posY);
        this.acceleration = createVector();
  		this.velocity = createVector();
        this.maxSpeed = 3;
        this.maxSteeringForce = 0.005;

  	}
    
    do(){
        this.seek();
        //this.separate();
        this.update();
    }
    
    seek(){
        //go to the pos of mouse
    	var desired = createVector(mouseX, mouseY).sub(this.location);
        desired.setMag(this.maxSpeed);
        var steeringForce = desired.sub(this.velocity);
        steeringForce.setMag(this.maxSteeringForce);
        this.applyForce(steeringForce);
    }
    
    // separate(){
    //     var desiredseparation = 10;
  	// 	var steeringForce = createVector();
  	// 	var count = 0;
    //     var diff;
    //     var d;
        
    //     for (let i = 0; i < particle.length; i++) {
    //     	d = p5.Vector.dist(this.location,particle[i].location);
            
    //         if ((d > 0) && (d < desiredseparation)) {	
    //           	diff = p5.Vector.sub(this.location, particle[i].location);
    //           	diff.normalize();
    //           	diff.div(d);        // Weight by distance
    //           	steeringForce.add(diff);
    //           	count++;            
    //         }
    //     }
        
    //     if (count > 0) {
    //         steeringForce.div(count);
    //     }
  
  	// 	if (steeringForce.mag() > 0) {
    //         steeringForce.setMag(this.maxSteeringForce);
    //         this.applyForce(steeringForce);
    //     }
    // }
    
    applyForce(force){
        this.acceleration.add(force);
    }
    
    update(){
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxspeed);
        this.location.add(this.velocity);
        this.acceleration.mult(0);
    }
    
    display(){
        stroke(255, 213, 28);
        strokeWeight(4);
        point(this.location.x, this.location.y);

    }
}