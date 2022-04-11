import Phaser from 'phaser';

export default class Punch extends Phaser.Physics.Arcade.Sprite {
        constructor(scene, x, y){
    super(scene, x, y, 'player-punch-sprite', 0)
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
        attackleg: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
        attackfist: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F),
	}; 	

	this.damage = 0.5;
	
}
__punch_ani_setup(){
//------------------Schimitar animation--------------------------
this.anims.create({
    key: 'punch',
    frames: this.anims.generateFrameNumbers('player-punch-sprite', { start: 1, end: 0 }),
    frameRate: 10
});
	
}
control_handler(){
   
    if(Phaser.Input.Keyboard.JustDown(this.keys['attackfist']) && this.scene.player.canAttack==true){
    this.startTimer = this.scene.time.addEvent({
        delay: 100,
        repeat: 0,
        callback: function () 
            { 
                this.scene.player.canAttack=true;
                this.setFrame(1);
            },
            callbackScope:this,
        });
        this.anims.play('left-punch');
        this.scene.sound.play('sword-swosh');
        this.scene.player.canAttack=false;    
    }
    if(Phaser.Input.Keyboard.JustDown(this.keys['attackfist']) && this.scene.player.canAttack==true){
    this.startTimer = this.scene.time.addEvent({
        delay: 100,
        repeat: 0,
        callback: function () 
            { 
                this.scene.player.canAttack=true;
                this.setFrame(2);
            },
            callbackScope:this,
        });
        this.anims.play('right-punch');
        this.scene.sound.play('sword-swosh');
        this.scene.player.canAttack=false;    
    }
}
};