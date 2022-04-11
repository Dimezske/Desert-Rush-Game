//clouds = this.add.sprite(100, 500, 'clouds');.
//cloudsPath = new Phaser.Curves.Path(20,30).moveTo(20,50)

import Phaser from 'phaser';

export default class Cloud extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, key, frame) {
        super(scene, x, y, 'clouds');
        this.scene.add.existing(this);
        this.scene = scene;
        //this.scene.physics.world.enable(this);
        
        this.setScale(0.5);
        this.setVisible(true);
    }
    movingClouds(){
        //this.body.worldBounce()
        this.setBlendMode('ADD');
        this.setGravity(100);
        this.body.allowGravity = false;
        //this.body.stop()

        this.setVelocity(this.getRandomBetween(20,30))
        this.body.setFriction(this.getRandomBetween(20,30))
    }
    getRandomBetween(min, max) { 
        return Math.random() * (20 - 30) + 30;
     } 
}

   //this.cloud.body.velocity.x += Math.random(30,20);
   this.cloud.body.velocity.x += this.cloud.getRandomBetween(20, 30);
   if (this.cloud.body.velocity.x >= 30){
       this.cloud.body.velocity.x -= this.cloud.getRandomBetween(20, 30);
       this.body.setAcceleration(20,30)
   }

   this.cloud.body.velocity.y += this.cloud.getRandomBetween(20, 30);
   if (this.cloud.body.velocity.y >= 30){
       this.cloud.body.velocity.y -= this.cloud.getRandomBetween(20, 30);
       this.body.setAcceleration(20,30)
   } 