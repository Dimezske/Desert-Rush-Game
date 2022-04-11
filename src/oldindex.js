import Phaser from 'phaser';
import logoImg from './assets/logo.png';
import backgroundImg from './assets/desert-background.png';
import ground_sand from './assets/ground_sand_broken_wall.png';
import platform_sand from './assets/ground_sand_broken.png';
import playerSpriteSheet from './assets/characterSheet.png';
import Player from './game/Player';
import Animations from './helpers/animations';

import GameOver from './scenes/GameOver'
import BootScene from './scenes/BootScene';
import TitleScene from './scenes/TitleScene';
import ParallaxScene from './helpers/paralaxscene.js';

import jumpAudio from './assets/sfx/jump.wav';
import powerupAudio from './assets/sfx/powerup.wav';
import deadAudio from './assets/sfx/playerdied.mp3';
import clingAudio from './assets/sfx/cling.wav';

import parasky from './assets/sky.png'
import paramountains from './assets/mountains.png'
import paraplateau from './assets/plateau.png'
import Fonts from './assets/knighthawks-font.png';

///import paragrounds from './assets/gro.png'
import palmTree from './assets/Palmtree.png';
import sClouds from './assets/clouds.png'
import sClouds2 from './assets/clouds2.png'
import Rain from './assets/rain.png'
import Rain2 from './assets/rain2.png'
import Rain3 from './assets/rain3.png'

/**
 * @param {Phaser.Scene} scene
 * @param {number} totalWidth
 * @param {string} texture
 * @param {number} scrollFactor
 */
 const createAligned = (scene, totalWidth, texture, scrollFactor, scale = 0) => {
    const w = scene.textures.get(texture).getSourceImage().width
    //const totalWidth = scene.scale.width * 10

    const count = Math.ceil(totalWidth / w) * scrollFactor

    let x = 0
    for(let i = 0; i < count; ++i)
    {
        const m = scene.add.image(x, scene.scale.height, texture)
            .setOrigin(0,1)
            .setScrollFactor(scrollFactor)

            if (scale > 0)
               m.setScale(scale);

            x += m.width
    }
    
}

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
        this.load.image('background', backgroundImg);
        this.load.image('logo', logoImg);

        this.load.image('sky', parasky)
        this.load.image('mountains', paramountains)
        this.load.image('plateau2', paraplateau)
        this.load.image('plateau', paraplateau)
        this.load.spritesheet('font', Fonts, { frameWidth: 32, frameHeight: 25 });
        this.cursors = this.input.keyboard.createCursorKeys()

        this.load.audio('jump', jumpAudio);
        
        this.load.image('ground', ground_sand)
        this.load.image('platform', platform_sand);

        this.load.json('version', '/src/leveldata/version.json');
        this.load.json('level', 'src/leveldata/level.json');
        this.load.json('level_ground', 'src/leveldata/level_ground.json');

        this.load.spritesheet('player-sprite', playerSpriteSheet, {
            frameWidth: 60,
            frameHeight: 80
        });
        this.load.image('clouds', sClouds);
        this.load.image('clouds2', sClouds2);
        this.load.spritesheet('font', Fonts,  { frameWidth: 32, frameHeight: 25 });
        this.load.spritesheet('rain',  Rain,  {frameWidth: 17, frameHeight: 17});
        this.load.spritesheet('rain2', Rain2, {frameWidth: 17, frameHeight: 25});
        this.load.spritesheet('rain3', Rain3, {frameWidth: 17, frameHeight: 25});
    }

    create (data) {
        const background = this.add.image(1450/2, 775/2, 'background');
		background.setScale(Math.max(1450 / background.width, 775 / background.height))
        .setScrollFactor(0);
        // --------------- parallax----------------------------------
        const width = this.scale.width
        const height = this.scale.height
        const totalWidth = width * 10
        this.add.image(width * 0.5, height * 0.5, 'sky')
        .setScrollFactor(0)

        createAligned(this, totalWidth, 'mountains', 0.25)
        createAligned(this, totalWidth, 'plateau2', 0.35)
        createAligned(this, totalWidth, 'plateau', 0.5)

        this.cameras.main.setBounds(0,this.player, width * 10, height)
        //--------------Platform data---------------------------------
        this.ground_sand = this.add.sprite(100,400, 'ground');
        this.physics.add.staticGroup(this.ground_sand);
        this.ground_sand.body.allowGravity = false;
        this.ground_sand.body.immovable = true;

        this.levelData_Ground = this.cache.json.get('level_ground');
        console.log(this.levelData_Ground);
        this.levelData_Platforms = this.cache.json.get('level');
        console.log(this.levelData_Platforms);

        this.platforms = this.physics.add.staticGroup()
        this.platforms.enableBody = true;
        
        this.levelData_Ground.platformData.forEach(function(element){
            this.platforms.create(element.x, element.y, 'ground');
        }, this)
        this.levelData_Platforms.platformData.forEach(function(element){
            this.platforms.create(element.x, element.y, 'platform');
        }, this)
    
        //-------------collisions-------------------------------------------

        //
        this.player = this.physics.add.existing(new Player(this, this.levelData_Platforms.playerStart.x, this.levelData_Platforms.playerStart.y, 'player-sprite', 0));
        this.player.cursors = this.input.keyboard.createCursorKeys()
        
		this.player.body.checkCollision.up = true
		this.player.body.checkCollision.left = true
	    this.player.body.checkCollision.right = true
		this.player.body.checkCollision.down = true
        this.player.body.setBounce(0.2);
        this.player.setScale(0.7)
        this.physics.add.collider(this.platforms, this.player)
        this.physics.add.collider(this.ground_sand, this.player)
        
        this.player.body.setCollideWorldBounds(false);

        this.cameras.main.startFollow(this.player,false,0.8,0.5,0,5);
        //this.cameras.main.setDeadzone(this.scale.width * 1.5)
        //----------------------------MIST------------------------------------
        var particles = this.add.particles('clouds');

        var emitter = particles.createEmitter({
            frame: [ 'red', 'blue', 'green', 'yellow' ],
            x: 400,
            y: 300,
            speed: 200,
            lifespan: 3000,
            blendMode: 'ADD'
        });
        
        /*
            let LIFECYCLE = 200;
            var particles = this.add.particles('clouds2');
            var emitter = particles.createEmitter({
                x: 100,
                y: 100,
                gravityX: - 10,
                gravityY: - 10,
                accelerationX: 10,
                accelerationY: 10,
                maxVelocityX: 100,
                maxVelocityY: 100,
                on: true,
                speed: 10,
                bounce: 3,
                */
            //}).setBlendMode(Phaser.BlendModes.ADD).setSpeed(10).start(false, LIFECYCLE, 1, 1);

            /*
            let LIFECYCLE = 200;
            var particles = this.add.particles('clouds2');
            var emitter = particles.createEmitter({
                x: 100,
                y: 100,
                gravityX: - 10,
                gravityY: - 10,
                accelerationX: 10,
                accelerationY: 10,
                maxVelocityX: 100,
                maxVelocityY: 100,
                on: true,
                speed: 10,
                bounce: 3,
                
            }).setBlendMode(Phaser.BlendModes.ADD).setSpeed(10).start(false, LIFECYCLE, 1, 1);
            */
            /*var codeRain = {
                width: 50,
                height: 40,
                cellWidth: 16,
                cellHeight: 16,
                getPoints: function (quantity)
                {
                    var cols = (new Array(codeRain.width)).fill(0);
                    var lastCol = cols.length - 1;
                    var Between = Phaser.Math.Between;
                    var RND = Phaser.Math.RND;
                    var points = [];
        
                    for (var i = 0; i < quantity; i++)
                    {
                        var col = Between(0, lastCol);
                        var row = (cols[col] += 1);
        
                        if (RND.frac() < 0.01)
                        {
                            row *= RND.frac();
                        }
        
                        row %= codeRain.height;
                        row |= 0;
        
                        points[i] = new Phaser.Math.Vector2(16 * col, 16 * row);
                    }
        
                    return points;
                }
            };
            var emit = this.add.particles('font').createEmitter({
                alpha: { start: 1, end: 0.25, ease: 'Expo.easeOut' },
                angle: 0,
                blendMode: 'ADD',
                emitZone: { source: codeRain, type: 'edge', quantity: 2000 },
                frame: Phaser.Utils.Array.NumberArray(8, 58),
                frequency: 100,
                lifespan: 6000,
                quantity: 25,
                scale: -0.5,
                tint: 0x0066ff00
            });*/
            var particless = this.add.particles('rain2') 
            var emitters = particless.createEmitter({
                this: GameScene,
                texture:'rain2',
                
            });
            //var particles_rain = this.add.particles('rain3');
            //var emitter_rain= particles_rain.createEmitter({
                //frame: 'blue',
                //x: {min: 0, max: 800},
                //y: 0 ,
                //lifespan: {min: 100, max: 400},
                //speedY: 1500,
                //scaleY: {min: 1, max:4},
                //scaleX: .01,
               // quantity: {min: 5, max: 15},
               // blendMode: 'LIGHTEN',
            //});
            
            /*
            this.add.particles('rain').createEmitter({
                angle: 30, // uncomment to set an angle for the rain.
                minParticleScale: 0.1,
                maxParticleScale: 0.5,
                minRotation: 0,
                maxRotation: 0,
                frame: 'blue',
                y: 0,
                x: { min: 0, max: 800 },
                lifespan: 2000,
                speedY: { min: 200, max: 400 },
                scale: { start: 0.2, end: 0 },
                quantity: 3,
                blendMode: 'ADD'
                
            }).setSpeed(10).start(false, 1600, 5, 0);

            */
        //-------------------------------------------------------------------
    }
	update(time, delta) {
        this.player.body.setVelocityX(0)
        this.player.__ani_setup()
        this.player.control_handler()
        const menubuttons = this.input.keyboard.addKeys({
            'startbutton': Phaser.Input.Keyboard.KeyCodes.ENTER,
            'exitbutton': Phaser.Input.Keyboard.KeyCodes.ESC
           });
           //------------cliffhanging------------------------

            if(menubuttons['startbutton'].isDown ) {
                console.log('start button!')
                //this.scene.stop('BootScene');
                this.scene.start('TitleScene');
            }
            else if(menubuttons['exitbutton'].isDown)	{	
                console.log('exit button!')	
            }
	}
	
}
const config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    width: 1450,
	height: 775,
    scene: [
       // BootScene,
        //TitleScene,
        GameScene,
       // GameOver,
        ParallaxScene
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