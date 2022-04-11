import Phaser from "../lib/phaser.js";

export default class Bullet extends Phaser.Physics.Arcade.Sprite {
  /**
   * @param {Phaser.Scene} scene
   * @param {number} x
   * @param {number} y
   * @param {string} texture
   */
  constructor(scene, x, y, texture = "p90-bullet-sprite") {
    super(scene, x, y, texture);

    this.setScale(1);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.allowGravity = false;
    this.start;
    this.damage = 1.5;
    /*
    this.scene.physics.add.collider(this, this.scene.monsters, function(bullet, monsters){ 
      this.scene.monsters.health -= this.damage;
      this.scene.sound.play('plunger-hurt');
      this.active=false;
      },null,this);*/
      this.scene.physics.add.collider(this, this.scene.monsters, function(bullet, monsters) {
          this.scene.monsters.health -= this.damage;
            this.scene.sound.play('plunger-hurt');
            if (this.x < this.scene.player.x ){
                this.setPosition(this.x-15, this.y)
                
                this.dtext = this.scene.add.text(this.x,this.y,`${this.damage}`).setTint(0xfc4903);
                //this.scene.time.delayedCall(1200, () => {this.dtext.destroy();/*this.scene.player.exp+=this.exp*/})
                this.scene.time.addEvent({
                    delay: 1200,
                    callback: () => this.dtext.destroy(),
                    callbackScope: this.dtext,
                    loop: false
                  });
            } else{
                this.setPosition(this.x+15, this.y)
                this.dtext = this.scene.add.text(this.x,this.y,`${this.damage}`).setTint(0xfc4903);
                this.scene.time.addEvent({
                    delay: 1200,
                    callback: () => this.dtext.destroy(),
                    callbackScope: this.dtext,
                    loop: false
                  });
            }
        if(this.health <= 0){
            if(this.scene.plungerFell==false){
                this.scene.plungerDied=true;
                this.scene.player.exp += this.exp;  
            };
                this.scene.addCarrotAbove(this,0xfc8c03);
                this.destroy();  
        }
          bullet.active = false;
        }, null,this);
      this.scene.physics.add.collider(this,this.scene.ground_sand, function(bullet, ground_sand){ 
        this.active=false;
      },null,this);
      this.scene.physics.add.collider(this,this.scene.platform, function(bullet, platform){ 
        this.active=false;
      },null,this);
      this.scene.physics.add.collider(this,this.scene.mPlatform, function(bullet, mPlatform){ 
        this.active=false;
      },null,this);
      
      this.scene.physics.add.collider(this,this.scene.crate, function(bullet, crate){ 
        this.bullet = null;
        this.scene.crate.health -= this.damage;
        this.scene.sound.play('crate_hit');
        if(this.scene.crate.health <= 75.0){
          this.scene.crate.setFrame(0)
      };
      if(this.scene.crate.health < 70.0){
          this.scene.crate.setFrame(1)
      };
      if(this.scene.crate.health < 65.0){
          this.scene.crate.setFrame(2)
      };
      if(this.scene.crate.health == 50.0){
          //this.scene.addCarrotAbove(this,0xfc8c03);
          this.scene.dropSchimitar(this)
          this.scene.crate.setTexture('crate-open'); 
          
          this.x+=40;
          this.y-=55;
      }
      if(this.scene.crate.health < 35.0){
          this.scene.crate.setTexture('crate-explode');
          this.scene.crate.setFrame(0)
      };
      if(this.scene.crate.health < 30.0){
          this.scene.crate.setTexture('crate-explode');
          this.scene.crate.setFrame(1)
      };
      if(this.scene.crate.health < 25.0){
          this.scene.crate.setTexture('crate-explode');
          this.scene.crate.setFrame(2)
      };
      if(this.scene.crate.health < 16.0){
          this.scene.crate.setTexture('crate-explode');
          this.scene.crate.setFrame(3)
      };
      if(this.scene.crate.health < 10.0){
          this.scene.crate.setTexture('crate-explode');
          this.scene.crate.setFrame(4)
      };
      if(this.scene.crate.health <= 0){
          this.scene.crate.setVisible(false);
          this.scene.crate.body.setEnable(false);
          this.scene.crate.destroy();
      }
        this.active=false;
      },null,this);
  }

  fire() {
    //create starting point for use in killing bullet
    this.start = { x: this.x, y: this.y };
    //access pointer
    let pointer = this.scene.input.activePointer;
    //get angle between bullet and pointer
    let angle = Phaser.Math.Angle.Between(
      this.x,
      this.y,
      pointer.worldX,
      pointer.worldY
    );
    //set angle of bullet and create trajectory, second
    //parameter is the speed of the bullet
    this.rotation = angle;
    this.scene.physics.velocityFromRotation(angle, 600, this.body.velocity);
  }

  update() {
    if (this.active == true) {
      if (Phaser.Math.Distance.BetweenPoints(this.start, this) > 2000) {
        this.active = false;
      }
    }
  }
}
