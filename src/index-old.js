import Phaser from 'phaser';
import LogoImg from './assets/logo.png';
import Player from './game/Player';
import Animations from './helpers/animations';
import GameOver from './scenes/GameOver'
import BootScene from './scenes/BootScene';
import TitleScene from './scenes/TitleScene';
import ParallaxScene from './helpers/paralaxscene.js';
import Platforms from './game/platform'
import MovingPlatforms from './game/movingplatform';
import Clouds from './game/clouds';
import RainClouds from './game/rainclouds';
import Rains from './helpers/rain';
import BackgroundImg from'./assets/desert-background.png';
import GroundWallImg from './assets/ground_sand_walling.png';
import GroundWall from './game/platformwalling';

import Sky from './assets/sky.png';
import Mountains from './assets/mountains.png';
import Plateau from'./assets/plateau.png';

import matrixFont from './assets/knighthawks-font.png';
import GroundImg from './assets/ground_sand_broken_wall.png';
import GroundSandImg from './assets/ground_sand.png';
import GroundGrassImg from './assets/ground_grass-img.png';
import PlatformImg from './assets/ground_sand_broken.png';
import PlayerImg from './assets/characterSheet.png';
import PlayerPunch from './assets/character_punchSheet.png';

import Schimitar from './game/weapons';
import SchimitarImg from './assets/schimitar2.png';

import JumpSound from './assets/sfx/jump.wav';
import ClingSound from './assets/sfx/cling.wav';
import PlayerDieSound from './assets/sfx/playerdied.mp3';
import PowerupSound from './assets/sfx/powerup.wav';
import SwordSwosh from './assets/sfx/swosh-sword.wav';

import Rain from './assets/rain3.png';
import CloudsImg from './assets/clouds.png';
import RainCloudsImg from './assets/clouds.png';
//----------------MOD-----------------------------------
import Trees from './ForestHikerMod/Assets/Trees.png';
import Rocks from './ForestHikerMod/Assets/Rocks.png';
import ForrestBgImg from './ForestHikerMod/Assets/forest-bg.png';
import ForestSky from './ForestHikerMod/Assets/sky.png';
import ForestHaze from './ForestHikerMod/Assets/forest-haze.png';
import ForestGroundImg from './ForestHikerMod/Assets/forest-ground_sand_broken_wall.png';
import ForestPlatformImg from './ForestHikerMod/Assets/forest-ground_sand_broken.png';
import ForestGroundSand from './ForestHikerMod/Assets/forest-ground_sand.png';
import ForestPlatformGrassImg from './ForestHikerMod/Assets/forest-ground_grass_broken.png';
import Insects from './environment/insect';
import HummingBirdImg from './ForestHikerMod/Assets/hummingbird.png';

//--------------------Monsters-----------------------------------
import Plunger from './external/plunge';
import PlungerImg from './assets/plunger.png';
import Plunge from './external/plunge';
import PlungerDeath from './assets/sfx/plunger-death.wav';
import PlungerGrowl from './assets/sfx/plunger-growl.wav';
import PlungerGrowlFar from './assets/sfx/plunger-growl-far.wav';
import PlungerGrowlAttack from './assets/sfx/plunger-growl_attack.wav';
import PlungerHurt from './assets/sfx/plunger-hurt.wav';

import Rat from './external/rat';
import Rats from './external/rat';
import RatImg from './assets/rat.png';
import RatSqueak from './assets/sfx/ratsqueak.wav';
import RatHurt from './assets/sfx/rat-hurt.mp3';
import RatDeath from './assets/sfx/ratdeath.mp3';

import Ghost from './external/ghost';
import Ghosts from './external/ghost';
import GhostImg from './assets/ghost.png'
import GhostSnare from './assets/sfx/ghost_snare.mp3';

import Forest_Ambience from './ForestHikerMod/Assets/sfx/forest-ambience.wav';

import Ball from './game/Ball';
import SajinaBall from './assets/ball.png';

import Crate from './game/create';
import CrateImg from './assets/crate.png';
import CrateDamageImg from './assets/crate_damage.png';
import CrateDamageExplodeImg from './assets/crate_explode.png';
import CrateOpenImg from './assets/crate_open.png';
import CrateDamage from './assets/sfx/crate_damage.wav';

import Sword from './game/sword';
import Punch from './game/weaponspunch';

import SpawnCrystalImg from './assets/SpawnCrystal.png';
import SpwnCrystal from './game/SpwnCrystal';
/**
 * @param {Phaser.Scene} scene
 * @param {number} totalWidth
 * @param {string} texture
 * @param {number} scrollFactor
 */
 const createAligned = (scene, totalWidth, texture, scrollFactor, scale = 0) => {
    const w = scene.textures.get(texture).getSourceImage().width
    //const totalWidth = scene.scale.width * 10
    const count = Math.ceil(totalWidth / w) * scrollFactor
    let x = 0
    for(let i = 0; i < count; ++i)
    {
        const m = scene.add.image(x, scene.scale.height, texture)
            .setOrigin(0,1)
            .setScrollFactor(scrollFactor)
            if (scale > 0)
               m.setScale(scale);
            x += m.width
    }
}

class GameScene extends Phaser.Scene
{
    constructor(scene) {
        super({
            key: 'GameScene'
        });
    }

 init(){
        
          /** @type {Phaser.Physics.Arcade.Group} */
        this.balls
        this.ballsCollected = 0
        /** @type {Phaser.GameObjects.Text} */
        this.ballsCollectedText
        this.ballsCollected=0;

        this.swords
        this.swordsCollected = 0
        this.swordsCollectedText
        
        this.soundManager=function(){
         
            if(!this.growlTimer){  
                this.growlTimer = this.time.addEvent({
                  delay: Phaser.Math.Between(12000,46000),
                  repeat: -1,
                  callback: function () {
  
                  for(let i=0;i<this.Plunger.length;i++){
                      let distanceFromPlayer = Phaser.Math.Distance.Between(this.Plunger[i].x, this.Plunger[i].y, this.player.x, this.player.y)
                      if(((distanceFromPlayer > 500) && (this.plungerFarSound.isPlaying==false))){
                          this.plungerFarSound.play();}
                      else if((distanceFromPlayer < 500)&& (this.plungerSound.isPlaying==false)){
                          this.plungerSound.play();}
                  }},
                  callbackScope: this,
                })
            };
                if(this.plungerFell==true){this.plungerDeathFarSound.play(); this.plungerFell=false};
                if(this.plungerDied==true){this.plungerDeathSound.play(); this.plungerDied=false}; 
        if(!this.growlTimer_rat){  
            this.growlTimer_rat = this.time.addEvent({
              delay: Phaser.Math.Between(12000,46000),
              repeat: -1,
              callback: function () {

              for(let i=0;i<this.Rats.length;i++){
                  let distanceFromPlayer = Phaser.Math.Distance.Between(this.Rats[i].x, this.Rats[i].y, this.player.x, this.player.y)
                  if(((distanceFromPlayer > 500) && (this.ratFarSound.isPlaying==false))){
                      this.ratFarSound.play();}
                  else if((distanceFromPlayer < 500) && (this.ratSound.isPlaying==false)){
                      this.ratSound.play();}
              }},
              callbackScope: this,
            })
        };
            //if(this.ratFell==true){this.ratDeathFarSound.play(); this.ratFell=false};
            if(this.ratFell==true){this.ratDeathSound.play(); this.ratFell=false};
            if(this.ratDied==true){this.ratDeathSound.play(); this.ratDied=false};
        if(!this.growlTimer_ghost){  
            this.growlTimer_ghost = this.time.addEvent({
              delay: Phaser.Math.Between(12000,46000),
              repeat: -1,
              callback: function () {

              for(let i=0;i<this.Ghosts.length;i++){
                  let distanceFromPlayer = Phaser.Math.Distance.Between(this.Ghosts[i].x, this.Ghosts[i].y, this.player.x, this.player.y)
                  if(((distanceFromPlayer > 500) && (this.ghostFarSound.isPlaying==false))){
                      this.ghostFarSound.play();}
                  else if((distanceFromPlayer < 500)&& (this.ghostSound.isPlaying==false)){
                      this.ghostSound.play();}
              }},
              callbackScope: this,
            })
        };
            if(this.ghostFell==true){this.ghostDeathFarSound.play(); this.ghostFell=false};
            if(this.ghostDied==true){this.ghostDeathSound.play(); this.ghostDied=false};
    };
 }
    preload() {
        this.load.image('background', BackgroundImg);
        this.load.image('logo', LogoImg);
        this.load.image('sky', Sky);
        this.load.image('mountains', Mountains);
        this.load.image('plateau2', Plateau);
        this.load.image('plateau', Plateau);
        // --------forest-----------------------
        this.load.image('forest-background', ForrestBgImg);
        this.load.image('forest-sky', ForestSky);
        this.load.image('trees', Trees);
        this.load.image('rocks', Rocks);
        this.load.image('forest-haze', ForestHaze);
        
        this.load.image('ground', GroundGrassImg);
        this.load.image('ground-walling', GroundWallImg);

        this.load.image('platform', ForestPlatformGrassImg);
        this.load.image('mplatform', PlatformImg);
        this.load.spritesheet('minsect', HummingBirdImg, {
            frameWidth: 100,
            frameHeight: 100
        });
        this.load.audio('forest-ambience', Forest_Ambience);
        
        //-----------------------------------------------
        this.load.spritesheet('font', matrixFont, {
             frameWidth: 32, frameHeight: 25 
        });
        this.load.audio('jump', JumpSound);
        this.load.audio('powerup', PowerupSound)
		this.load.audio('dead', PlayerDieSound)
		this.load.audio('cling', ClingSound)
        this.load.audio('sword-swosh', SwordSwosh)
        this.load.spritesheet('player-sprite', PlayerImg, {
            frameWidth: 60,
            frameHeight: 80
        });
        this.load.spritesheet('player-punch-sprite', PlayerPunch, {
            frameWidth: 60,
            frameHeight: 80
        })
        this.load.json('version', '/src/leveldata/version.json');
        this.load.json('level_ground', 'src/leveldata/level_ground.json');
        this.load.json('level_spawn_crystal', 'src/leveldata/level_spawncrystals.json');
        this.load.json('level_ground_walling', 'src/leveldata/level_platform_walling.json');
        this.load.json('level_clouds', 'src/leveldata/level_clouds.json');
        this.load.json('level_insects', 'src/leveldata/level_insects.json');
        this.load.json('level_monsters', 'src/leveldata/level_monsters.json');
        this.load.json('level1', 'src/leveldata/level1.json');
        this.load.spritesheet('rain', Rain,{
            frameWidth: 17,
            frameHeight: 25
        });
        this.cursors = this.input.keyboard.createCursorKeys();
        this.load.image('clouds', CloudsImg);
        this.load.image('rainclouds', RainCloudsImg);
        this.load.spritesheet('schimitar-sprite', SchimitarImg, {
            frameWidth: 150,
            frameHeight: 200,
        });  
        //--------------------Monsters---------------------------------
        this.load.spritesheet('plunge-sprite', PlungerImg , {
            frameWidth: 100,
            frameHeight: 100
        })
        this.load.spritesheet('rat-sprite', RatImg , {
            frameWidth: 130,
            frameHeight: 100
        })
        this.load.spritesheet('ghost-sprite', GhostImg , {
            frameWidth: 200,
            frameHeight: 250
        })
        this.load.audio('plunger-death',PlungerDeath);
        this.load.audio('plunger-growl',PlungerGrowl);
        this.load.audio('plunger-growl-far',PlungerGrowlFar);
        this.load.audio('plunger-hurt',PlungerHurt);
        this.load.audio('plunger-attack',PlungerGrowlAttack);

        this.load.audio('rat-squeak', RatSqueak)
        this.load.audio('rat-death', RatDeath)
        this.load.audio('rat-hurt', RatHurt)

        this.load.audio('ghost-snare', GhostSnare)
        this.load.image('ball', SajinaBall) 
        this.load.spritesheet('crate', CrateDamageImg, {
            frameWidth: 150,
            frameHeight: 156
        })
        this.load.spritesheet('crate-explode', CrateDamageExplodeImg, {
            frameWidth: 140,
            frameHeight: 160
        })
        this.load.image('crate-open', CrateOpenImg)
        
        this.load.audio('crate_hit', CrateDamage)
        
        this.load.image('spwn-crystal',SpawnCrystalImg);
    }
    
    create (data) {
        var music = this.sound.add('forest-ambience');
        music.setLoop(true);
        music.play();

        this.plungerSound=this.sound.add('plunger-growl')
        this.plungerFarSound=this.sound.add('plunger-growl-far')
        this.plungerDeathFarSound=this.sound.add('plunger-death',{volume:0.7});
        this.plungerDeathSound=this.sound.add('plunger-death');
        
        this.ratSound=this.sound.add('rat-squeak');
        this.ratFarSound=this.sound.add('rat-squeak',{volume:0.7});
        this.ratDeathFarSound=this.sound.add('rat-death',{volume:0.7});
        this.ratDeathSound=this.sound.add('rat-death');

        this.ghostSound=this.sound.add('ghost-snare');
        this.ghostFarSound=this.sound.add('ghost-snare',{volume:0.7});
        this.ghostDeathFarSound=this.sound.add('ghost-snare',{volume:0.7});
        this.ghostDeathSound=this.sound.add('ghost-snare');

        const background = this.add.image(1450/2, 775/2, 'forest-background');
		background.setScale(Math.max(1450 / background.width, 775 / background.height))
        .setScrollFactor(0);
        // --------------- parallax----------------------------------
        const width = this.scale.width
        const height = this.scale.height
        const totalWidth = width * 10
        this.add.image(width * 0.5, height * 0.5, 'forest-sky')
        .setScrollFactor(0)
        createAligned(this, totalWidth, 'trees', 0.25)
        createAligned(this, totalWidth, 'rocks', 0.35)
        createAligned(this, totalWidth, 'rocks', 0.5)

        this.cameras.main.setBounds(0,this.player, width * 10, height)
        this.spawnCrystal = this.physics.add.existing(new SpwnCrystal(this,200,0,'spwn-crystal', 0))
        
        this.player = this.physics.add.existing(new Player(this, this.spawnCrystal.x, this.spawnCrystal.y, 'player-sprite', 0));
        this.player.cursors = this.input.keyboard.createCursorKeys();
        this.player.body.checkCollision.up = true
		this.player.body.checkCollision.left = true
	    this.player.body.checkCollision.right = true
		this.player.body.checkCollision.down = true
        this.player.setScale(0.7);
        this.player.setBodySize()
        this.player.body.setCollideWorldBounds(false);
        this.player.__ani_setup()

        this.player_punch = this.physics.add.existing(new Punch(this, -200, 200, 'player-punch-sprite', 0));
        this.player_punch.body.checkCollision.left = true
	    this.player_punch.body.checkCollision.right = true
        this.player_punch.body.setCollideWorldBounds(false);
        this.player_punch.__punch_ani_setup()
        
        this.cameras.main.startFollow(this.player,false,0.8,0.5,0,5);
        this.expText=this.add.text(100,700,'0').setTint(0x6600ff).setScrollFactor(0).setDepth(100);

        this.schimitar = this.physics.add.existing(new Schimitar(this, this.player.x, this.player.y, 'schimitar-sprite', 0))
        this.schimitar.cursors = this.input.keyboard.createCursorKeys();
        
        this.schimitar.body.allowGravity = false;
        this.schimitar.body.setBounce(0.2)
        this.schimitar.setScale(0.5);
        this.schimitar.setSize(60, 80);
        this.schimitar.__weapon_ani_setup();
        //this.schimitar.body.setEnable(false)
        if(this.schimitar.body.setEnable(false)){
            this.schimitar.setVisible(false)
        }
        if(this.player.hasMeleeWeapon == true){
            this.schimitar.setVisible(true)
            this.schimitar.body.setEnable(true)
        }
        this.crate = this.physics.add.existing(new Crate(this,300,-250,'crate', 0))

        
        
        //var player = this.add.container(200, 200, [this.add.sprite(0,0, 'player-sprite', 0), this.add.sprite(0,0, 'schimitar-sprite').setVisible(false)])
        //    .setDepth(1).setScale(0.7);

        //-----------------Monsters----------------------------------
        /*
        this.plunger = this.physics.add.existing(new Plunge(this, 200, 100, 1, "horizontal", 3,200));
        this.plunger.setScale(0.7);
        //this.plunger.setBodySize()
        this.plunger.body.setCollideWorldBounds(true);*/
        /*this.plunger.monster__ani_setup()*/
        //--------------Platform data---------------------------------
        this.ground_sand = this.add.sprite(100,400, 'ground');
        this.physics.add.staticGroup(this.ground_sand);
        this.ground_sand.body.allowGravity = false;
        this.ground_sand.body.immovable = true;

        this.levelData_SpawnCrystals = this.cache.json.get('level_spawn_crystal');
        this.levelData_Ground = this.cache.json.get('level_ground');
        this.levelData_Ground_Walling = this.cache.json.get('level_ground_walling');
        this.levelData_level1 = this.cache.json.get('level1');
        this.levelData_Insects = this.cache.json.get('level_insects');
        this.levelData_Monsters = this.cache.json.get('level_monsters');
        this.platforms = this.physics.add.staticGroup()
        this.platforms.enableBody = true;
        
        
        this.levelData_Ground.platformData.forEach((element)=>{
            this.platforms.create(element.x, element.y, 'ground');
        });
        this.levelData_Ground_Walling.platformData.forEach((element)=>{
            this.platforms.create(element.x, element.y, 'ground-walling');
        });
        this.physics.add.collider(this.platforms, this.player)
        this.physics.add.collider(this.ground_sand, this.player)

        this.physics.add.collider(this.platforms, this.crate)
        this.physics.add.collider(this.ground_sand, this.crate)
        
        /*
        this.physics.add.collider(this.ground_sand, this.plunger)
        this.physics.add.collider(this.platforms, this.plunger)*/
        
        this.spawnCrystal = [];
        this.levelData_SpawnCrystals.SpawnCrystalData.forEach((element)=>{
            this.spawnCrystal.push(new SpwnCrystal(this, element.x, element.y, 'spwn-crystal'));
        });
       
        this.platform = [];
        this.levelData_level1.platformData.forEach((element)=>{
            this.platform.push(new Platforms(this, element.x, element.y, 'platform', element.scale));
        });
        this.mPlatform = [];
        this.levelData_level1.movingPlatformData.forEach((element)=>{
            this.mPlatform.push(new MovingPlatforms(this, element.x, element.y, element.scale, element.movementType, element.time, element.distance));
        });
        this.HummingBird = [];
        this.levelData_Insects.InsectData.forEach((element)=>{
            this.HummingBird.push(new Insects(this, element.x, element.y, element.scale, element.movementType, element.time, element.distance));
        });
        console.log(this.Plunger = []);
        this.levelData_Monsters.PlungerData.forEach((element)=>{
            this.Plunger.push(new Plunge(this, element.x, element.y, element.scale, element.movementType, element.time, element.distance));
        });
        console.log(this.Rats = []);
        this.levelData_Monsters.RatData.forEach((element)=>{
            this.Rats.push(new Rat(this, element.x, element.y, element.scale, element.movementType, element.time, element.distance));
        });
        console.log(this.Ghosts = []);
        this.levelData_Monsters.GhostData.forEach((element)=>{
            this.Ghosts.push(new Ghost(this, element.x, element.y, element.scale, element.movementType, element.time, element.distance));
        });
        this.plungerDied=false;
        this.plungerFell=false;
        this.physics.add.collider(this.ground_sand, this.Plunger)
        this.physics.add.collider(this.platforms, this.Plunger)
        this.Plunger.forEach(element=>this.physics.add.collider(element, this.plunger))
        
        this.ratDied=false;
        this.ratFell=false;
        this.physics.add.collider(this.ground_sand, this.Rats)
        this.physics.add.collider(this.platforms, this.Rats)
        this.Rats.forEach(element=>this.physics.add.collider(element, this.rats))
        
        this.ghostDied=false;
        this.ghostFell=false;
        this.physics.add.collider(this.ground_sand, this.Ghosts)
        this.physics.add.collider(this.platforms, this.Ghosts)
        this.Ghosts.forEach(element=>this.physics.add.collider(element, this.ghosts))

        this.platform.forEach(element=>this.physics.add.collider(element, this.player))
        this.mPlatform.forEach(element=>this.physics.add.collider(element, this.player))
        
        
        this.player_box_collider = this.physics.add.collider(this.player, this.crate)
        this.physics.add.collider(this.Plunger, this.crate)
        this.physics.add.collider(this.Rats, this.crate)
        
        //----------------------------MIST------------------------------------
        var particles = this.add.particles('rain');
        var emitter = particles.createEmitter({
            
            x: 500,
            y: -400,
            angle: { min: 0, max: 120 },
            speed: 300,
            gravityY: 100,
            lifespan: { min: 1000, max: 2000 },
            blendMode: 'ADD'
            
        });
        //-------------------------Insects-----------------------------------------
        for (const insect of this.HummingBird) {}
        for (const monster of this.Plunger) {}
        ///for (const monster_rats of this.Rats) {}
        for (const monster_ghosts of this.Ghosts) {}
        this.Cloud = []
        this.levelData_Clouds = this.cache.json.get('level_clouds')
        this.levelData_Clouds.cloudData.forEach(element=>this.Cloud.push(new Clouds(this, element.x, element.y, 'clouds', element.isAddative)))
        emitter.startFollow(this.Cloud[0])
        this.rCloud = [];
        this.levelData_Clouds = this.cache.json.get('level_clouds');
        this.levelData_Clouds.rain_cloudData.forEach(element=>this.rCloud.push(new RainClouds(this, element.x, element.y, 'rainclouds', element.isAddative)))
        emitter.startFollow(this.rCloud[0])
        //-------------External collisons------------------------------------------
        
        if(this.physics.add.overlap(this.player, this.spawnCrystal, this.setCheckPoint, undefined, this))
        {
            this.setCheckPoint()
        }
        this.balls = this.physics.add.group({
			classType: Ball
		})
		this.physics.add.collider(this.platforms, this.balls)
		this.physics.add.overlap(this.player, this.balls, this.handleCollectCarrot, undefined, this)
		this.ballsCollectedText = this.add.text(240, 10, 'Balls: 0', { color: 'white', fontSize: 24 })
			.setScrollFactor(0)
			.setOrigin(0.5, 0)

        this.swords = this.physics.add.group({
            classType: Sword
        })
        this.physics.add.collider(this.platforms, this.swords)
        this.physics.add.overlap(this.player, this.swords, this.handleCollectSword, undefined, this)
        this.swordsCollectedText = this.add.text(380, 10, 'Swords: 0', { color: 'yellow', fontSize: 24 })
            .setScrollFactor(0)
            .setOrigin(0.5, 0)
        //------------------------Haze
        //const haze_bg = this.add.image(1450/2, 775/2, 'forest-haze');
		//haze_bg.setScale(Math.max(1450 / haze_bg.width, 775 / haze_bg.height))
        //.setScrollFactor(0);  
        
    }
	update(time, delta) {
        this.player.body.setVelocityX(0)
        //this.player.__ani_setup
        this.player.control_handler()
        this.player.controls_body_attack()
        
        this.expText.setText('exp: '+this.player.exp)
        
        this.schimitar.setPosition(this.player.x, this.player.y);
            // this.schimitar.__weapon_ani_setup();
        this.schimitar.control_handler();
       
    
        this.Cloud.forEach(element => {element.checkCloudMovement()})
        this.rCloud.forEach(element => {element.checkCloudMovement()})
        this.mPlatform.forEach(element => {element.checkPlatformMovement()})
        this.HummingBird.forEach(element => {element.checkInsectMovement()})

        
        //this.plunger.checkMonsterMovement()
        
        let plungerArray = this.Plunger.filter(function (plunge)
        {
        return plunge.health>0 ;
        })
        this.Plunger=plungerArray
        this.Plunger.forEach(element => {if(element.health>0){element.checkMonsterMovement()}})
        
        let ratsArray = this.Rats.filter(function (rat)
        {
        return rat.health>0 ;
        })
        this.Rats=ratsArray
        this.Rats.forEach(element => {element.checkMonsterMovement()})
        
        let ghostsArray = this.Ghosts.filter(function (ghost)
        {
        return ghost.health>0 ;
        })
        this.Ghosts=ghostsArray
        this.Ghosts.forEach(element => {if(element.health>0){element.checkMonsterMovement()}})

        for(let i=0;i<this.Rats.length;i++){
            if(this.Rats[i].health<=0){console.log(this.Rats[i].health)}};
        for(let i=0;i<this.Ghosts.length;i++){
            if(this.Ghosts[i].health<=0){console.log(this.Ghosts[i].health)}};    
        this.soundManager()
        
        //this.Plunger.forEach(element => {if(element){element.checkMonsterMovement()}})
        //this.Plunger.forEach(element => {element.checkMonsterMovement()})
        
        const bottomPlatform = this.findBottomMostPlatform()
        if (this.player.y > bottomPlatform.y + 200)
        {  
            const width = this.scale.width
            const height = this.scale.height

            const gameover = this.add.text(width * 0.5, height * 0.5, 'Game Over', {
                fontSize: 48
            })
            .setOrigin(0.5)
            .setScrollFactor(0)
            gameover.visible = true;
            this.input.keyboard.once('keydown-SPACE', () => {
                    gameover.visible = false;
                    this.player.setPosition(this.spawnCrystal.x,this.spawnCrystal.y)
            });           
                
        }
        
    }
    
    setCheckPoint(){
        var isSpawn = true;
        this.sound.play('powerup');
    }
    addCarrotAbove(sprite, color)
	{

		const y = sprite.y - sprite.displayHeight

		/** @type {Phaser.Physics.Arcade.Sprite} */
		const ball = this.balls.get(sprite.x, y, 'ball').setTint(color)
		ball.setActive(true)
		ball.setVisible(true)
        ball.depth = 1.8;
		this.add.existing(ball)
		ball.body.setSize(ball.width, ball.height)
		this.physics.world.enable(ball)
		return ball
	}

	/**
	 * 
	 * @param {Phaser.Physics.Arcade.Sprite} player 
	 * @param {Carrot} ball 
	 */
	handleCollectCarrot(player, ball)
	{
		this.balls.killAndHide(ball)
		this.physics.world.disableBody(ball.body)
		this.ballsCollected++
		this.ballsCollectedText.text = `Sajina: ${this.ballsCollected}`
        this.sound.play('powerup');
	}
    /**
	 * 
	 * @param {Phaser.Physics.Arcade.Sprite} player 
	 * @param {Carrot} sword 
	 */
     dropSchimitar(sprite){
        const y = sprite.y - sprite.displayHeight
        /** @type {Phaser.Physics.Arcade.Sprite} */
        const sword = this.swords.get(sprite.x, y, 'schimitar-sprite')
        sword.setActive(true)
        sword.setVisible(true)
        sword.depth = 1.8;
        this.add.existing(sword)
        sword.body.setSize(sword.width, sword.height)
        this.physics.world.enable(sword)
        sword.setScale(.5)
        return sword
    }
    handleCollectSword(player, sword)
	{
		this.swords.killAndHide(sword)
		this.physics.world.disableBody(sword.body)
		this.swordsCollected++
        if (this.swordsCollected >= 1){
            this.player.hasMeleeWeapon = true;
            if(this.player.hasMeleeWeapon == true){
                this.schimitar.setVisible(true)
                this.schimitar.body.setEnable(true)
            }
        }
        if (this.swordsCollected >= 2){
            if(this.swordsCollected++){
                this.schimitar.damage += 0.5;
            }
        }
        /**/
		this.swordsCollectedText.text = `Swords: ${this.swordsCollected}`
        this.sound.play('powerup');
	}
    
    findBottomMostPlatform()
    {
        const platforms = this.platforms.getChildren()
        let bottomPlatform = platforms[0]
        platforms.map(platform=>{
            if (platform.y < bottomPlatform.y) return false
            bottomPlatform = platform
        })
        return bottomPlatform
    }
}
const config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    width: 1450,
	height: 775,
    scene: [

       // BootScene,
        //TitleScene,
        GameScene,
       GameOver,
        ParallaxScene
    ],
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {
				y: 200
			},
			debug: true
		}
	}
};
const game = new Phaser.Game(config);
