import Phaser from 'phaser';

export default class Insects extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, scale = 0.5, movementType = "random", time = 20, distance = 20) {
        super(scene, x, y, 'minsect', 0);
        this.scene.add.existing(this);
        this.scene = scene;
        this.scene.physics.world.enable(this);
        this.setScale(scale);
        this.setVisible(true);
        this.body.setCollideWorldBounds(false);
        // if you dont want the horizontal / vertikal platforms to collide with the world bounds
        if(movementType == 'horizontal' || movementType == 'vertikal'){
            this.body.setCollideWorldBounds(false);
        }
        
        this.body.setImmovable(true);
        this.body.setAllowGravity(false);
        this.movementType = movementType;
        this.time = time;
        this.distance = distance;
        this.speed = this.distance / this.time;
       
        this.countdown = 0;
        this.insect__ani_setup();
    }
    insect__ani_setup(){
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('minsect', {start: 0, end: 5 }),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('minsect', {start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('minsect', {start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
    }
    checkInsectMovement() {
      if (this.countdown <= 0) { // this will trigger every this.time seconds
         let fps = 60
          this.countdown = this.time * fps
          switch (this.movementType){
              case 'random':
                  this.setRandomMovement();
              case 'randomX':
                  this.setRandomXMovement();
              case 'randomY':
                  this.setRandomYMovement();
              case 'horizontal':
                  this.setHorizontalMovement();
              case 'vertikal':
                  this.setVertikalMovement();
          }
      } else {
          this.countdown--;
      }
  }
    setVertikalMovement(){
      if(this.body.velocity.y <= 0){          // if we are going in -Y direction go in +Y now
          this.body.setVelocityY(this.speed)
          this.anims.play('right');
      } else{                                 // else go in -Y now
          this.body.setVelocityY(-this.speed)
          this.anims.play('left');
      }
    }
    setHorizontalMovement(){
        if(this.body.velocity.x <= 0){          // if we are going in -X direction go in +X now
            this.body.setVelocityX(this.speed)
            this.anims.play('right');
        } else{                                 // else go in -X now
            this.body.setVelocityX(-this.speed)
            this.anims.play('left');
        }
    }
    setRandomMovement() { // random movement in X and Y direction
        const randomLeftRight = (Math.random() <= 0.5) ? 1 : -1;
        const randomUpDown = (Math.random() <= 0.5) ? 1 : -1;
        this.body.setVelocityX(this.getRandomAround(this.speed) * randomLeftRight);
        this.body.setVelocityY(this.getRandomAround(this.speed) * randomUpDown);
    }
    setRandomXMovement() { // random movement in X direction
        const randomLeftRight = (Math.random() <= 0.5) ? 1 : -1;
        this.body.setVelocityX(this.getRandomAround(this.speed) * randomLeftRight);
    }
    setRandomYMovement() { // random movement in Y direction
        const randomUpDown = (Math.random() <= 0.5) ? 1 : -1;
        this.body.setVelocityY(this.getRandomAround(this.speed) * randomUpDown);
    }
    getRandomAround(val){
        let res = Math.random() * (10) - 5; //random value between -5 and +5
        return res + val;
    }
}