### Relay

Implement Relay device for Noolite-F protocol
**Copyright**: Pavel Tsytovich, 2019  


## Functions

<dl>
<dt><a href="#_convertColor">_convertColor(bright)</a></dt>
<dd><p>Convert from float to rgb color. Do not use this function directly</p>
</dd>
</dl>

<a name="Relay"></a>

## Relay
**Kind**: global class  

* [Relay](#Relay)
    * [new Relay(controller, channel, mode)](#new_Relay_new)
    * [._processCommand(cmd, ctr)](#Relay+_processCommand) ⇒ <code>boolean</code>
    * [.bind()](#Relay+bind) ⇒ <code>boolean</code>
    * [.unbind()](#Relay+unbind) ⇒ <code>boolean</code>
    * [.turnOn(ctr)](#Relay+turnOn) ⇒ <code>boolean</code>
    * [.turnOff(ctr)](#Relay+turnOff) ⇒ <code>boolean</code>
    * [.switch(ctr)](#Relay+switch) ⇒ <code>boolean</code>
    * [.brightDown(ctr)](#Relay+brightDown) ⇒ <code>boolean</code>
    * [.brightUp(ctr)](#Relay+brightUp) ⇒ <code>boolean</code>
    * [.setBrightness(brightness, ctr)](#Relay+setBrightness) ⇒ <code>boolean</code>
    * [.setColor(r, g, b, ctr)](#Relay+setColor) ⇒ <code>boolean</code>
    * [.loadPreset(ctr)](#Relay+loadPreset) ⇒ <code>boolean</code>
    * [.savePreset(ctr)](#Relay+savePreset) ⇒ <code>boolean</code>
    * [.stopReq(ctr)](#Relay+stopReq) ⇒ <code>boolean</code>
    * [.brightStepDown(step, ctr)](#Relay+brightStepDown) ⇒ <code>boolean</code>
    * [.brightStepUp(step, ctr)](#Relay+brightStepUp) ⇒ <code>boolean</code>
    * [.brightReq(direction, speed, ctr)](#Relay+brightReq) ⇒ <code>boolean</code>
    * [.rollColour(ctr)](#Relay+rollColour) ⇒ <code>boolean</code>
    * [.switchColour(crt)](#Relay+switchColour) ⇒ <code>boolean</code>
    * [.switchMode(ctr)](#Relay+switchMode) ⇒ <code>boolean</code>
    * [.speedModeBack(ctr)](#Relay+speedModeBack) ⇒ <code>boolean</code>
    * [.temporaryOn(time, ctr)](#Relay+temporaryOn) ⇒ <code>boolean</code>
    * [.readState(info, ctr)](#Relay+readState) ⇒ <code>\*</code>

<a name="new_Relay_new"></a>

### new Relay(controller, channel, mode)
Constructor


| Param | Type | Description |
| --- | --- | --- |
| controller | <code>MTRF64Controller</code> | controller for manage device |
| channel | <code>number</code> | device channel |
| mode | <code>NooliteDevice.Mode</code> | Noolite protocol mode |

<a name="Relay+_processCommand"></a>

### relay.\_processCommand(cmd, ctr) ⇒ <code>boolean</code>
Processing send command. Do bot use this method directly

**Kind**: instance method of [<code>Relay</code>](#Relay)  
**Returns**: <code>boolean</code> - - True if transation is completed, otherwise - false  

| Param | Type | Description |
| --- | --- | --- |
| cmd | <code>MTRF64Command</code> | sending command |
| ctr | <code>Relay.Command</code> | control flag parameter in Noolite-F protocol |

<a name="Relay+bind"></a>

### relay.bind() ⇒ <code>boolean</code>
Bind command for Relay device

**Kind**: instance method of [<code>Relay</code>](#Relay)  
**Returns**: <code>boolean</code> - - True if command successful, otherwise false  
<a name="Relay+unbind"></a>

### relay.unbind() ⇒ <code>boolean</code>
Unbind command for Relay device

**Kind**: instance method of [<code>Relay</code>](#Relay)  
**Returns**: <code>boolean</code> - - True if command successful, otherwise false  
<a name="Relay+turnOn"></a>

### relay.turnOn(ctr) ⇒ <code>boolean</code>
Turn on command for Relay device

**Kind**: instance method of [<code>Relay</code>](#Relay)  
**Returns**: <code>boolean</code> - - True if command successful, otherwise false  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ctr | <code>Relay.Command</code> | <code>0</code> | Broadcast mode |

<a name="Relay+turnOff"></a>

### relay.turnOff(ctr) ⇒ <code>boolean</code>
Turn off command for Relay device

**Kind**: instance method of [<code>Relay</code>](#Relay)  
**Returns**: <code>boolean</code> - - True if command successful, otherwise false  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ctr | <code>Relay.Command</code> | <code>0</code> | Broadcast mode |

<a name="Relay+switch"></a>

### relay.switch(ctr) ⇒ <code>boolean</code>
Switch command for Relay device

**Kind**: instance method of [<code>Relay</code>](#Relay)  
**Returns**: <code>boolean</code> - - True if command successful, otherwise false  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ctr | <code>Relay.Command</code> | <code>0</code> | Broadcast mode |

<a name="Relay+brightDown"></a>

### relay.brightDown(ctr) ⇒ <code>boolean</code>
Bright Down command

**Kind**: instance method of [<code>Relay</code>](#Relay)  
**Returns**: <code>boolean</code> - - True if command successful, otherwise false  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ctr | <code>Relay.Command</code> | <code>0</code> | Broadcast mode |

<a name="Relay+brightUp"></a>

### relay.brightUp(ctr) ⇒ <code>boolean</code>
Bright Up command

**Kind**: instance method of [<code>Relay</code>](#Relay)  
**Returns**: <code>boolean</code> - - True if command successful, otherwise false  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ctr | <code>Relay.Command</code> | <code>0</code> | Broadcast mode | 

<a name="Relay+setBrightness"></a>

### relay.setBrightness(brightness, ctr) ⇒ <code>boolean</code>
Set Brightness command

**Kind**: instance method of [<code>Relay</code>](#Relay)  
**Returns**: <code>boolean</code> - - True if command successful, otherwise false  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| brightness | <code>float</code> |  | Brightness. (from 0 to 1) |
| ctr | <code>Relay.Command</code> | <code>0</code> | Broadcast mode |

<a name="Relay+setColor"></a>

### relay.setColor(r, g, b, ctr) ⇒ <code>boolean</code>
Set Brightness command for RGB controller

**Kind**: instance method of [<code>Relay</code>](#Relay)  
**Returns**: <code>boolean</code> - - True if command successful, otherwise false  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| r | <code>float</code> |  | red colour |
| g | <code>float</code> |  | green colour |
| b | <code>float</code> |  | blue colour |
| ctr | <code>Relay.Command</code> | <code>0</code> | Broadcast mode |

<a name="Relay+loadPreset"></a>

### relay.loadPreset(ctr) ⇒ <code>boolean</code>
Load Preset command

**Kind**: instance method of [<code>Relay</code>](#Relay)  
**Returns**: <code>boolean</code> - - True if command successful, otherwise false  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ctr | <code>Relay.Command</code> | <code>0</code> | Broadcast mode |

<a name="Relay+savePreset"></a>

### relay.savePreset(ctr) ⇒ <code>boolean</code>
Save preset command

**Kind**: instance method of [<code>Relay</code>](#Relay)  
**Returns**: <code>boolean</code> - - True if command successful, otherwise false  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ctr | <code>Relay.Command</code> | <code>0</code> | Broadcast mode |

<a name="Relay+stopReq"></a>

### relay.stopReq(ctr) ⇒ <code>boolean</code>
Stop Req command

**Kind**: instance method of [<code>Relay</code>](#Relay)  
**Returns**: <code>boolean</code> - - True if command successful, otherwise false  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ctr | <code>Relay.Command</code> | <code>0</code> | Broadcast mode |

<a name="Relay+brightStepDown"></a>

### relay.brightStepDown(step, ctr) ⇒ <code>boolean</code>
Bright Step Down command

**Kind**: instance method of [<code>Relay</code>](#Relay)  
**Returns**: <code>boolean</code> - - True if command successful, otherwise false  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| step | <code>number</code> |  | step of brihtness down |
| ctr | <code>Relay.Command</code> | <code>0</code> | Broadcast mode |

<a name="Relay+brightStepUp"></a>

### relay.brightStepUp(step, ctr) ⇒ <code>boolean</code>
Brigth Step Up command

**Kind**: instance method of [<code>Relay</code>](#Relay)  
**Returns**: <code>boolean</code> - - True if command successful, otherwise false  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| step | <code>number</code> |  | step of brightness up |
| ctr | <code>Relay.Command</code> | <code>0</code> | Broadcast mode |

<a name="Relay+brightReq"></a>

### relay.brightReq(direction, speed, ctr) ⇒ <code>boolean</code>
Bright Req command

**Kind**: instance method of [<code>Relay</code>](#Relay)  
**Returns**: <code>boolean</code> - - True if command successful, otherwise false  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| direction | <code>Relay.Direction</code> |  | Direction of change brightness |
| speed | <code>float</code> |  | speed of change Brightness (from 0 to 1) |
| ctr | <code>Relay.Command</code> | <code>0</code> | Broadcast mode |

<a name="Relay+rollColour"></a>

### relay.rollColour(ctr) ⇒ <code>boolean</code>
Roll Colour command

**Kind**: instance method of [<code>Relay</code>](#Relay)  
**Returns**: <code>boolean</code> - - True if command successful, otherwise false  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ctr | <code>Relay.Command</code> | <code>0</code> | Broadcast mode |

<a name="Relay+switchColour"></a>

### relay.switchColour(crt) ⇒ <code>boolean</code>
Switch Colour command

**Kind**: instance method of [<code>Relay</code>](#Relay)  
**Returns**: <code>boolean</code> - - True if command successful, otherwise false  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| crt | <code>Relay.Command</code> | <code>0</code> | Broadcast mode |

<a name="Relay+switchMode"></a>

### relay.switchMode(ctr) ⇒ <code>boolean</code>
Switch Mode command

**Kind**: instance method of [<code>Relay</code>](#Relay)  
**Returns**: <code>boolean</code> - - True if command successful, otherwise false  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ctr | <code>Relay.Command</code> | <code>0</code> | Broadcast mode |

<a name="Relay+speedModeBack"></a>

### relay.speedModeBack(ctr) ⇒ <code>boolean</code>
Speed Mode Back command

**Kind**: instance method of [<code>Relay</code>](#Relay)  
**Returns**: <code>boolean</code> - - True if command successful, otherwise false  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ctr | <code>Relay.Command</code> | <code>0</code> | Broadcast mode |

<a name="Relay+temporaryOn"></a>

### relay.temporaryOn(time, ctr) ⇒ <code>boolean</code>
Temporary On command

**Kind**: instance method of [<code>Relay</code>](#Relay)  
**Returns**: <code>boolean</code> - - True if command successful, otherwise false  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| time | <code>integer</code> |  | time in 5 sec interval |
| ctr | <code>Relay.Command</code> | <code>0</code> | Broadcast mode |

<a name="Relay+readState"></a>

### relay.readState(info, ctr) ⇒ <code>\*</code>
Read State command

**Kind**: instance method of [<code>Relay</code>](#Relay)  
**Returns**: <code>\*</code> - - Object with fmt and data property if successful, otherwise - false  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| info | <code>number</code> | <code>0</code> | set info bit. (See Noolite-F protocol) |
| ctr | <code>Relay.Command</code> | <code>0</code> | Broadcast mode |

