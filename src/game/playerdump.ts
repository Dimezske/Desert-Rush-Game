
   
    this.body.setVelocityX(0);
    
    
    if (this.cursors.left.isDown) {
        this.body.setVelocityX(-160);
        this.anims.play('left', true);
       
       //isnotdown = false;
    } 
    if (this.cursors.right.isDown) {
        this.body.setVelocityX(160);
        this.anims.play('right', true);
       
        //isnotdown = false;
    }
    else if (this.cursors.down.isDown) {
        this.body.setVelocityX(0);
        this.anims.play('duck');
        //isnotdown = false;
    }
    else if (this.cursors.up.isDown && this.body.touching.down){
        this.scene.sound.play('jump')
            this.body.setVelocityY(-330);
            //isnotdown = false;
    }
    if (this.cursors.down.isDown && this.cursors.left.isDown){
        this.body.setVelocityX(-80);
        this.anims.play('duck-left', true);
        //isnotdown = false;
    }
    if (this.cursors.down.isDown && this.cursors.right.isDown){
        this.body.setVelocityX(80);
        this.anims.play('duck-right', true);
        //isnotdown = false;
    }
    
    //----------------Clinging Cliff Hang------------------------------
    if(this.keys['clingOn'].isDown ) {
        console.log('is clinging')
        this.body.setAcceleration(0,0)
        this.scene.sound.play('cling')    
    }
    if(this.keys['clingOff'].isDown)    {    
        console.log('is not clinging')
        this.body.setAcceleration(0,0)    
    }
    if(this.keys['clingOn'].isDown && this.body.touching.left) {
        this.isClinging = true
        this.body.setVelocityY(0,0),
        this.body.setVelocityX(0,0),
        this.anims.play('cling-left');
        if (this.isClinging) {
            this.anims.play('cling-left',false);
            this.scene.sound.play('cling')
        }
    }
    if(this.keys['clingOn'].isDown && this.body.touching.right) {
        this.isClinging = true
        this.body.setVelocityY(0,0),
        this.body.setVelocityX(0,0),
        this.anims.play('cling-right');
        if (this.isClinging){
            this.anims.play('cling-right',false);
            this.scene.sound.play('cling')
        }
    }


/*
this.anims.create({
    key: 'attack-right',
    frames: this.anims.generateFrameNumbers('schimitar-sprite', {start: 4, end: 5 }),
    frameRate: 60
});


	this.anims.create({
		key: 'idle',
		frames: this.anims.generateFrameNumbers('schimitar-sprite', {start: 2, end: 2 }),
		frameRate: 15,
		repeat: -1
	});
    this.anims.create({
		key: 'left',
		frames: this.anims.generateFrameNumbers('schimitar-sprite', {start: 2, end: 2 }),
		frameRate: 10,
		repeat: -1
	});
	this.anims.create({
		key: 'right',
		frames: this.anims.generateFrameNumbers('schimitar-sprite', {start: 3, end: 3 }),
		frameRate: 10,
		repeat: -1
	});
    */