var fancyBall = function(width, height) {
  this.canvas = null;
  this.ctx = null;
  this.balls = [];
  this.width = width || 480;
  this.height = height || 400;
  this.lineDist = 100;
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
      this.ctx.stroke();
  },
  doCheckCollide: function(obja, objb) {
    if (this.collide(obja, objb)) {
      obja.collide = "true";
      objb.collide = "true";
    }
  },
  collide: function(obja, objb) {
    var minDist = obja.r + objb.r + this.lineDist;
    var distX = obja.x - objb.x;
    var distY = obja.y - objb.y;
    var dist_2 = distX * distX + distY * distY;
    //开根号
    var dist = Math.pow(dist_2, 1 / 2);
    if (dist_2 <= minDist * minDist) {
      this.ctx.moveTo(Math.floor(obja.x)+0.5, Math.floor(obja.y)+0.5);
      //this.ctx.quadraticCurveTo(obja.x, obja.y+40, objb.x, objb.y);
      this.ctx.lineTo(Math.floor(objb.x)+0.5, Math.floor(objb.y)+0.5);
      //this.ctx.strokeStyle = "rgba(101,131,191," + (1-dist/this.lineDist) + ")";
      this.ctx.strokeStyle = "rgba(101,131,191,0.02)";
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
      this.checkCollide();
      this.ctx.fillStyle = "#6583c1";
      this.ctx.beginPath();
      this.ctx.arc(this.balls[i].x, this.balls[i].y, this.balls[i].r, 0, Math.PI * 2, true);
      this.ctx.closePath();
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
    this.draw();
  },
  run: function() {
    var _this = this;
    this.timer = setInterval(function() {
      _this.update();
    }, 20);
  },
  init: function(num) {
    this.createBall(num);
    this.run();
  }
};

var Ball = function(maxX, maxY, minR, maxR, maxV) {
  this.x = Math.random() * maxX >> 0;
  //this.y = Math.random() * maxY >> 0;
  this.y = Math.random() * maxY >> 0;
  //this.y = Math.random() * maxY >> 0;
  //this.vx = Math.random() * maxV + 1 >> 0;
  //this.vx = 1 * Math.random() + Math.random() + .05;
  this.vx = 0;
  this.vy = -1 * Math.random() - Math.random() - .05;
  //this.r = Math.random() * maxR >> 0;
  this.r = 1;
  this.collide = false;
  if (this.r < minR) {
    this.r = minR;
  }
};

var viewportwidth;
var viewportheight;

// the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight

if (typeof window.innerWidth != 'undefined') {
  viewportwidth = window.innerWidth,
  viewportheight = window.innerHeight
}

// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth !=
  'undefined' && document.documentElement.clientWidth != 0) {
  viewportwidth = document.documentElement.clientWidth,
  viewportheight = document.documentElement.clientHeight
}

// older versions of IE
else {
  viewportwidth = document.getElementsByTagName('body')[0].clientWidth,
  viewportheight = document.getElementsByTagName('body')[0].clientHeight
}
var fancyBall = new fancyBall(viewportwidth, viewportheight);
fancyBall.initCanvas('myCanvas');
if (fancyBall.canvas) {
  fancyBall.init(30);
}
