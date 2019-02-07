<a name="NooliteDevice"></a>

## NooliteDevice
**Kind**: global class  
**Copyright**: Pavel Tsytovich, 2019

Implement abstract class for Noolite device  

* [NooliteDevice](#NooliteDevice)
    * [new NooliteDevice(controller, channel, mode)](#new_NooliteDevice_new)
    * [.mode](#NooliteDevice+mode) ⇒ <code>Noolite.Mode.Noolite</code> \| <code>NooliteDevice.Mode.NooliteF</code>
    * [.channel](#NooliteDevice+channel)
    * [.onCommand(command)](#NooliteDevice+onCommand)
    * [._onSend(command)](#NooliteDevice+_onSend)
    * [._processTransaction(command)](#NooliteDevice+_processTransaction)
    * [.service()](#NooliteDevice+service)

<a name="new_NooliteDevice_new"></a>

### new NooliteDevice(controller, channel, mode)
Constructor


| Param | Type | Description |
| --- | --- | --- |
| controller | <code>MTRF64Controller</code> | The controller for manage device |
| channel | <code>number</code> | The channel of device |
| mode | <code>NooliteDevice.Mode</code> | Mode of Noolite-F protocol |

<a name="NooliteDevice+mode"></a>

### nooliteDevice.mode ⇒ <code>Noolite.Mode.Noolite</code> \| <code>NooliteDevice.Mode.NooliteF</code>
Get mode property

**Kind**: instance property of [<code>NooliteDevice</code>](#NooliteDevice)  
<a name="NooliteDevice+channel"></a>

### nooliteDevice.channel
Get channel property

**Kind**: instance property of [<code>NooliteDevice</code>](#NooliteDevice)  
<a name="NooliteDevice+onCommand"></a>

### nooliteDevice.onCommand(command)
Support async methods in noolite-F command. Do not use this method directly

**Kind**: instance method of [<code>NooliteDevice</code>](#NooliteDevice)  

| Param | Type |
| --- | --- |
| command | <code>MTRF64Command</code> | 

<a name="NooliteDevice+_onSend"></a>

### nooliteDevice.\_onSend(command)
Support for testing after send command. Do not use this method directly

**Kind**: instance method of [<code>NooliteDevice</code>](#NooliteDevice)  

| Param | Type |
| --- | --- |
| command | <code>MTRF64Command</code> | 

<a name="NooliteDevice+_processTransaction"></a>

### nooliteDevice.\_processTransaction(command)
Support async transaction 'send->receive' for all noolite device. Do not use this method directly

**Kind**: instance method of [<code>NooliteDevice</code>](#NooliteDevice)  

| Param | Type |
| --- | --- |
| command | <code>MTRF64Command</code> | 

<a name="NooliteDevice+service"></a>

### nooliteDevice.service()
Send service command.
Not implemented in this version

**Kind**: instance method of [<code>NooliteDevice</code>](#NooliteDevice)  
