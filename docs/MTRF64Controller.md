## Functions

<dl>
<dt><a href="#_fireReceive">_fireReceive(registry, command)</a></dt>
<dd><p>Internal function for handle answer from serial port. Do not use directly</p>
</dd>
</dl>

<a name="MTRF64Controller"></a>

## MTRF64Controller

class for implement MTRF64 Controller for send and receive noolite-F command

**Kind**: global class  

* [MTRF64Controller](#MTRF64Controller)
    * [new MTRF64Controller(port, parser)](#new_MTRF64Controller_new)
    * [._onSend(command)](#MTRF64Controller+_onSend)
    * [._onReceive(command)](#MTRF64Controller+_onReceive)
    * [.send(device, command, ack)](#MTRF64Controller+send)
    * [.register(device)](#MTRF64Controller+register)

<a name="new_MTRF64Controller_new"></a>

### new MTRF64Controller(port, parser)
Constructor of class


| Param | Type | Description |
| --- | --- | --- |
| port | <code>Object</code> | The `SerialPort` object for sending data to serial port |
| parser | <code>Object</code> | The `SerialPort` object for receive data from serial port |

<a name="MTRF64Controller+_onSend"></a>

### mtrF64Controller.\_onSend(command)
Callback method for internal use only. Do not use directly

**Kind**: instance method of [<code>MTRF64Controller</code>](#MTRF64Controller)  

| Param | Type | Description |
| --- | --- | --- |
| command | <code>MTRF64Command</code> | MTRF64 answer command |

<a name="MTRF64Controller+_onReceive"></a>

### mtrF64Controller.\_onReceive(command)
Callback method after receive some answer from serial port. Internal use only

**Kind**: instance method of [<code>MTRF64Controller</code>](#MTRF64Controller)  

| Param | Type |
| --- | --- |
| command | <code>MTRF64Command</code> | 

<a name="MTRF64Controller+send"></a>

### mtrF64Controller.send(device, command, ack)
Send command to adapter

**Kind**: instance method of [<code>MTRF64Controller</code>](#MTRF64Controller)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| device | <code>Object</code> |  | The Device that sends the command |
| command | <code>MTRF64Command</code> |  | Command from device |
| ack | <code>boolean</code> | <code>true</code> | Does the method need to wait for response to the command? |

<a name="MTRF64Controller+register"></a>

### mtrF64Controller.register(device)
Register device in controller

**Kind**: instance method of [<code>MTRF64Controller</code>](#MTRF64Controller)  

| Param | Type |
| --- | --- |
| device | <code>AbstractRemoteControl</code> | 

## \_fireReceive(registry, command)
Internal function for handle answer from serial port. Do not use directly

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| registry | <code>Array</code> | registry of sending device objects |
| command | <code>MTRF64Command</code> | received command from serial port |

