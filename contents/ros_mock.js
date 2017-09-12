var ROSLIB = ROSLIB || {};
ROSLIB.Ros = class {
  constructor(opts) {
    this.opts = opts;
  }
  on(typeName, callback) {}
}
ROSLIB.Topic = class {
  constructor(opts) {
    this.opts = opts;
  }
  publish(v) {}
}
ROSLIB.Message = class {
  constructor(opts) { this.opts = opts;}
}
ROSLIB.Service = class {
  constructor(opts) { this.opts = opts};
  callService(a, f) {}
}
ROSLIB.ServiceRequest = class {
  constructor(opts) { this.opts = opts};
}
