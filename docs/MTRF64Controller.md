## Classes

<dl>
<dt><a href="#MTRF64Controller">MTRF64Controller</a></dt>
<dd></dd>
</dl>

## Constants

<dl>
<dt><a href="#MTRF64Adapter">MTRF64Adapter</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#_fireReceive">_fireReceive(registry, command)</a></dt>
<dd><p>Internal function for handle answer from serial port. Do not use directly</p>
</dd>
</dl>

<a name="MTRF64Controller"></a>

## MTRF64Controller
**Kind**: global class  

- [Classes](#classes)
- [Constants](#constants)
- [Functions](#functions)
- [MTRF64Controller](#mtrf64controller)
  - [new MTRF64Controller(port, parser, onSend)](#new-mtrf64controllerport-parser-onsend)
  - [mtrF64Controller.lastReceivedCommand](#mtrf64controllerlastreceivedcommand)
  - [mtrF64Controller.\_onSend(command)](#mtrf64controlleronsendcommand)
  - [mtrF64Controller.\_onReceive(command)](#mtrf64controlleronreceivecommand)
  - [mtrF64Controller.\_internalReceivePacketHandler(command)](#mtrf64controllerinternalreceivepackethandlercommand)
  - [mtrF64Controller.send(device, command, ack)](#mtrf64controllersenddevice-command-ack)
  - [mtrF64Controller.register(device)](#mtrf64controllerregisterdevice)
  - [mtrF64Controller.execUserCommand(command)](#mtrf64controllerexecusercommandcommand)
- [Global Function](#global-function)
- [\_fireReceive(registry, command)](#firereceiveregistry-command)

<a name="new_MTRF64Controller_new"></a>

### new MTRF64Controller(port, parser, onSend)
Constructor of class


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| port | <code>Object</code> |  | The `SerialPort` object for sending data to serial port |
| parser | <code>Object</code> |  | The `SerialPort` object for receive data from serial port |
| onSend | <code>Object</code> | <code></code> | The sender event handler (do not use directly, only for unit-test) |

<a name="MTRF64Controller+lastReceivedCommand"></a>

### mtrF64Controller.lastReceivedCommand
Get Last received command from input device

**Kind**: instance property of [<code>MTRF64Controller</code>](#MTRF64Controller)  
<a name="MTRF64Controller+_onSend"></a>

### mtrF64Controller.\_onSend(command)
Callback method for internal use only. Do not use directly

**Kind**: instance method of [<code>MTRF64Controller</code>](#MTRF64Controller)  

| Param | Type | Description |
| --- | --- | --- |
| command | <code>MTRF64Command</code> | MTRF64 answer command |

<a name="MTRF64Controller+_onReceive"></a>

### mtrF64Controller.\_onReceive(command)
Callback method for internal use only. Do not use directly

**Kind**: instance method of [<code>MTRF64Controller</code>](#MTRF64Controller)  

| Param | Type | Description |
| --- | --- | --- |
| command | <code>MTRF64Command</code> | MTRF64 received command |

<a name="MTRF64Controller+_internalReceivePacketHandler"></a>

### mtrF64Controller.\_internalReceivePacketHandler(command)
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

<a name="MTRF64Controller+execUserCommand"></a>

### mtrF64Controller.execUserCommand(command)
Send user defined command

**Kind**: instance method of [<code>MTRF64Controller</code>](#MTRF64Controller)  

| Param | Type | Description |
| --- | --- | --- |
| command | <code>Array.&lt;number&gt;</code> | array of bytes with Noolite-F command |

<a name="MTRF64Adapter"></a>

## Global Function 
## \_fireReceive(registry, command)
Internal function for handle answer from serial port. Do not use directly

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| registry | <code>Array</code> | registry of sending device objects |
| command | <code>MTRF64Command</code> | received command from serial port |

