import Phaser from 'phaser';

export default class SpwnCrystal extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y){
        super(scene, x, y, 'spwn-crystal', 0)
        this.scene.add.existing(this);
        this.scene = scene;
        this.scene.physics.world.enable(this);
        this.setVisible(true);
        this.body.setImmovable(false);
        this.body.setAllowGravity(false);
        
        this.setDebugBodyColor(0x25db53)
        this.setBodySize(100,100);
        this.depth = 0.8;
        this.isSpawn=false;
        this.crystalID=null;
        this.setCheckPoint=function(){
            if(this.scene.player.spawnID!=this.crystalID){
                this.scene.player.spawnID=this.crystalID;
            this.scene.sound.play('powerup');
            this.scene.player.respawnPoint={x:this.x-100,y:this.y};
      

            let crystals=this.scene.spawnCrystalGroup.getChildren();
            for(let i=0;i<crystals.length;i++){
             if(crystals[i].crystalID==this.scene.player.spawnID){
                 crystals[i].isSpawn=true;
             }else{crystals[i].isSpawn=false};
     
            }
        };
        };
        this.scene.physics.add.overlap(this, this.scene.player, this.setCheckPoint, function(){
            if(this.isSpawn==false){
return true;

        }else{return false}}, this)
      
    }

}