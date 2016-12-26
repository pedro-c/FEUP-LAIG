function cameraAnimation(scene,finalPosition,Player){

  this.scene=scene;
  this.finalPosition=finalPosition;
  this.span=3;
  this.x=0;
  this.y=40;
  this.z=0;

  this.radius=40;
  this.degToRad=Math.PI/180;
  this.rotationAngle=180*this.degToRad;

  this.currTime=0;
  this.ended=false;

  if(Player==='player1'){
    this.initialAngle=Math.PI;
  }
  else if(Player==='player2'){
    this.initialAngle=0;
  }

};

cameraAnimation.prototype.updateAnimation=function(time){

  this.currTime += time / 1000;

  if (this.currTime >= this.span) {

      this.ended = true;

      return;
  } else {

      var percentage = this.currTime / this.span;

      this.currAngle = this.rotationAngle * percentage;

      this.x = this.radius * Math.sin(this.initialAngle + this.currAngle);
      this.z = this.radius * Math.cos(this.initialAngle + this.currAngle);

      this.scene.camera.setPosition(vec3.fromValues(this.x,this.y,this.z));

  }

};