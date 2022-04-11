import Phaser from 'phaser';
import Ball from '../game/Ball';

export default class Rat extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, scale = 0.5, movementType = "random", time = 20, distance = 20) {
        super(scene, x, y, 'rat-sprite', 0);
        this.scene.add.existing(this);
        this.scene = scene;
        this.scene.physics.world.enable(this);
        this.setScale(scale);
        this.setVisible(true);
        //this.setCollideWorldBounds(true);
        //this.body.setGravityY(300);
        //this.body.setImmovable(false);
        //this.body.setAllowGravity(true);
        
        this.movementType = movementType;
        this.time = time;
        this.distance = distance;
        this.speed = this.distance / this.time;

        this.countdown = 0;
        this.health = 2.5;
        this.exp=32.56;
        this.growlTimer_rat;
        this.deathTimer;
        this.scene.physics.add.overlap(this.scene.schimitar, this,function(){
            if(this.scene.schimitar.anims.isPlaying==true){
                this.health-=this.scene.schimitar.damage;
                this.scene.sound.play('rat-hurt');
            if (this.x < this.scene.player.x ){
                this.setPosition(this.x-150, this.y)
                this.dtext = this.scene.add.text(this.x,this.y,`${this.scene.schimitar.damage}`).setTint(0xfc4903);
                //this.scene.time.delayedCall(1200, () => {this.dtext.destroy();/*this.scene.player.exp+=this.exp*/})
                this.scene.time.addEvent({
                    delay: 1200,
                    callback: () => this.dtext.destroy(),
                    callbackScope: this.dtext,
                    loop: false
                  });
            } else{
                this.setPosition(this.x+150, this.y)
                this.dtext = this.scene.add.text(this.x,this.y,`${this.scene.schimitar.damage}`).setTint(0xfc4903);
                this.scene.time.addEvent({
                    delay: 1200,
                    callback: () => this.dtext.destroy(),
                    callbackScope: this.dtext,
                    loop: false
                  });
            }
            
            if(this.scene.schimitar.frame.name==1){this.y-=150};
};
        if(this.health <= 0){
        if(this.scene.ratFell==false){
            this.scene.ratDied=true;
            this.scene.player.exp += this.exp;  
        };
            this.scene.addCarrotAbove(this,0x25db53);
            this.destroy();  
        }

        },null,this)
        this.monster__ani_setup();
        this.monster_ambience();
        }
        monster_ambience(val){

        }
    
    monster_damage_text(){
        this.text = this.scene.add.text(500,500,`${this.exp}`);
        this.text.setTint('#fc4903');
    }
    monster__ani_setup(){
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('rat-sprite', {start: 2, end: 2 }),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('rat-sprite', {start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('rat-sprite', {start: 3, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
    }
            checkMonsterMovement() {
                let platforms = this.scene.platforms.getChildren()
                let bottomPlatform = platforms[0]
                platforms.map(platform=>{
                    if (platform.y < bottomPlatform.y) return false
                    bottomPlatform = platform
                    return bottomPlatform
                })
                if (this.y > bottomPlatform.y + 200)
                {
                    this.health=0;
                    this.exp=0;
                    this.scene.ratFell=true;
                }
            
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
          if(this.body){if(this.health>0&&this.body.velocity.x==0&&this.body.velocity.y==0){this.play('idle')}};
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