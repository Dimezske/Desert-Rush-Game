//import player-sprites from '../assets/characterSheet.png'
export default function makeAnimations(scene) {
    // TONS of animations. Everything animation-related is ugly and stupid below.
    // TODO:  maybe use JSON to load animations
    
    let config = {
        key: 'platform',
        frames: scene.anims.generateFrameNumbers('platforms', {
            start: 14,
            end: 14,
            first: 14
        })
    };

    scene.anims.create(config);
    //---------------Player Animation------------------------------
    config = {
        key: 'PlatformTile',
        frames: scene.anims.generateFrameNumbers('tiles', {
            start: 14,
            end: 14,
            first: 14
        })
    };
        scene.anims.create(config);   
        config = {
            key: 'left',
            frames: scene.anims.generateFrameNumbers('player-sprite', {
                start: 1,
                end: 3
            }),
            frameRate: 10,
            repeat: -1
        };

        scene.anims.create(config);
        config = {
            key: 'turn',
            frames: [{
                key: 'player-sprite',
                frame: 0
            }],
            frameRate: 20
        };

        scene.anims.create(config);
        config = {
            key: 'right',
            frames: scene.anims.generateFrameNumbers('player-sprite', {
                start: 4,
                end: 6
            }),
            frameRate: 10,
            repeat: -1
        };

        scene.anims.create({
            key: 'clingleft',
            frames: [{
                key: 'player-sprite',
                frame: 10
            }],
            frameRate: 20
        });
        scene.anims.create({
            key: 'clingright',
            frames: [{
                key: 'player-sprite',
                frame: 11
            }],
            frameRate: 20
        });
        scene.anims.create({
            key: 'turn',
            frames: [{
                key: 'player-sprite',
                frame: 0
            }],
            frameRate: 20
        });



        // Particle behaviour ranges to create a smoke drift-like effect
        emitter.accelerationX = 20;
        emitter.minParticleScale = 0.1;
        emitter.maxParticleScale = 1.2;
        emitter.minRotation = -15;
        emitter.maxRotation = 5;
        emitter.setSpeedY(-10, -10);
        emitter.setSpeedX(10, 20);
        emitter.gravity = -100;
        emitter.setPosition(500, 400);
        //emitter.setAlpha(0.1, 0.2, LIFECYCLE, Phaser.Math.Easing.Quadratic.InOut, true);
        emitter.start(false, LIFECYCLE, 1, 1);
        emitter.setSpeed(10);
        //emitter.setBlendMode(Phaser.BlendModes.ADD);
}
