import Phaser from 'phaser';
import logoImg from './assets/logo.png';
import backgroundImg from './assets/desert-background1.png';
import groundSandBrokenImg from 'assets/ground_sand_broken.png';
import playerImg from 'assets/character-1.png';

import jumpAudio from 'assets/sfx/jump.wav';
import powerupAudio from 'assets/sfx/powerup.wav';
import deadAudio from 'assets/sfx/playerdied.mp3';
import clingAudio from 'assets/sfx/cling.wav';

import Player from '../game/Player'
export default class Game extends Phaser.Scene
{
	constructor(test) {
        super({
            key: 'GameScene'
        });
    }
    init()
	{
		
	}
	preload()
	{
        this.load.image('background', backgroundImg);
		this.load.image('platform', groundSandBrokenImg)
		this.load.image('player', playerImg);
        this.load.audio('jump', jumpAudio);
		this.load.audio('powerup', powerupAudio);
		this.load.audio('dead', deadAudio);
		this.load.audio('cling', clingAudio);

    }
    create()
    {
        const background = this.add.image(240, 320, 'background');
			.setScrollFactor(1, 0)
            this.platforms = this.physics.add.staticGroup()
            // then create 5 platforms from the group
            for (let i = 0; i < 5; ++i) {
                const x = Phaser.Math.Between(80, 300)
                const y = 100 * i
                const platform = this.platforms.create(x, y, 'platform')
                platform.scale = 0.5
                const body = platform.body
                body.updateFromGameObject()
            }            
        	this.cursors = this.input.keyboard.createCursorKeys()
        	this.player = this.physics.add.existing(new Player(this, 100, 100));
			this.player.setScale(0.7)

           		this.physics.add.collider(this.platforms, this.player)
            	this.player.body.setBounce(0.2);
		    	this.player.body.setCollideWorldBounds(false);
        
            	this.cameras.main.startFollow(this.player)
            	this.cameras.main.setDeadzone(this.scale.width * 1.5)
    }
    update(time, delta) {
		if (!this.player) {
			return
		}
		this.platforms.children.iterate(child => {
			const platform = child
			const scrollY = this.cameras.main.scrollY
			if (platform.y >= scrollY + 700) {
				platform.y = scrollY - Phaser.Math.Between(50, 90)
				platform.body.updateFromGameObject()
				this.addBallAbove(platform),
				this.addGemAbove(platform).setScale(0.7)
			}
		})
		//--------------------Movement-------------------------
		if (this.cursors.left.isDown) {
    		this.player.body.setVelocityX(-160);
    		//this.player.anims.play('left', true);
			//this.schimitar.anims.play('left');
		}
		else if (this.cursors.right.isDown) {
    		this.player.body.setVelocityX(160);
			//this.player.anims.play('right', true);
			//this.schimitar.anims.play('right');
		}
		else {
    		this.player.body.setVelocityX(0);
    		//this.player.enable.anims.play('turn');
		}

		if (this.cursors.up.isDown && this.player.body.touching.down) {
			this.sound.play('jump')
   		 	this.player.body.setVelocityY(-330);
		} 
	    const clingKeys = this.input.keyboard.addKeys({
		'clingOn': Phaser.Input.Keyboard.KeyCodes.W,
		'clingOff': Phaser.Input.Keyboard.KeyCodes.S
	   });
	   //------------cliffhanging------------------------
	 	
		
	   	if(clingKeys['clingOn'].isDown ) {
			console.log('is clinging')
			this.player.setAcceleration(0,0)	
	    }
	    if(clingKeys['clingOff'].isDown)	{	
			console.log('is not clinging')
			this.player.setAcceleration(0,0)	
	    }
		if(clingKeys['clingOn'].isDown && this.player.body.touching.left) {
				this.isClinging = true
				this.player.setVelocityY(0,0),
				this.player.setVelocityX(0,0),
				this.player.anims.play('clingleft');
				if (this.isClinging) {
					this.player.anims.play('left',false);
				}
			}
			if(clingKeys['clingOn'].isDown && this.player.body.touching.right) {
				this.isClinging = true
				this.player.setVelocityY(0,0),
				this.player.setVelocityX(0,0),
				this.player.anims.play('clingright');
				if (this.isClinging){
					this.player.anims.play('right',false);
				}
			}
		if(clingKeys['clingOn'].isDown && this.physics.add.overlap(this.player, this.platforms)) {
			this.player.setAcceleration(0,0)
		}
		function cliffHang() {
			if (clingKeys['clingOn'].isDown && this.player.body.touching.left && this.cursors.up.isDown) {
				this.sound.play('cling')
   		 			if(this.cursors.up.isDown) {
						climbUp();
					}
			}
			else if (clingKeys['clingOn'].isDown && this.player.body.touching.right && this.cursors.up.isDown) {
				this.sound.play('cling')
   		 		this.player.setVelocityY(-50)
					if(this.cursors.up.isDown) {
						climbUp();
					}
			}
			else if (clingKeys['clingOff'].isDown) {
				this.player.setAcceleration(0,50)
				this.player.setVelocityY(50)
			}
		}
		function climbUp() {
			this.player.setAcceleration(0,-50)
			this.player.setVelocityY(-50)
		}
		this.horizontalWrap(this.player)

		const bottomPlatform = this.findBottomMostPlatform()
		if (this.player.y > bottomPlatform.y + 200)
		{
			this.scene.start('game-over')
			this.sound.play('dead')
		}
	}
}