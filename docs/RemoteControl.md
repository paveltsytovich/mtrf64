## AbstractRemoteControl
Implement RemoteControl class for Noolite-F device

**Copyright**: Pavel Tsytovich, 2019  


<a name="RemoteControl"></a>

## RemoteControl
**Kind**: global class  

* [RemoteControl](#RemoteControl)
    * [new RemoteControl(controller, channel, mode)](#new_RemoteControl_new)
    * [.onCommand(command)](#RemoteControl+onCommand)
    * [.onTurnOn()](#RemoteControl+onTurnOn)
    * [.onTurnOff()](#RemoteControl+onTurnOff)
    * [.onBrightDown()](#RemoteControl+onBrightDown)
    * [.onBrightUp()](#RemoteControl+onBrightUp)
    * [.onExecuteScenario()](#RemoteControl+onExecuteScenario)
    * [.onSaveScenario()](#RemoteControl+onSaveScenario)
    * [.onStopReq()](#RemoteControl+onStopReq)
    * [.onRollColour()](#RemoteControl+onRollColour)
    * [.onSwitchColour()](#RemoteControl+onSwitchColour)
    * [.onSwitchMode()](#RemoteControl+onSwitchMode)
    * [.onSpeedBackMode()](#RemoteControl+onSpeedBackMode)
    * [.onSendState(data)](#RemoteControl+onSendState)
    * [.onSwitch()](#RemoteControl+onSwitch)
    * [.onBrightBack()](#RemoteControl+onBrightBack)
    * [.onLowBattery()](#RemoteControl+onLowBattery)
    * [.onSensTempHumi(data)](#RemoteControl+onSensTempHumi)

<a name="new_RemoteControl_new"></a>

### new RemoteControl(controller, channel, mode)
Constructor


| Param | Type | Description |
| --- | --- | --- |
| controller | <code>MTRF64Controller</code> | controller for manage device |
| channel | <code>number</code> | channel of device |
| mode | <code>NooliteDevice.Mode</code> | Noolite protocol mode |

<a name="RemoteControl+onCommand"></a>

### remoteControl.onCommand(command)
Method for receive command handler. Do not use this method directly

**Kind**: instance method of [<code>RemoteControl</code>](#RemoteControl)  

| Param | Type |
| --- | --- |
| command | <code>MTRF64Command</code> | 

<a name="RemoteControl+onTurnOn"></a>

### remoteControl.onTurnOn()
Handle for `Turn On` command from remote control device

**Kind**: instance method of [<code>RemoteControl</code>](#RemoteControl)  
<a name="RemoteControl+onTurnOff"></a>

### remoteControl.onTurnOff()
Handle for `Turn Off` command from remote control device

**Kind**: instance method of [<code>RemoteControl</code>](#RemoteControl)  
<a name="RemoteControl+onBrightDown"></a>

### remoteControl.onBrightDown()
Handle for `Bright Down` command from remote control device

**Kind**: instance method of [<code>RemoteControl</code>](#RemoteControl)  
<a name="RemoteControl+onBrightUp"></a>

### remoteControl.onBrightUp()
Handle `Bright Up` command from remote control device

**Kind**: instance method of [<code>RemoteControl</code>](#RemoteControl)  
<a name="RemoteControl+onExecuteScenario"></a>

### remoteControl.onExecuteScenario()
Handle `Load Scenario` command from remote control device

**Kind**: instance method of [<code>RemoteControl</code>](#RemoteControl)  
<a name="RemoteControl+onSaveScenario"></a>

### remoteControl.onSaveScenario()
Handle `Save Scenario` command from remote control device

**Kind**: instance method of [<code>RemoteControl</code>](#RemoteControl)  
<a name="RemoteControl+onStopReq"></a>

### remoteControl.onStopReq()
Handle `Stop Req` command from remote control device

**Kind**: instance method of [<code>RemoteControl</code>](#RemoteControl)  
<a name="RemoteControl+onRollColour"></a>

### remoteControl.onRollColour()
Handle `Roll Colour` command from remote control device

**Kind**: instance method of [<code>RemoteControl</code>](#RemoteControl)  
<a name="RemoteControl+onSwitchColour"></a>

### remoteControl.onSwitchColour()
Handle `Switch Colour` command from remote control device

**Kind**: instance method of [<code>RemoteControl</code>](#RemoteControl)  
<a name="RemoteControl+onSwitchMode"></a>

### remoteControl.onSwitchMode()
Handle `Switch Mode` command from remote control device

**Kind**: instance method of [<code>RemoteControl</code>](#RemoteControl)  
<a name="RemoteControl+onSpeedBackMode"></a>

### remoteControl.onSpeedBackMode()
Handle `SpeedBack Mode` command from remote control device

**Kind**: instance method of [<code>RemoteControl</code>](#RemoteControl)  
<a name="RemoteControl+onSendState"></a>

### remoteControl.onSendState(data)
Handle `Send State` command from remote control device

**Kind**: instance method of [<code>RemoteControl</code>](#RemoteControl)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array</code> | Data array with device state |

<a name="RemoteControl+onSwitch"></a>

### remoteControl.onSwitch()
Handle `Switch` command from remote control device

**Kind**: instance method of [<code>RemoteControl</code>](#RemoteControl)  
<a name="RemoteControl+onBrightBack"></a>

### remoteControl.onBrightBack()
Handle `Bright Back` command from remote control device

**Kind**: instance method of [<code>RemoteControl</code>](#RemoteControl)  
<a name="RemoteControl+onLowBattery"></a>

### remoteControl.onLowBattery()
Handle `Low Battery` command from remote control device

**Kind**: instance method of [<code>RemoteControl</code>](#RemoteControl)  
<a name="RemoteControl+onSensTempHumi"></a>

### remoteControl.onSensTempHumi(data)
Handle `Sens TempHumi` command from remote control device

**Kind**: instance method of [<code>RemoteControl</code>](#RemoteControl)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array</code> | Data array with device state |

<a name="AbstractRemoteControl"></a>

