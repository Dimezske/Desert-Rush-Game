import Phaser from 'phaser';

export default class PlatformWallings extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y,key, scale) {
        super(scene, x, y, 'ground-walling', 0);
            this.scene.add.existing(this);
            this.scene = scene;
            this.scene.physics.world.enable(this);
            this.setScale(scale);
            this.setCollideWorldBounds(true);
            this.setVisible(true);
            this.body.setImmovable(true);
            this.body.setAllowGravity(false);
    }
    checkCloudMovement() {
        if (this.countdown <= 0) {
            this.setPlatformMovement();
        } else {
            this.countdown--;
        }
    }
    setPlatformMovement(){
        const leftRight = (Math.random() <= 0.5) ? 1 : -1;
        const upDown = (Math.random() <= 0.5) ? 1 : -1;
        this.body.setVelocityX(100 * randomLeftRight);
        //this.body.setVelocityY(100 * randomUpDown);
    }
    findBottomMostPlatform()
    {
      this.platformBody.getChildren()
      let bottomPlatform = platforms[0]
  
      for (let i = 1; i < platforms.length; ++i)
      {
        //const platform = platforms[i]
  
        // discard any platforms that are above current
        if (platform.y < bottomPlatform.y)
        {
          continue
        }
  
        bottomPlatform = platformBody
      }
  
      return bottomPlatform 
    }
    /*
    const bottomPlatform = this.findBottomMostPlatform()
		if (this.player.y > bottomPlatform.y + 200)
		{
			this.scene.start('game-over')
			this.sound.play('dead')
		}*/
}