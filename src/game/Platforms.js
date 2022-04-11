import Phaser from 'phaser';
import map1 from '../leveldata/map1'
class Platforms extends Phaser.GameObjects.Container {
    constructor(scene, x, y, texture, id){
      super(scene, x, y, texture, id);
          this.platformPlacement = [];
          this.platformBody = scene.add.sprite(0, 0, 'platform', './assets/ground_sand_broken.png');
          this.platformWallBody = scene.add.sprite(0,0, 'platformWall', './assets/ground_sand_broken_wall.png');
          this.setSize(this.platformBody.width, this.platformBody.height);
          this.setSize(this.platformWallBody.width, this.platformWallBody.height); // DO THIS
          this.add(this.platformBody);
          this.add(this.platformWallBody);
    }
    findBottomMostPlatform()
    {
      const platforms = this.platformBody.getChildren()
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
  }
