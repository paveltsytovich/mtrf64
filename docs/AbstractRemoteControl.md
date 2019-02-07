
## NooliteDevice

Implement Noolite Remote Control device
  
**Copyright**: Pavel Tsytovich, 2019  

## AbstractRemoteControl
**Kind**: global class  

* [AbstractRemoteControl](#AbstractRemoteControl)
    * [new AbstractRemoteControl(controller, channel, mode)](#new_AbstractRemoteControl_new)
    * [.bind()](#AbstractRemoteControl+bind) ⇒ <code>boolean</code>
    * [.unbind()](#AbstractRemoteControl+unbind) ⇒ <code>boolean</code>

<a name="new_AbstractRemoteControl_new"></a>

### new AbstractRemoteControl(controller, channel, mode)
Constuctor


| Param | Type | Description |
| --- | --- | --- |
| controller | <code>MTRF64Controller</code> | controller for manage device |
| channel | <code>number</code> | channel of device |
| mode | <code>Noolite.Mode.Noolite</code> \| <code>NooliteDevice.Mode.NooliteF</code> | Mode of Noolite-F protocol |

<a name="AbstractRemoteControl+bind"></a>

### abstractRemoteControl.bind() ⇒ <code>boolean</code>
Bind command for RemoteControl device

**Kind**: instance method of [<code>AbstractRemoteControl</code>](#AbstractRemoteControl)  
**Returns**: <code>boolean</code> - - True if bind is successul, otherwise - fail  
<a name="AbstractRemoteControl+unbind"></a>

### abstractRemoteControl.unbind() ⇒ <code>boolean</code>
Unbind command for RemoteControl device

**Kind**: instance method of [<code>AbstractRemoteControl</code>](#AbstractRemoteControl)  
**Returns**: <code>boolean</code> - - True if bind is successul, otherwise - fail  
<a name="NooliteDevice"></a>


