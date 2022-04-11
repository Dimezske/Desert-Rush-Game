import Phaser from 'phaser';
export default class WaterCreate extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y) {
		super(scene, x, y);
		this.scene.add.existing(this);
        this.scene = scene;
        this.scene.physics.world.enable(this);
        this.setVisible(true);
		var windowRatio = 1680 * 1050;
		var gameRatio = 1450 * 775;
		var bodyX = x;				// top-left x-pos
		var bodyY = y;				// top-right y-pos
		var bodyWidth = 800;		// hor span of body
		var bodyHeight = 250;		// vert span of body

		var columns = 10;			// springs
		var columnWidth = (bodyWidth / columns);
		///column_corners(i);
		
		var Height = [];
		var Speed = [];
		var leftDelta = [];	// difference between i and (i - 1) spring's height
		var rightDelta = [];
		var TargetHeight = windowRatio < gameRatio ? Width / gameRatio : Height;
		
		var x1 = bodyX + (i * columnWidth);
		var y1 = bodyY + TargetHeight[i] - Height[i];
		var x2 = x1 + columnWidth;
		var y2 = bodyY + TargetHeight[i];
		var right_y1 = y1;

if (i < columns - 1)
		right_y1 = bodyY + TargetHeight[i + 1] - Height[i + 1 ];

// set corner vars
function column_corners(i){
	var i = 0;
	var x1 = bodyX + (i * columnWidth);
	var y1 = bodyY + TargetHeight[i] - Height[i];
	var x2 = x1 + columnWidth;
	var y2 = bodyY + TargetHeight[i];
	var right_y1 = y1;

	if (i < columns - 1)
	right_y1 = bodyY + TargetHeight[i + 1] - Height[i + 1 ];
}

// define columns (springs), indexes in misc arrays
for(i = 0; i < columns; i++) {
	// height will eventually settle at targetHeight, speed is acceleration

	Height[i] = bodyHeight;
	TargetHeight[i] = bodyHeight;
	Speed[i] = 0;
	
	leftDelta[i] = 0;	// difference between i and (i - 1) spring's height
	rightDelta[i] = 0;	// difference between i and (i + 1) spring's height
}

	var Dampening = 0.025;		// lower = longer spring oscillation
	var Tension = 0.025;		// higher = more "stiff", lower = looser and more "springy"
	var Spread = 0.1;			// higher = waves spread fast & more "jello"-like

	var passes = 4;				// pulls on neighbors per game step


for (i = 0;i < 10; i++) {
	// the spring logic
    var Displacement = (TargetHeight[i] - Height[i]);
    Speed[i] += (Tension * Displacement) - (Dampening * Speed[i]);
    Height[i] += Speed[i];

	// reset deltas each game step
    leftDelta[i] = 0;
    rightDelta[i] = 0;

	
	// Basic collision detection
	// TODO: collision lines with instances
   
	//if(this.scene.player.overlaps(this.scene.player.x, this.scene.player.y, x1, y1, x2, y2)){
	//	Speed[i] -= 10;
	//}
}

// passes to pull on neighbors
for (var j = 0; j < passes; j++) {
    for (var i = 0; i < this.columns; i++) {
		// left neighbor
        if (i > 0) {
            this.leftDelta[i] = this.Spread * (this.Height[i] - this.Height[i - 1]);
            this.Speed[i - 1] += this.leftDelta[i];
        }
		// right neighbor
        if (i < this.columns - 1) {
            this.rightDelta[i] = this.Spread * (this.Height[i] - this.Height[i + 1]);
            this.Speed[i + 1] += this.rightDelta[i];
        }
    }

    for (var i = 0; i < this.columns; i++) {
		// left neighbor
        if (i > 0) {
            this.Height[i - 1] += this.leftDelta[i];
        }
		// right neighbor
        if (i < columns - 1) {
			this.Height[i + 1] += this.rightDelta[i];
        }
    }
}

	// colors in triangle gradient
	var col1 = 0x00eaff;
	var col2 = 0x0037ff;
		
	for (var i = 0; i < columns; i++) {
		// set corner vars
		column_corners(i);
		// draw colored triangles to form trapezoids
		//var r4 = this.add.triangle(200, 400, 0, 148, 148, 148, 74, 0, 0xff6699);
		//var r5 = this.add.triangle(x1, y1, x1, y2, x2, y2, col1, col2);
		let t1 = this.scene.add.triangle(200, 100, 0, 148, 148, 148, 74, 0, col1);	
		let t2 = this.scene.add.triangle(x1, y1, x2, right_y1, x2, y2, col1, col1, col2);
		//var drawtriangle1 = new Phaser.GameObjects.Triangle(this, x1, y1, x1, y2, x2, col1, col2)
		//var drawtriangle2 = new Phaser.GameObjects.Triangle(this, x1, y1, x2, right_y1, x2, y2, col1, col1, col2)

		//draw_triangle_color(x1, y1, x1, y2, x2, y2, col1, col2, col2, false);
		//draw_triangle_color(x1, y1, x2, right_y1, x2, y2, col1, col1, col2, false);
	}
}
}