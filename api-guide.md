# API Guide for Noolite-F javascript driver

## Table of contents

* [Sample use case](#sample-use-case)
* [Usage RemoteControl class](#usage-remotecontrol-class)
* [Usage Relay class](#usage-relay-class) 


## Sample use case
In this case you need turn on lamp in the hall after open the entry door. 

For implements this scenario you need :

* RemoteControl class for get event from door sensor
* Relay class for manage lamp
* Controller class for manage RemoteControl and Relay instances

### link device

First of all, you need perform bind command for link devices with MTRF64 adapter

### Create you own class for door sensor

After that you need create DoorSensors class and override two method onTurnOn() and onTurnOff()

### Register your DoorSensor in controller

Before run it, we need register door sensor in controller

### Simple run it!

You are ready for run very small smarthome system - open the serial port and open the door :-)



## Usage RemoteControl class

TO DO

## Usage Relay class 

TO DO