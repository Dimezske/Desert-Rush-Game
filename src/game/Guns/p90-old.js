import Phaser from 'phaser';

export default class P90 extends Phaser.Physics.Arcade.Sprite {
        constructor(scene, x, y){
    super(scene, x, y, 'p90-sprite', 0)
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
        shoot: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
        reload: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R),
        switch: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q)
	};
    	
    this.gunisequipped = true;
	this.damage = 0.5;
	this.muzzlebox = this.scene.add.rectangle(this.x,this.y,30,10)
        this.scene.physics.add.existing(this.muzzlebox)
        this.muzzlebox.body.allowGravity=false;
        this.muzzlebox.setPosition(this.x,this.y)
        this.muzzlebox.body.setEnable(false)
        this.bullet = this.scene.add.rectangle(this.muzzlebox.x,this.muzzlebox.y,30,10)
        /*if(this.gunisequipped){ 
            if(bullet) {
                bullet.fire(x, y);
            }  
        }*/
          
        
}

__shoot_ani_setup(){
//------------------Schimitar animation--------------------------
this.anims.create({
    key: 'fire',
    frames: this.anims.generateFrameNumbers('p90-sprite', { start: 1, end: 0 }),
    frameRate: 10
});
	
}
control_handler(){
    if (this.cursors.left.isDown) {
        this.flipX=false;
    };
    if (this.cursors.right.isDown) {
        this.flipX=true;
    }
    if(Phaser.Input.Keyboard.JustDown(this.keys['shoot']) && this.scene.player.canAttack==true){
    this.startTimer = this.scene.time.addEvent({
        delay: 100,
        repeat: 0,
        callback: function () 
            { 
                this.scene.player.canAttack=true;
                this.setFrame(0);
                this.muzzlebox.body.setEnable(false)
                this.muzzlebox.setVisible(false);
            },
            callbackScope:this,
        });
        //this.anims.play('fire');
        this.scene.sound.play('p90-shoot');
        this.muzzlebox.body.setEnable(true)
        this.muzzlebox.setPosition(this.x +30,this.y)
        if(this.flipX==false){
            this.muzzlebox.setPosition(this.x -30,this.y)
        }
        //this.anims.play('punch');
        //this.scene.sound.play('sword-swosh');
        //this.shootBullet(this.muzzlebox.x, this.muzzlebox.y);
        this.scene.player.canAttack=false;     
    }
    if(Phaser.Input.Keyboard.JustDown(this.keys['shoot']) && this.scene.player.canAttack==true){
    this.startTimer = this.scene.time.addEvent({
        delay: 100,
        repeat: 0,
        callback: function () 
            { 
                this.scene.player.canAttack=true;
                this.setFrame(0);
                this.muzzlebox.body.setEnable(false)
                this.muzzlebox.setVisible(false);
            },
            callbackScope:this,
        });
        //this.anims.play('fire');
        this.scene.sound.play('p90-shoot');
        this.muzzlebox.body.setEnable(true)
        //this.muzzlebox.setPosition(this.x +30,this.y)
        if(this.flipX==false){
            this.muzzlebox.setPosition(this.x -30,this.y)
        }
        //this.anims.play('punch');
        //this.scene.sound.play('sword-swosh');
        this.shootBullet(this.muzzlebox.x, this.muzzlebox.y);
        this.scene.player.canAttack=false; 
    }
}
};
