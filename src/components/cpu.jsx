import Opcodes from "./opcodes";
class Timer{
 constructor(){
     this.value=0;
 }
 tick=()=> {
    if (this.value == 0)
        return;
    this.value--;
}
}
class Cpu{
    constructor(bus){
        this.bus=bus;
        this.registers=new Uint8Array(16);
        this.stack=new Uint16Array(16);
        this.PC=0x200;
        this.I=0;
        this.SP=0;
        this.opcode=0;
        this.st=new Timer();
        this.dt=new Timer();
        this.opcodes=new Opcodes(this);
        this.waitingForKey=false;
        this.config();
        this.restart();
        
    }
    config=()=> {
        this.opcodes.config();

    }
    restart=()=> {
        this.PC = 0x200;
        this.dt.value=0;
        this.st.value=0;
        this.SP=0;
        this.I=0;
        this.opcode=0;
        for (let i = 0; i < 16; i++) {
            this.registers[i] = 0;
        }
    }
    execute=()=> {
       
        if(!this.waitingForKey){
        let opcodePrefix = this.bus.ram.read(this.PC);
        let opcodeSuffix = this.bus.ram.read(this.PC + 1);
        //console.log("prefix suffix ",opcodePrefix,opcodePrefix)
        this.PC += 2;
        this.opcode = (opcodePrefix << 8) | opcodeSuffix;
    }
        let operationKey = this.opcodes.getOperationKey(this.opcode);
        if (this.opcodes.opcodesTable.has(operationKey)) {
            //console.log("opcode ",operationKey)
            let op = this.opcodes.opcodesTable.get(operationKey);
            op.operation();
        } else {
           // System.out.printf("such opcode is not supported! opcode:%X prefix:%X suffix:%X\n", opcode, opcodePrefix,
                    //opcodeSuffix);
           console.log("Error at cpu execute function")
        }

    }
}
 
export default Cpu;