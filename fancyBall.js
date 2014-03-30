var fancyBall = function(width, height) {
  this.canvas = null;
  this.ctx = null;
  this.balls = [];
  this.width = width || 480;
  this.height = height || 400;
  this.lineDist = 60;
};

fancyBall.prototype = {
  $: function(id) {
    return id ? document.getElementById(id) : null;
  },
  initCanvas: function(id) {
    this.canvas = this.$(id);
    if (this.canvas && this.canvas.getContext("2d")) {
      this.ctx = this.canvas.getContext("2d");
      this.canvas.setAttribute("width", this.width);
      this.canvas.setAttribute("height", this.height);
    } else {
      this.canvas.innerHTML = "Browser not support Canvas";
    }
  },
  checkCollide: function() {
    var obja, objb;
    for (var i = 0; i < this.balls.length - 1; i++) {
      obja = this.balls[i];
      for (var j = i + 1; j < this.balls.length; j++) {
        objb = this.balls[j];
        this.doCheckCollide(obja, objb);
      }
    }
  },
  doCheckCollide: function(obja, objb) {
    if (this.collide(obja, objb)) {
      obja.collide = "true";
      objb.collide = "true";
      this.ctx.moveTo(obja.x, obja.y);
      this.ctx.quadraticCurveTo(obja.x, obja.y+20, objb.x, objb.y);
      this.ctx.stroke();
    }
  },
  collide: function(obja, objb) {
    var minDist = obja.r + objb.r + this.lineDist;
    var distX = obja.x - objb.x;
    var distY = obja.y -objb.y;
    var dist = distX * distX + distY * distY;
    if(dist <= minDist * minDist) {
      return true;
    } else {
      return false;
    }
  },
  createBall: function(num) {
    var ballNumber = num || 1;
    for (var i = ballNumber; i--;) {
      this.balls.push(new Ball(this.canvas.width, this.canvas.height, 2, 4, 2));
    }
  },
  draw: function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (var i = this.balls.length; i--;) {
      this.ctx.beginPath();
      this.ctx.arc(this.balls[i].x, this.balls[i].y, this.balls[i].r, 0, Math.PI * 2);
      this.ctx.fillStyle = "#CCC";
      /*if (this.balls[i].collide === "true") {*/
        //this.balls[i].collide = "false";
        //this.ctx.fillStyle = "#C00";
      //} else {
        //this.ctx.fillStyle = "#CCC";
      /*}*/
      this.checkCollide();
      this.ctx.fill();
    }
  },
  move: function() {
    var newx = 0;
    var newy = 0;
    for (var i = this.balls.length; i--;) {
      newx = this.balls[i].x + this.balls[i].vx;
      newy = this.balls[i].y + this.balls[i].vy;
      if (newy < 0 || newx < 0 || newx > this.width) {
        this.balls.splice(i, 1);
        this.balls.push(new Ball(this.canvas.width, this.canvas.height, 2, 4, 2));
      } else {
        this.balls[i].x = newx;
        this.balls[i].y = newy;
      }
    }
  },
  update: function() {
    this.move();
    //this.checkCollide();
    this.draw();
  },
  run: function() {
    var _this = this;
    this.timer = setInterval(function() {
      _this.update();
    }, 1000 / 60);
  },
  init: function(num) {
    this.createBall(num);
    this.run();
  }
};

var Ball = function(maxX, maxY, minR, maxR, maxV) {
  this.x = Math.random() * maxX >> 0;
  this.y = Math.random() * maxY >> 0;
  //this.y = Math.random() * maxY >> 0;
  //this.vx = Math.random() * maxV + 1 >> 0;
  this.vx = 0;
  this.vy = -(Math.random() * maxV + 1) >> 0;
  this.r = Math.random() * maxR >> 0;
  this.collide = false;
  if (this.r < minR) {
    this.r = minR;
  }
};

var fancyBall = new fancyBall(960, 800);
fancyBall.initCanvas('myCanvas');
if (fancyBall.canvas) {
  fancyBall.init(20);
}
