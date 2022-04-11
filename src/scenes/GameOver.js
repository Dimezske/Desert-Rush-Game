import Phaser from 'phaser';

export default class GameOver extends Phaser.Scene
{
	constructor()
	{
		super('game-over')
	}

	create()
	{
		const width = this.scale.width
		const height = this.scale.height

		const gameover = this.add.text(width * 0.5, height * 0.5, 'Game Over', {
			fontSize: 48
		})
		.setOrigin(0.5)
		.setScrollFactor(0)
		
		this.input.keyboard.once('keydown-SPACE', () => {
				this.scene.resume('GameScene')
				
			});
	}
}
