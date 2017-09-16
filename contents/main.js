var ros = new ROSLIB.Ros({url: 'ws://' + location.hostname + ':9000'});

ros.on('connection', function() { console.log('websocket: connected')});
ros.on('error', function(error) { console.log('websocket: error: ', error)});
ros.on('close', function() { console.log('websocket: closed')});

var pid = null;


var on =  new ROSLIB.Service({
  ros: ros,
  name: '/motor_on',
  messageType: 'std_srvs/Trigger'
});

var off = new ROSLIB.Service({
  ros: ros,
  name: '/motor_off',
  messageType: 'std_srvs/Trigger'
});

var turnRight = new ROSLIB.Service({
  ros: ros,
  name: '/timed_motion',
  messageType: 'pimouse_ros/TimedMotion'
});

function switchOn() {
on.callService(new ROSLIB.ServiceRequest(), function(result) {
  if(result.success) {
    console.log("switch on");
  }
});
}
function switchOff() {
off.callService(new ROSLIB.ServiceRequest(), function(result) {
  if(result.success) {
    console.log("switch off");
  }
});
}

function turn() {
  turnRight.callService(new ROSLIB.ServiceRequest({
  left_hz: 400,
  right_hz: -400,
  duration_ms: 1000
 }), function(result) {
  if(result.success) {
    console.log("turn right");
  }
});
}

function move_right() {
  turnRight.callService(new ROSLIB.ServiceRequest({
  left_hz: 400,
  right_hz: -400,
  duration_ms: 500
 }), function(result) {
  if(result.success) {
    console.log("turn right");
  }
});
}

function move_left() {
  turnRight.callService(new ROSLIB.ServiceRequest({
  left_hz: -400,
  right_hz: 400,
  duration_ms: 500
 }), function(result) {
  if(result.success) {
    console.log("turn left");
  }
});
}
var vel = new ROSLIB.Topic({
  ros: ros,
  name: '/cmd_vel',
  messageType: 'geometry_msgs/Twist'
});
function forward() {
  var methodName = 'forward';
  if(stop() && action === methodName) return;
  action = methodName;
  pid = setInterval(function() {
    //update(car, context, canvas, methodName);
    vel.publish(new ROSLIB.Message({
      linear: {x: 10, y: 0, z: 0},
      angular: {x: 0, y: 0, z: 0}
    }));
  }, 100);
}
var action = null;
function stop() {
  if (pid) {
    clearInterval(pid);
    pid = null;
    return true;
  }
  return false;
}
function update(car, context, canvas, methodName) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  car[methodName]();
  car.show(context);
}
function move(methodName) {
  if(stop() && action === methodName) return;
  action = methodName;
  pid = setInterval(function() {
    update(car, context, canvas, methodName);
    vel.publish(new ROSLIB.Message(car.pubValues()));
  }, 100);
}
