import Phaser from "phaser";
import Bullet from "../bullet";

export default class P90 extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "p90-sprite", 0);
    this.scene.add.existing(this);
    this.scene = scene;
    this.scene.physics.world.enable(this);
    //this.setScale(scale);
    this.setVisible(true);
    this.body.setCollideWorldBounds(false);
    // if you dont want the horizontal / vertikal platforms to collide with the world bounds
    this.body.setImmovable(true);
    this.body.setAllowGravity(false);
    this.countdown = 0;
    this.depth = 1.3;
    this.clip = 30;
    this.keys = {
      shoot: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
      reload: this.scene.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.R
      ),
      switch: this.scene.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.Q
      ),
    };
    this.bullets = [];
    this.gunisequipped = true;
    this.damage = 0.5;
    this.muzzlebox = this.scene.add.rectangle(this.x, this.y, 30, 10);
    this.scene.physics.add.existing(this.muzzlebox);
    this.muzzlebox.body.allowGravity = false;
    this.muzzlebox.setPosition(this.x, this.y);
    this.muzzlebox.body.setEnable(false);
    this.bullet = this.scene.add.rectangle(
      this.muzzlebox.x,
      this.muzzlebox.y,
      30,
      10
    );
    /*if(this.gunisequipped){ 
            if(bullet) {
                bullet.fire(x, y);
            }  
        }*/
  }

  __shoot_ani_setup() {
    //------------------Schimitar animation--------------------------
    this.anims.create({
      key: "fire",
      frames: this.anims.generateFrameNumbers("p90-sprite", {
        start: 1,
        end: 0,
      }),
      frameRate: 10,
    });
  }
  control_handler() {
    if (this.cursors.left.isDown) {
      this.flipX = false;
    }
    if (this.cursors.right.isDown) {
      this.flipX = true;
    }
    if (
      this.scene.input.activePointer.isDown &&
      this.scene.player.canAttack == true &&
      ((this.scene.input.activePointer.worldX > this.scene.player.x &&
        this.scene.player.flipX == true) ||
        (this.scene.input.activePointer.worldX < this.scene.player.x &&
          this.scene.player.flipX == false))
    ) {
      this.startTimer = this.scene.time.addEvent({
        delay: 65,
        repeat: 0,
        callback: function () {
          this.scene.player.canAttack = true;
          this.setFrame(0);
          this.muzzlebox.body.setEnable(false);
          this.muzzlebox.setVisible(false);
        },
        callbackScope: this,
      });
      if (this.clip >= 1) {
        //this.anims.play('fire');
        this.scene.sound.play("p90-shoot");
        this.muzzlebox.body.setEnable(true);
        this.muzzlebox.setPosition(this.x + 30, this.y);
        if (this.flipX == false) {
          this.muzzlebox.setPosition(this.x - 30, this.y);
        }
        //this.anims.play('punch');
        //this.scene.sound.play('sword-swosh');
        //this.shootBullet(this.muzzlebox.x, this.muzzlebox.y);
        this.scene.player.canAttack = false;
        this.clip--;
        this.fire();
      } else {
        //TODO reload
      }
    }
    if (Phaser.Input.Keyboard.JustDown(this.keys["reload"])) {
      this.scene.player.canAttack = false;
      this.reloadTimer = this.scene.time.addEvent({
        delay: 2000,
        repeat: 0,
        callback: function () {
          this.scene.player.canAttack = true;
          this.clip = 30;
        },
        callbackScope: this,
      });
    }
    this.bullets.forEach((bullet) => bullet.update());
    //see bullet.fire for explanation
    let angle = Phaser.Math.Angle.Between(
      this.x,
      this.y,
      this.scene.input.activePointer.worldX,
      this.scene.input.activePointer.worldY
    );
    if (this.scene.player.flipX == true) {
      this.flipX = true;
    }
    if (this.flipX == false) {
      angle = Phaser.Math.Angle.CounterClockwise(angle);
      angle *= -1;
    }
    let angleConversion = Phaser.Math.RadToDeg(angle);
    this.angle = angleConversion;
    if (this.flipX == false) {
      this.angle += 90;
    }

    if (this.angle < -90) {
      this.angle = -90;
    } else if (this.angle > 90) {
      this.angle = 90;
    }
  }

  fire() {
    //grab first unused bullet

    let bullet = this.scene.bullets.getFirstDead(false);
    if (bullet.active == false) {
      bullet.setPosition(this.muzzlebox.x, this.muzzlebox.y);
      bullet.setActive(true);
      bullet.fire();
    }
  }
}
