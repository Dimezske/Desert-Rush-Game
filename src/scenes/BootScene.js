import groundSandBrokenImg from '../assets/ground_sand_broken.png';
import backgroundImg from '../assets/desert-background.png';
import logoImg from '../assets/logo.png';
import characterSheet from '../assets/characterSheet.png'
import makeAnimations from '../helpers/animations';
class BootScene extends Phaser.Scene {
    constructor(test) { // should this be scene?
        super({
            key: 'BootScene'
        });
    }
    preload() {
        this.load.image('background', backgroundImg);
        this.load.image('logo', logoImg);
        this.load.image('platform', groundSandBrokenImg)
        //this.scene.add('Game');   * getting problem with this
        
        const progress = this.add.graphics();
        
        // Register a load progress event to show a load bar
        this.load.on('progress', (value) => {
            progress.clear();
            progress.fillStyle(0x424983, 1);
            progress.fillRect(0, this.sys.game.config.height / 2, this.sys.game.config.width * value, 60);
            console.log(parseInt(progress * 100) + '%');
        });

        // Register a load complete event to launch the title screen when all files are loaded
        this.load.on('complete', (key,type,data) => {
            // prepare all animations, defined in a separate file
            makeAnimations(this);
            console.log(key);
            //progress.destroy();
            const background = this.add.image(1450/2, 775/2, 'background');
            background.setScale(Math.max(1450 / background.width, 775 / background.height))
            .setScrollFactor(1, 0);
            const logo = this.add.image(650, 150, 'logo');
            this.tweens.add({
                targets: logo,
                y: 600,
                duration: 2000,
                ease: "Power2",
                yoyo: true,
                loop: -1
            });
            //this.progressComplete = this.add.text(100, 200, '');
            this.progressComplete = this.add.text(500, 180, 'Loading complete press `ENTER!`', { fill: '#0f0' })
        });
        //this.load.spritesheet('player', '../assets/characterSheet.png', {
        //    frameWidth: 60,
        //    frameHeight: 80
        //});
     }
     create(){
        
     }
     update(time,delta) {
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
            if(menubuttons['exitbutton'].isDown)	{	
                console.log('exit button!')	
            }
     }
 }
 export default BootScene;	