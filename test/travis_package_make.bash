#!/bin/bash -xve
rsync -av --exclude='.git/' --exclude='.vagrant' ./ ~/catkin_ws/src/pimouse_run_corridor/
cd ~/catkin_ws/src/
git clone --depth=1 https://github.com/nnabeyang/pimouse_ros.git

cd ~/catkin_ws
catkin_make
