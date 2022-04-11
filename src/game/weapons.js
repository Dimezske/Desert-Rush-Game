import Phaser from 'phaser';

export default class Schimitar extends Phaser.Physics.Arcade.Sprite {
        constructor(scene, x, y){
    super(scene, x, y, 'schimitar-sprite', 0)
    this.scene.add.existing(this);
    this.scene = scene;
    this.scene.physics.world.enable(this);
    //this.setScale(scale);
    this.setVisible(true);
    this.body.setCollideWorldBounds(false);
    // if you dont want the horizontal / vertikal platforms to collide with the world bounds
    this.body.setImmovable(true);
    this.body.setAllowGravity(false);
    this.countdown = 0;
    this.depth =1.3
	this.keys = {
		attack: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
	}; 	

	this.damage = 2.5;
    
	
}
__weapon_ani_setup(){
//------------------Schimitar animation--------------------------
	this.anims.create({
		key: 'attack',
		frames: this.anims.generateFrameNumbers('schimitar-sprite', {start: 1, end: 0 }),
		frameRate: 60
	});
	
}
control_handler(){
    
    if (this.cursors.left.isDown) {
        this.flipX=false;
    };
        if (this.cursors.right.isDown) {
            this.flipX=true;
        }
        if(Phaser.Input.Keyboard.JustDown(this.keys['attack']) && this.scene.player.canAttack==true){
        this.startTimer = this.scene.time.addEvent({
            delay: 400,
            repeat: 0,
            callback: function () 
                { 
                    this.scene.player.canAttack=true;
                    this.setFrame(2);
                },
                callbackScope:this,
            });
            this.anims.play('attack');
            this.scene.sound.play('sword-swosh');
            this.scene.player.canAttack=false;    
    }
}
};