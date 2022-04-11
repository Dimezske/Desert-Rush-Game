document.getElementById('version').textContent = 'Phaser v' + Phaser.VERSION;

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  loader: {
    baseURL: 'https://labs.phaser.io',
    crossOrigin: 'anonymous'
  },
  physics: {
    default: 'arcade',
    arcade: { debug: true, fps: 300, gravity: { y: 600 } }
  },
  scene: {
    preload: preload,
    create: create
  }
};

var game = new Phaser.Game(config);

function preload () {
  this.load.image('block', 'assets/sprites/block.png');
  this.load.image('dude', 'assets/sprites/phaser-dude.png');
  this.load.image('ball', 'assets/sprites/blue_ball.png');
  this.load.image('sky', 'assets/skies/cavern2.png');
}

function create () {
  this.add.image(400, 300, 'sky');
  
  var block = this.physics.add.image(100, 500, 'block')
    .setImmovable(true)
    .setVelocity(100, -100);

  block.body.setAllowGravity(false);

  var dude = this.physics.add.image(100, 0, 'dude');
  
  var balls = this.physics.add.group({
    key: 'ball',
    frameQuantity: 192,
    gridAlign: { width: 16, height: 12, cellWidth: 50, cellHeight: 50 },
    visible: false,
    allowGravity: false
  });
    
  this.tweens.timeline({
    targets: block.body.velocity,
    loop: -1,
    tweens: [
      { x:    0, y: -200, duration: 2000, ease: 'Stepped' },
      { x:    0, y:    0, duration: 1000, ease: 'Stepped' },
      { x:  150, y:  100, duration: 4000, ease: 'Stepped' },
      { x:    0, y: -200, duration: 2000, ease: 'Stepped' },
      { x:    0, y:    0, duration: 1000, ease: 'Stepped' },
      { x: -150, y:  100, duration: 4000, ease: 'Stepped' }
    ]
  });

  this.physics.add.collider(block, dude);
  
  this.physics.add.collider(block, balls);
}

// You can stick the sprite to the moving platform.
// You have to unstick him as well somehow though. 
function collide (block, dude) {
  if (block.body.moves && block.body.touching.up && dude.body.touching.down) {
    dude.setGravityY(10000);
  }
}
