import Phaser from '../lib/phaser.js'

export default class Sword extends Phaser.Physics.Arcade.Sprite
{
	/**
	 * @param {Phaser.Scene} scene 
	 * @param {number} x 
	 * @param {number} y 
	 * @param {string} texture 
	 */
	constructor(scene, x, y, texture = 'schimitar-sprite')
	{
		super(scene, x, y, texture)

		this.setScale(1)
		
	}
	
	handleCollectSword(player, sword)
	{
		this.swords.killAndHide(sword)
		this.physics.world.disableBody(sword.body)
		this.swordsCollected++
		this.swordsCollectedText.text = `Swords: ${this.swordsCollected}`
	}
}
