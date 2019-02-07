<a name="MTRF64Adapter"></a>

## MTRF64Adapter
**Kind**: Class 

Implement interface with MTRF64 Adapter

* [MTRF64Adapter](#MTRF64Adapter)
    * [new MTRF64Adapter(port, onSend, onReceive, parser)](#new_MTRF64Adapter_new)
    * [.send(command)](#MTRF64Adapter+send)
    * [.listen()](#MTRF64Adapter+listen)

<a name="new_MTRF64Adapter_new"></a>

### new MTRF64Adapter(port, onSend, onReceive, parser)
Constructor class


| Param | Type | Description |
| --- | --- | --- |
| port | <code>object</code> | Serial port object for send data to serial port |
| onSend | <code>function</code> | Callback after send packet. Internal use only |
| onReceive | <code>function</code> | Callback after receive packet. Internal use only |
| parser | <code>object</code> | Serial port object for read data from serial port |

<a name="MTRF64Adapter+send"></a>

### mtrF64Adapter.send(command)
Send MTRF64Command to serial port

**Kind**: instance method of [<code>MTRF64Adapter</code>](#MTRF64Adapter)  

| Param | Type |
| --- | --- |
| command | <code>MTRF64Command</code> | 

<a name="MTRF64Adapter+listen"></a>

### mtrF64Adapter.listen()
Open Adapter for receive packet. Do not use this method directly

**Kind**: instance method of [<code>MTRF64Adapter</code>](#MTRF64Adapter)  
