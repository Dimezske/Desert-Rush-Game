import Phaser from 'phaser';
import ground_sand from './assets/ground_sand_broken_wall.png';
import platform_sand from './assets/ground_sand_broken.png';


/*class Platforms extends Phaser.GameObjects.Sprite{
    constructor(scene,id, name, x, y, texture ){
        this.scene = scene;
        this.id = id;
        this.name = name;
        this.x = x;
        this.y = y;
        this.texture = texture;
        
        this.platform = {
            scene: GameScene,
            id: mapData[platforms[id]],
            name: mapData[platforms[name]],
            x: mapData[platforms[postion[xMin,XMax]]],
            y: mapData[platforms[postion[xMin,XMax]]],
            texture: this.scene.add.sprite(0, 0, 'platform', './assets/ground_sand_broken.png')
        },
            this.setSize(this.platform.width, this.platform.height),
            this.scene.add(this.platform)
    }
}

let platforms = {
        
}
*/
class GameScene extends Phaser.Scene
{
    constructor(scene) {
        super({
            key: 'GameScene'
        });
    } 
	init() {

	}
    preload() {
        this.load.image('ground', ground_sand)
        this.load.image('platform', platform_sand);

        this.load.json('version', '/src/leveldata/version.json');
        this.load.json('level', 'src/leveldata/level.json');
  
    }

    create (data) {
        
        this.ground_sand = this.add.sprite(0,400, 'ground');
        this.physics.add.staticGroup(this.ground_sand);
        this.ground_sand.body.allowGravity = false;
        this.ground_sand.body.immovable = true;

        this.levelData = this.cache.json.get('level');
        console.log(this.levelData);
        
        this.platforms = this.physics.add.staticGroup()
        this.platforms.enableBody = true;

        this.levelData.platformData.forEach(function(element){
            this.platforms.create(element.x, element.y, 'platform');
        }, this)
    }
	update(time, delta) {
     
	}
	render() {

	}
}
const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1450,
	height: 775,
    scene: [
        GameScene, 
    ],
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {
				y: 200
			},
			debug: true
		}
	}
};

const game = new Phaser.Game(config);