import Phaser from '../lib/phaser.js'

export default class Gem extends Phaser.Physics.Arcade.Sprite
{
	/**
	 * @param {Phaser.Scene} scene 
	 * @param {number} x 
	 * @param {number} y 
	 * @param {string} texture 
	 */
	constructor(scene, x, y, texture = 'gem')
	{
		super(scene, x, y, texture)

		this.setScale(1)
	}
	addGemAbove(sprite)
	{
		const y = sprite.y - sprite.displayHeight
		const gem = this.gems.get(sprite.x, y, 'gem')

		gem.setActive(true)
		gem.setVisible(true)

		this.add.existing(gem)
		gem.body.setSize(gem.width, gem.height)

		Phaser.Math.Between(gem.setVelocityX(20), gem.setVelocityX(-20))
		this.physics.world.enable(gem)

		return gem
	}
	handleCollectGem(player, gem)
	{
		this.gems.killAndHide(gem)

		this.physics.world.disableBody(gem.body)

		this.gemsCollected++
		this.sound.play('powerup')

		this.gemsCollectedText.text = `Gems: ${this.gemsCollected}`
	}
}
