import Phaser from 'phaser';
import Sword from '../game/sword';

export default class Crate extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y){
        super(scene, x, y, 'crate', 0)
        this.scene.add.existing(this);
        this.scene = scene;
        this.scene.physics.world.enable(this);
        this.setVisible(true);
        this.body.setCollideWorldBounds(true);
        this.body.setImmovable(false);
        this.body.setAllowGravity(true);
        this.body.setGravityY(10)
        this.body.setDrag(400,0)
        //this.body.setFriction(1,1);
        this.depth = 0.8;
        this.health = 80.0;
        this.player_collider=this.scene.physics.add.collider(this, this.scene.player, function(){
            this.scene.player.isPushing=true
        },null,this)

this.scene.physics.add.collider(this, this.scene.player.attackbox, () => {
    //if(this.scene.player.attackbox.anims.isPlaying==true){
        this.health-=this.scene.player_punch.damage;
        this.scene.sound.play('crate_hit');
    if(this.health <= 75.0){
        this.setFrame(0)
    };
    if(this.health < 70.0){
        this.setFrame(1)
    };
    if(this.health < 65.0){
        this.setFrame(2)
    };
    if(this.health == 50.0){
        //this.scene.addCarrotAbove(this,0xfc8c03);
        this.scene.dropSchimitar(this)
        this.setTexture('crate-open'); 
        
        this.x+=40;
        this.y-=55;
    }
    if(this.health < 35.0){
        this.setTexture('crate-explode');
        this.setFrame(0)
    };
    if(this.health < 30.0){
        this.setTexture('crate-explode');
        this.setFrame(1)
    };
    if(this.health < 25.0){
        this.setTexture('crate-explode');
        this.setFrame(2)
    };
    if(this.health < 16.0){
        this.setTexture('crate-explode');
        this.setFrame(3)
    };
    if(this.health < 10.0){
        this.setTexture('crate-explode');
        this.setFrame(4)
    };
    if(this.health <= 0){
        this.setVisible(false);
        this.body.setEnable(false);
        this.destroy();
    }
})
this.scene.physics.add.collider(this, this.scene.schimitar, () => {
    if(this.scene.schimitar.anims.isPlaying==true){
        this.health-=this.scene.schimitar.damage;
        this.scene.sound.play('crate_hit');
    if(this.health <= 36.5){
        this.setFrame(0)
    };
    if(this.health < 25.0){
        this.setFrame(1)
    };
    if(this.health < 12.5){
        this.setFrame(2)
    };
    if(this.scene.schimitar.frame.name==1){};
};
            if(this.health <= 0){
                //this.scene.addCarrotAbove(this,0xfc8c03);
                this.scene.dropSchimitar(this)
                this.setTexture('crate-open'); 
                this.body.setEnable(false)
                this.x+=40;
                this.y+=15;
            }
        })
    }
}