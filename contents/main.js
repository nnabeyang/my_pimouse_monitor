var ros = new ROSLIB.Ros({url: 'ws://' + location.hostname + ':9000'});

ros.on('connection', function() { console.log('websocket: connected')});
ros.on('error', function(error) { console.log('websocket: error: ', error)});
ros.on('close', function() { console.log('websocket: closed')});
var canvas = document.getElementById('stage');
var context = canvas.getContext('2d');
var width = canvas.width;
var height = canvas.height;
var pid = null;
var car = new Car(20, 30, {
  linear: 10,
  angular: 10
}, {
  x: 100,
  y: 100,
  angle: 30
});
var vel = new ROSLIB.Topic({
  ros: ros,
  name: '/cmd_vel',
  messageType: 'geometry_msgs/Twist'
});
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
console.log("on");
}
function switchOff() {
off.callService(new ROSLIB.ServiceRequest(), function(result) {
  if(result.success) {
    console.log("switch off");
  }
});
console.log("off");
}

function turn() {
  console.time('turn');
  var t = 0;
  pid = setInterval(function() {
    context.clearRect(0, 0, width, height);
    car.turnRight();
    car.show(context);
    t += 100;
    if(t == 1000) { 
      clearInterval(pid);
      pid = null;
    }
 
  }, 100);

 turnRight.callService(new ROSLIB.ServiceRequest({
left_hz: 400,
right_hz: -400,
duration_ms: 1000
 }), function(result) {
    console.timeEnd('turn');
  if(result.success) {
    console.log("turn right");
  }
});
console.log("turn");
}



car.show(context);
var action = null;
function stop() {
  if (pid) {
    clearInterval(pid);
    pid = null;
    return true;
  }
  return false;
}
function move(methodName) {
  if(stop() && action === methodName) return;
  action = methodName;
  pid = setInterval(function() {
    context.clearRect(0, 0, width, height);
    car[methodName]();
    car.show(context);
    vel.publish(new ROSLIB.Message(car.pubValues()));
  }, 100);
}

