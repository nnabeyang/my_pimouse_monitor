var ros = new ROSLIB.Ros({url: 'ws://' + location.hostname + ':9000'});

ros.on('connection', function() { console.log('websocket: connected')});
ros.on('error', function(error) { console.log('websocket: error: ', error)});
ros.on('close', function() { console.log('websocket: closed')});

var ls = new ROSLIB.Topic({
  ros: ros,
  name: '/lightsensors',
  messageType: 'pimouse_ros/LightSensorValues'
});
var on = new ROSLIB.Service({
  ros: ros,
  name: '/motor_on',
  messageType: 'std_srvs/Trigger'
});
var off = new ROSLIB.Service({
  ros: ros,
  name: '/motor_off',
  messageType: 'std_srvs/Trigger'
});

$('#motor_on').on('click', function(e) {
  on.callService(ROSLIB.ServiceRequest(), function(result) {
    if(result.success) {
      console.log("switch on");
    }
  });
});

$('#motor_off').on('click', function(e) {
  off.callService(ROSLIB.ServiceRequest(), function(result) {
    if(result.success) {
      console.log("switch off");
    }
  });
});
// motor
var vel = new ROSLIB.Topic({
  ros: ros,
  name: '/cmd_vel',
  messageType: 'geometry_msgs/Twist'
});

function pubMotorValues() {
  var fw = parseInt($('#vel_fw').val()) * 0.001;
  var rot = Math.PI * parseInt($('#vel_rot').val())/ 180;
  var v = new ROSLIB.Message({
    linear: {x: fw, y:0, z:0},
    angular: {x: 0, y: 0, z: rot}
    });
  vel.publish(v);
}
var pid = null;
$('#touchmotion').on('click', function() {
 if(!pid) {
   pid = setInterval(pubMotorValues, 100);          
  console.log(`move on ${pid}`);
 } else {
  clearInterval(pid);
  pid = null;
  console.log("stopped");
 } 
});
