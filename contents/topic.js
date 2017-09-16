const topic = {};
topic.CmdVel = class {
  constructor(ros) {
    this.car = ros.car;
  }
  publish(req) {
    this.car.forward();
    this.car.update();
  }
}
