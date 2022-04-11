import Phaser from 'phaser';
export {Player as default}

class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'Texture', 'Frame'); // The frame is optional 
            this.scene.add.existing(this);
            this.player = this.scene.add.sprite(240,320,'player','../assets/characterSheet.png')
            this.keys = {
                jump: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
                jump2: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X),
                fire: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),
                left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
                right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
                down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
            };
    //---------------Player Animation------------------------------
    let config = {
        key: 'brickTile',
        frames: scene.anims.generateFrameNumbers('tiles', {
            start: 14,
            end: 14,
            first: 14
        })
    };
        scene.anims.create(config);   
        config = {
            key: 'left',
            frames: this.anims.generateFrameNumbers('player-sprites', {
                start: 1,
                end: 3
            }),
            frameRate: 10,
            repeat: -1
        };

        scene.anims.create(config);
        config = {
            key: 'turn',
            frames: [{
                key: 'player',
                frame: 0
            }],
            frameRate: 20
        });

        scene.anims.create(config);
        config = {
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', {
                start: 4,
                end: 6
            }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'clingleft',
            frames: [{
                key: 'player',
                frame: 10
            }],
            frameRate: 20
        });
        scene.anims.create({
            key: 'clingright',
            frames: [{
                key: 'player',
                frame: 11
            }],
            frameRate: 20
        });
        scene.anims.create({
            key: 'turn',
            frames: [{
                key: 'player',
                frame: 0
            }],
            frameRate: 20
        });
    }  
  }
  