export default function makeAnimations(scene) {   
       scene.anims.create({
            key: 'jump',
            frames: [ { key: 'player', frame: 8 } ],
            frameRate: 20

        })
        scene.anims.create({
            key: 'left',
            frameRate: 10,
            frames: scene.anims.generateFrameNumbers('player', { start: 1, end: 3 }),
            repeat: -1
        });

        scene.anims.create({
            key: 'duck',
            frames: [ { key: 'player', frame: 8 } ],
            frameRate: 20
        });

        scene.anims.create({
            key: 'right',
            frameRate: 10,
            frames: scene.anims.generateFrameNumbers('player', { start: 4, end: 6 }),
            repeat: -1
        });
        /*
        scene.anims.create({
            key: 'clingleft',
            frames: [{
                key: 'player-cling-left',
                frame: 10
            }],
            frameRate: 20
        });
        scene.anims.create({
            key: 'clingright',
            frames: [{
                key: 'player-cling-right',
                frame: 11
            }],
            frameRate: 20
        });*/
    }