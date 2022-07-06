class Barrier {
	constructor(){
        this.maxLifePoints = 50;
        this.lifePoints = this.maxLifePoints;
        this.radius= 1;
        this.location = createVector(mouseX, mouseY);
    }
    
    update(){        
        this.lifePoints -= 1;
        var softener = 10; 			
        this.intensity = 1/(this.maxLifePoints-this.lifePoints+softener);
        this.radius += this.intensity*100;
        this.repel();
    }
    
    repel(){
        var connection;
        var distance;
        var repelForce;
        for(let i = 0; i < particle.length; i++){
            
            if(particle_type[i] == 1){

            connection = p5.Vector.sub(particle[i].location, this.location);
            distance = connection.mag();
            if (distance <= this.radius*1.8) {
                repelForce = connection.setMag(this.intensity*6);
                particle[i].applyForce(repelForce);
            }

            }else if(particle_type[i] == 2){

                connection = p5.Vector.sub(particle[i].location, this.location);
                distance = connection.mag();
                if (distance <= this.radius*1.8) {
                    repelForce = connection.setMag(this.intensity*6);
                    particle[i].applyForce(repelForce);
                }

            }else{

                connection = p5.Vector.sub(particle[i].location, this.location);
                distance = connection.mag();
                if (distance <= this.radius*1.8) {
                    particle[i].getKilled = true;
                }

            }
        }
    }
    
    display(){

        let r = random(10, 50); 
        let g = random(10, 50);
        let b = random(210, 250);

        var opacity = map(this.lifePoints, this.maxLifePoints, 0, 200, 0);
        fill(190, 199, 227, opacity);
        stroke(r , g , b , opacity);
        strokeWeight(map(this.lifePoints, this.maxLifePoints, 0, 1, 20));
        circle(this.location.x, this.location.y, this.radius);

    }
}