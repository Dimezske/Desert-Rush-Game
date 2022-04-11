// with this title screen i want to load a menu so the user can click and adjust setting  and game saves etc
import Screen from '../index'
class TitleScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'TitleScene'
        });
    }

    preload() {
        //this.load.spritesheet('player-sprites', '../assets/characterSheet.png');
        this.scene.stop('BootScene');
        //this.scene.add('Game');
    }
    create() {
        const background = this.add.image(1450/2, 775/2, 'background');
		background.setScale(Math.max(1450 / background.width, 775 / background.height))
        .setScrollFactor(1, 0);
        var rect = this.add.rectangle(650, 380, 350, 550, 0x999999);
        rect.setStrokeStyle(4, 0xc6e2ff);

        let clickCount = 0;
        this.clickCountText = this.add.text(100, 200, '');

        this.clickButton = this.add.text(600, 180, 'Play!', { fill: '#0f0' })
        .setInteractive()
        .on('pointerover', () => this.enterButtonHoverState() )
        .on('pointerout', () => this.enterButtonRestState() )
        .on('pointerdown', () => this.enterButtonActiveState() )
        .on('pointerup', () => {
            //this.scene.start('TitleScene');
            this.scene.start('GameScene');
            this.updateClickCountText(++clickCount);
            this.enterButtonHoverState();
        });
        this.updateClickCountText(clickCount);
    }
    update(time, delta) {
       
    }

    updateClickCountText(clickCount) {
        //this.clickCountText.setText(`Button has been clicked ${clickCount} times.`);
    }

    enterButtonHoverState() {
        this.clickButton.setStyle({ fill: '#ff0'});
    }

    enterButtonRestState() {
        this.clickButton.setStyle({ fill: '#0f0' });
    }

    enterButtonActiveState() {
        this.clickButton.setStyle({ fill: '#0ff' });
    }
}

export default TitleScene;

