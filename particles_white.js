class Particles_White {
    constructor(posX, posY) {
        this.location = createVector(posX, posY);
        this.acceleration = createVector();
        this.velocity = createVector();
        this.maxSpeed = 7;
        this.maxSteeringForce = 0.01;

    }

    do() {
        this.seek();
        this.separate();
        this.update();
    }

    seek() {
        //go to the pos of mouse
        //var desired = createVector(random(0, 1280), random(0, 720)).sub(this.location);
        var desired = createVector(mouseX, mouseY).sub(this.location);
        desired.setMag(this.maxSpeed);
        var steeringForce = desired.sub(this.velocity);
        steeringForce.setMag(this.maxSteeringForce);
        this.applyForce(steeringForce);
    }

    separate() {
        var desiredseparation = 10;
        var steeringForce = createVector();
        var count = 0;
        var diff;
        var d;

        for (let i = 0; i < particle.length; i++) {
            d = p5.Vector.dist(this.location, particle[i].location);

            //check if too close
            if ((d > 0) && (d < desiredseparation)) {
                diff = p5.Vector.sub(this.location, particle[i].location);
                diff.normalize();
                diff.div(d);        // Weight by distance
                steeringForce.add(diff);
                count++;
            }
        }

        if (count > 0) {
            steeringForce.div(count);
        }

        if (steeringForce.mag() > 0) {
            steeringForce.setMag(this.maxSteeringForce);
            this.applyForce(steeringForce);
        }
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    update() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxspeed);
        this.location.add(this.velocity);
        this.acceleration.mult(0);
    }

    display() {

        let angle = Math.atan2(mouseY-this.location.y, mouseX-this.location.x);

        push();

        
        
        translate(this.location.x ,this.location.y);
        rotate(angle + 20);
        rotate(20);
        stroke(255);
        strokeWeight(4);
        noFill();
        //noStroke();
        beginShape();
        vertex(-5, 0 );
        vertex(5, -10 );
        vertex(5, 10 );
        endShape(CLOSE);

        pop();
    }


    //     let targetAngle = 0.0;
    //     let currentAngle = 0.0;
    //     let smoothSpeed = 0.05;
    //     let x = this.location.x;
    //     let y = this.location.y;
    //     let count = 3;
    //     let iToTheta;
    //     let scl = 25.0;

    //     targetAngle = atan2(mouseY - y, mouseX - x);
    //     currentAngle = lerpAngle(currentAngle, targetAngle, smoothSpeed);

    //     noStroke();
    //     beginShape();
    //     for (let i = 0; i < count; ++i) {
    //         const theta = currentAngle + i * iToTheta;
    //         vertex(x + cos(theta) * scl, y + sin(theta) * scl);
    //     }
    //     endShape(CLOSE);

    //     // Linear interpolation of an angle.
    //     function lerpAngle(a, b, step) {
    //         // Prefer shortest distance,
    //         const delta = b - a;
    //         if (delta == 0.0) {
    //             return a;
    //         } else if (delta < -PI) {
    //             b += TWO_PI;
    //         } else if (delta > PI) {
    //             a += TWO_PI;
    //         }
    //         return (1.0 - step) * a + step * b;
    //     }

    // }
}