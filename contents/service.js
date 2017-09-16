const service = {};
service.TimedMotion = class {
  constructor(ros) {
    this.car = ros.car;
  }
  run(req) {
    if(!this.car.motorOn) return {success: false};
    var pid = null;
    var t = 0;
    var self = this;
    pid = setInterval(function() {
      if(req.left_hz > 0) {
        self.car.turnRight();
      } else {
        self.car.turnLeft();
      }
      self.car.update();
      t += 100;
      if(t >= req.duration_ms) {
        clearInterval(pid);
        pid = null;
      }
    }, 100);
    return {success: true};
  }
}

service.MotorOn = class {
  constructor(ros) {
    this.car = ros.car;
  }
  run(req) {
    this.car.motorOn = true;
    this.car.update();
    return {success: true};
  }
}

service.MotorOff = class {
  constructor(ros) {
    this.car = ros.car;
  }
  run(req) {
    this.car.motorOn = false;
    this.car.update();
    return {success: true};
  }
}
