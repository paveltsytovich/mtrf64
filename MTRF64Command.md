<a name="module_MTRF64Command"></a>

## MTRF64Command
**Copyright**: Pavel Tsytovich, 2019

Implement MTRF64 packet  

* [MTRF64Command](#module_MTRF64Command)
   * [new MTRF64Command(packet)](#new_module_MTRF64Command..MTRF64Command_new)
   * [.mode](#module_MTRF64Command..MTRF64Command+mode)
   * [.mode](#module_MTRF64Command..MTRF64Command+mode)
   * [.ch](#module_MTRF64Command..MTRF64Command+ch)
   * [.ch](#module_MTRF64Command..MTRF64Command+ch)
   * [.cmd](#module_MTRF64Command..MTRF64Command+cmd)
   * [.cmd](#module_MTRF64Command..MTRF64Command+cmd)
   * [.d](#module_MTRF64Command..MTRF64Command+d)
   * [.id](#module_MTRF64Command..MTRF64Command+id)
   * [.id](#module_MTRF64Command..MTRF64Command+id)
   * [.ctr](#module_MTRF64Command..MTRF64Command+ctr)
   * [.ctr](#module_MTRF64Command..MTRF64Command+ctr)
   * [.togl](#module_MTRF64Command..MTRF64Command+togl)
   * [.fmt](#module_MTRF64Command..MTRF64Command+fmt)
   * [.fmt](#module_MTRF64Command..MTRF64Command+fmt)
   * [.setData(n, value)](#module_MTRF64Command..MTRF64Command+setData)
   * [.buildPacket()](#module_MTRF64Command..MTRF64Command+buildPacket)
   * [._evaluteCrc()](#module_MTRF64Command..MTRF64Command+_evaluteCrc)

<a name="module_MTRF64Command..MTRF64Command"></a>


#### new MTRF64Command(packet)
Constructor class. if `packet` not undefined it use for create object


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| packet | <code>Array</code> | <code></code> | source packet |

<a name="module_MTRF64Command..MTRF64Command+mode"></a>

#### mtrF64Command.mode
Get mode property

**Kind**: instance property of [<code>MTRF64Command</code>](#module_MTRF64Command..MTRF64Command)  
<a name="module_MTRF64Command..MTRF64Command+mode"></a>

#### mtrF64Command.mode
Set mode property

**Kind**: instance property of [<code>MTRF64Command</code>](#module_MTRF64Command..MTRF64Command)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | mode value. Must be 0 or 2 |

<a name="module_MTRF64Command..MTRF64Command+ch"></a>

#### mtrF64Command.ch
Get channel property

**Kind**: instance property of [<code>MTRF64Command</code>](#module_MTRF64Command..MTRF64Command)  
<a name="module_MTRF64Command..MTRF64Command+ch"></a>

#### mtrF64Command.ch
Set channel property

**Kind**: instance property of [<code>MTRF64Command</code>](#module_MTRF64Command..MTRF64Command)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | channel of device |

<a name="module_MTRF64Command..MTRF64Command+cmd"></a>

#### mtrF64Command.cmd
Get command propery

**Kind**: instance property of [<code>MTRF64Command</code>](#module_MTRF64Command..MTRF64Command)  
<a name="module_MTRF64Command..MTRF64Command+cmd"></a>

#### mtrF64Command.cmd
Set command property

**Kind**: instance property of [<code>MTRF64Command</code>](#module_MTRF64Command..MTRF64Command)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | - |

<a name="module_MTRF64Command..MTRF64Command+d"></a>

#### mtrF64Command.d
Get data property

**Kind**: instance property of [<code>MTRF64Command</code>](#module_MTRF64Command..MTRF64Command)  
<a name="module_MTRF64Command..MTRF64Command+id"></a>

#### mtrF64Command.id
Get id property

**Kind**: instance property of [<code>MTRF64Command</code>](#module_MTRF64Command..MTRF64Command)  
<a name="module_MTRF64Command..MTRF64Command+id"></a>

#### mtrF64Command.id
Set id property

**Kind**: instance property of [<code>MTRF64Command</code>](#module_MTRF64Command..MTRF64Command)  

| Param | Description |
| --- | --- |
| value | must |

<a name="module_MTRF64Command..MTRF64Command+ctr"></a>

#### mtrF64Command.ctr
Get ctr byte property

**Kind**: instance property of [<code>MTRF64Command</code>](#module_MTRF64Command..MTRF64Command)  
<a name="module_MTRF64Command..MTRF64Command+ctr"></a>

#### mtrF64Command.ctr
Set ctr byte property

**Kind**: instance property of [<code>MTRF64Command</code>](#module_MTRF64Command..MTRF64Command)  

| Param | Type |
| --- | --- |
| value | <code>number</code> | 

<a name="module_MTRF64Command..MTRF64Command+togl"></a>

#### mtrF64Command.togl
Get togl byte propety

**Kind**: instance property of [<code>MTRF64Command</code>](#module_MTRF64Command..MTRF64Command)  
<a name="module_MTRF64Command..MTRF64Command+fmt"></a>

#### mtrF64Command.fmt
Set fmt byte property

**Kind**: instance property of [<code>MTRF64Command</code>](#module_MTRF64Command..MTRF64Command)  
<a name="module_MTRF64Command..MTRF64Command+fmt"></a>

#### mtrF64Command.fmt
Get fmt byte property

**Kind**: instance property of [<code>MTRF64Command</code>](#module_MTRF64Command..MTRF64Command)  
<a name="module_MTRF64Command..MTRF64Command+setData"></a>

#### mtrF64Command.setData(n, value)
Set block data

**Kind**: instance method of [<code>MTRF64Command</code>](#module_MTRF64Command..MTRF64Command)  

| Param | Type | Description |
| --- | --- | --- |
| n | <code>number</code> | index in data block |
| value | <code>number</code> | value of block data block |

<a name="module_MTRF64Command..MTRF64Command+buildPacket"></a>

#### mtrF64Command.buildPacket()
Build packet. This method is internal, not use it directly

**Kind**: instance method of [<code>MTRF64Command</code>](#module_MTRF64Command..MTRF64Command)  
<a name="module_MTRF64Command..MTRF64Command+_evaluteCrc"></a>

#### mtrF64Command.\_evaluteCrc()
Calculate control check sum. This method is internal, not use it directly

**Kind**: instance method of [<code>MTRF64Command</code>](#module_MTRF64Command..MTRF64Command)  
