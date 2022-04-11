import Phaser from 'phaser';

/**
 * @param {Phaser.Scene} scene
 * @param {number} totalWidth
 * @param {string} texture
 * @param {number} scrollFactor
 */

const createAligned = (scene, totalWidth, texture, scrollFactor) => {
    const w = scene.textures.get(texture).getSourceImage().width
    //const totalWidth = scene.scale.width * 10

    const count = Math.ceil(totalWidth / w) * scrollFactor

    let x = 0
    for(let i = 0; i < count; ++i)
    {
        const m = scene.add.image(x, scene.scale.height, texture)
            .setOrigin(0,1)
            .setScrollFactor(scrollFactor)

            x += m.width
    }
    
}

export default class ParallaxScene extends Phaser.Scene
{
    constructor()
    {
        super('parallax-scene')
    }

    preload()
    {
        this.load.image('sky', 'src/assets/sky.png')
        this.load.image('mountains', 'src/assets/mountains.png')
        this.load.image('plateau', 'src/assets/plateau.png')
        //this.load.image('grounds', '../assets/grounds.png')

        this.cursors = this.input.keyboard.createCursorKeys()
    }
    create(){
        const width = this.scale.width
        const height = this.scale.height
        const totalWidth = width * 10
        
        

        //const mountainCount = totalWidth / this.textures.get('mountains').getSourceImage().width
        //console.log(mountainCount * 0.25)
        this.add.image(width * 0.5, height * 0.5, 'sky')
        .setScrollFactor(0)

        createAligned(this, totalWidth, 'mountains', 0.25)
        createAligned(this, totalWidth, 'plateau', 0.5)
        //createAligned(this, totalWidth , 'grounds', 1)

        //this.add.image(0, height, 'mountains')
        //    .setOrigin(0,1)
        //    .setScrollFactor(0.25)

        //this.add.image(0, height, 'plateau')
        //    .setOrigin(0,1)
        //   .setScrollFactor(0.5)
        
        //this.add.image(0, height, 'grounds')
        //    setOrigin(0,1) 

        //this.cameras.main.setBounds(0, 0, width * 10, height)
    }
    update()
    {
        const cam = this.cameras.main
        const speed = 10
        if(this.cursors.left.isDown)
        {
            cam.scrollX -= speed
        }
        else if(this.cursors.right.isDown)
        {
            cam.scrollX += speed
        }
        if(this.cursors.up.isDown)
        {
            cam.scrollY -= speed
        }
        else if(this.cursors.down.isDown)
        {
            cam.scrollY += speed
        }
    }
}
