//clouds = this.add.sprite(100, 500, 'clouds');.
//cloudsPath = new Phaser.Curves.Path(20,30).moveTo(20,50)

import Phaser from 'phaser';

export default class Cloud extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, key, frame, isAddative = "ADD") {
        super(scene, x, y, 'clouds', 0);
        this.scene.add.existing(this);
        this.scene = scene;
        this.scene.physics.world.enable(this);
        this.setScale(0.8);
        this.setVisible(true);
        this.setBlendMode(isAddative);
        this.body.setImmovable(true);
        this.body.setAllowGravity(false);
        this.setCloudMovement();
        this.depth = 1.8;
    }
    checkCloudMovement() {
        if (this.countdown <= 0) {
            this.setCloudMovement();
        } else {
            this.countdown--;
        }
    }
    setCloudMovement() {
    
        // Set a random number of frames for cloud to move in one direction
        this.countdown = this.getRandomBetween(50,200);
        
        // Randomly pick directions for cloud to move
        const randomLeftRight = (Math.random() <= 0.5) ? 1 : -1;
        const randomUpDown = (Math.random() <= 0.5) ? 1 : -1;

        // Randomly pick velocities for cloud to move
        this.body.setVelocityX(this.getRandomBetween(20, 30) * randomLeftRight);
        this.body.setVelocityY(this.getRandomBetween(20,30) * randomUpDown);
        
        this.body.setImmovable(true)
        //this.body.setVelocity(100, -100);
        this.body.setAllowGravity(false);
        // this.tweens.timeline({
        //     targets: this.body.velocity,
        //     loop: -1,
        //     tweens: [
        //       { x:    0, y: -20, duration: 2000, ease: 'Stepped' },
        //       { x:    0, y:    0, duration: 1000, ease: 'Stepped' },
        //       { x:  15, y:  10, duration: 4000, ease: 'Stepped' },
        //       { x:    0, y: -20, duration: 2000, ease: 'Stepped' },
        //       { x:    0, y:    0, duration: 1000, ease: 'Stepped' },
        //       { x: -15, y:  10, duration: 4000, ease: 'Stepped' }
        //     ]
        //   });
            
    }      
    getRandomBetween(min, max) { 
        return Math.random() * (20 - 30) + 30;
     } 
}

