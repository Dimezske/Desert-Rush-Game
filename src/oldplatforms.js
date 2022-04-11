/*  
class PlatformWalls extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, platformWallId){
      super(scene, x, y);

      this.platformWallBody = scene.add.sprite(0,0, 'platformWall', './assets/ground_sand_broken_wall.png')
       
      this.setSize(this.platformWallBody.width, this.platformWallBody.height); // DO THIS
      this.add(this.platformWallBody);
  }
}*/
    /*
    this.platforms = this.physics.add.staticGroup()

    // then create 5 platforms from the group
    for (let i = 0; i < 5; ++i)
    {
        const x = Phaser.Math.Between(80, 300)
        const y = 100 * i
        const platform = this.platforms.create(x, y, 'platform')
        platform.scale = 0.5
        const body = platform.body
        body.updateFromGameObject()
    } 
    //this.horizontalWrap(this.player)

		const bottomPlatform = this.findBottomMostPlatform()
		if (this.player.y > bottomPlatform.y + 200)
		{
			this.scene.start('game-over')
			this.sound.play('dead')
		}

    findBottomMostPlatform()
	{
		const platforms = this.platforms.getChildren()
		let bottomPlatform = platforms[0]

		for (let i = 1; i < platforms.length; ++i)
		{
			const platform = platforms[i]

			// discard any platforms that are above current
			if (platform.y < bottomPlatform.y)
			{
				continue
			}

			bottomPlatform = platform
		}

		return bottomPlatform
	}
    */           
