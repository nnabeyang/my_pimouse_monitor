#!/bin/bash
rm -rf ~/catkin_ws/src/pimouse_ros
bash -xve ./test/travis_package_make.bash
source ~/catkin_ws/devel/setup.bash
bash -xve ./test/travis_prepare_dummy_files.bash
rostest pimouse_monitor pimouse_monitor.launch
