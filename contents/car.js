class Car {
  constructor(h, w, s, p) {
    this.h = h;
    this.w = w;
    this.s = s;
    this.p = p;
    this.motorOn = false;
    this.canvas = document.getElementById('stage');
    this.context = this.canvas.getContext('2d');
  }
  check() {
    if (this.p.x < 30 || this.p.y < 30 ||
      this.p.x > 450 || this.p.y > 450) {
      this.s.linear = 0;
    }
  }
  move(step = 1) {
    this.p.x += this.s.linear * Math.cos((this.p.angle * Math.PI) / 180) * step;
    this.p.y += this.s.linear * Math.sin((this.p.angle * Math.PI) / 180) * step;
    if(this.p.x > 500) this.p.x -= 500;
    if(this.p.x < 0) this.p.x += 500;
    if(this.p.y > 500) this.p.y -= 500;
    if(this.p.y < 0) this.p.y += 500;
    this.p.angle = ((360 + this.s.angular) * step + this.p.angle) % 360;
  }
  forward(step = 1) {
    this.s.linear = 10;
    this.s.angular = 0;
    if(this.motorOn) {
      this.move(step);
    }
  }
  back(step = 1) {
    this.s.linear = -10;
    this.s.angular = 0;
    this.move(step);
  }
  turnRight(step = 1) {
    this.s.linear = 0;
    this.s.angular = 18;
    this.move(step);
  }
  turnLeft(step = 1) {
    this.s.linear = 0;
    this.s.angular = -18;
    this.move(step);
  }
  pubValues() {
    var fw = this.s.linear * 0.01;
    var rot = - this.s.angular * 8;
    return {
      linear: {x: fw, y: 0, z: 0},
      angular: {x: 0, y: 0, z: Math.PI * rot / 180}
    };
  }
  update() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.show();
  }
  show() {
    var context = this.context;
    context.save();
    context.translate(this.p.x, this.p.y);
    context.rotate((this.p.angle * Math.PI) / 180);
    if(this.motorOn) {
      var oldFillStyle = context.fillStyle;
      context.fillStyle = 'red';
      context.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
      context.fillStyle = oldFillStyle;
    } else {
      context.strokeRect(-this.w / 2, -this.h / 2, this.w, this.h);
    }
    context.fillRect(this.w / 4, -this.h / 2, this.w / 4, this.h);
    context.restore();
  }
}
