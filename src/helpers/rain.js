export default class Rain extends Phaser.GameObjects.Particles.ParticleEmitter {
        constructor (scene){
            this.scene = scene;
            this.emitter = particles.createEmitter({
                x: 500,
                y: -400,
                angle: { min: 0, max: 120 },
                speed: 300,
                gravityY: 100,
                lifespan: { min: 1000, max: 2000 },
                blendMode: 'ADD'
                
            });
        }

        init(){
            this.Cloud = [];
            //"this" used for "this.cache", has to be "this.scene"
            this.levelData_Clouds = this.scene.cache.json.get('level_clouds');
            this.levelData_Clouds.cloudData.forEach((element)=>{
                this.Cloud.push(new Clouds(this.scene, element.x, element.y, 'clouds', element.isAddative));
            }, this)   
        } 
    } 