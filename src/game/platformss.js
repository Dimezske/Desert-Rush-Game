import Phaser from 'phaser';

class Platforms extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, id){
        super(scene, x, y, texture, id);
          this.platform = scene.add.sprite(0, 0, 'platform', './assets/ground_sand_broken.png');
          //this.platform2 = scene.add.sprite(0, 0, 'platform', './assets/ground_sand_broken2.png');  
          //this.platform3 = scene.add.sprite(0,0, 'platformWall', './assets/ground_sand_broken_wall.png');
          this.setSize(this.platform.width, this.platform.height);
          this.scene.add(this.platform);
    }
    createplatform(){
        this.platform = this.physics.add.staticGroup();
        make();  
    }
}