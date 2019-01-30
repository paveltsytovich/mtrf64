"use strict"
require('mocha');
const chai = require('chai');
chai.should();
const expect = require('chai').expect;

const SerialPort = require('serialport/test');

const devPath = "/dev/ttyUSB112";


const RelayNooliteDevice = require('../RelayNooliteDevice');

const MTRF64Command = require('../MTRF64Command');
const MTRF64Adapter = require('../MTRF64Adapter');
