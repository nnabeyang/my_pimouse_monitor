var ROSLIB = ROSLIB || {};
ROSLIB.Ros = class {
  constructor(opts) {
    this.opts = opts;
    this.car  = new Car(20, 30, {
      linear: 10,
      angular: 10
    }, {
      x: 100,
      y: 100,
      angle: 90
    });
    this.car.show();
  }
  on(actionName, callback) {}
}
ROSLIB.Topic = class {
  constructor(opts) {
    this.topic = new topic[ROSLIB.klass(opts.name)](opts.ros);
  }
  publish(v) {
    this.topic.publish(v);
  }
}
ROSLIB.Message = class {
  constructor(values) {
    Object.assign(this, values);
  }
}
ROSLIB.ServiceRequest = class {
  constructor(values) {
    Object.assign(this, values);
  };
}
ROSLIB.klass = function(name) {
  return name.replace(/(^\/.|_.)/g, (s) => s.charAt(1).toUpperCase());
};
ROSLIB.Service = class {
  constructor(opts) {
    this.service = new service[ROSLIB.klass(opts.name)](opts.ros);
    this.messageType = opts.messageType;
  };
  callService(req, f) {
    return f(this.service.run(req));
  }
}
