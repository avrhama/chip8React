class Opcodes {
  constructor(cpu) {
    this.cpu = cpu;
    this.opcodesTable = new Map();
  }
  config() {
    this.opcodesTable.set("0.0", { name: "op0nnn", operation: this.op0nnn });
    this.opcodesTable.set("0.1", { name: "op00E0", operation: this.op00E0 });
    this.opcodesTable.set("0.2", { name: "op00EE", operation: this.op00EE });

    this.opcodesTable.set("1", { name: "op1nnn", operation: this.op1nnn });
    this.opcodesTable.set("2", { name: "op2nnn", operation: this.op2nnn });
    this.opcodesTable.set("3", { name: "op3xkk", operation: this.op3xkk });
    this.opcodesTable.set("4", { name: "op4xkk", operation: this.op4xkk });
    this.opcodesTable.set("5", { name: "op5xy0", operation: this.op5xy0 });
    this.opcodesTable.set("6", { name: "op6xkk", operation: this.op6xkk });
    this.opcodesTable.set("7", { name: "op7xkk", operation: this.op7xkk });

    this.opcodesTable.set("8.0", { name: "op8xy0", operation: this.op8xy0 });
    this.opcodesTable.set("8.1", { name: "op8xy1", operation: this.op8xy1 });
    this.opcodesTable.set("8.2", { name: "op8xy2", operation: this.op8xy2 });
    this.opcodesTable.set("8.3", { name: "op8xy3", operation: this.op8xy3 });
    this.opcodesTable.set("8.4", { name: "op8xy4", operation: this.op8xy4 });
    this.opcodesTable.set("8.5", { name: "op8xy5", operation: this.op8xy5 });
    this.opcodesTable.set("8.6", { name: "op8xy6", operation: this.op8xy6 });
    this.opcodesTable.set("8.7", { name: "op8xy7", operation: this.op8xy7 });
    this.opcodesTable.set("8.8", { name: "op8xyE", operation: this.op8xyE });

    this.opcodesTable.set("9", { name: "op9xy0", operation: this.op9xy0 });
    this.opcodesTable.set("A", { name: "opAnnn", operation: this.opAnnn });
    this.opcodesTable.set("B", { name: "opBnnn", operation: this.opBnnn });
    this.opcodesTable.set("C", { name: "opCxkk", operation: this.opCxkk });
    this.opcodesTable.set("D", { name: "opDxyn", operation: this.opDxyn });

    this.opcodesTable.set("E.0", { name: "opEx9E", operation: this.opEx9E });
    this.opcodesTable.set("E.1", { name: "opExA1", operation: this.opExA1 });

    this.opcodesTable.set("F.0", { name: "opFx07", operation: this.opFx07 });
    this.opcodesTable.set("F.1", { name: "opFx0A", operation: this.opFx0A });
    this.opcodesTable.set("F.2", { name: "opFx15", operation: this.opFx15 });
    this.opcodesTable.set("F.3", { name: "opFx18", operation: this.opFx18 });
    this.opcodesTable.set("F.4", { name: "opFx1E", operation: this.opFx1E });
    this.opcodesTable.set("F.5", { name: "opFx29", operation: this.opFx29 });
    this.opcodesTable.set("F.6", { name: "opFx33", operation: this.opFx33 });
    this.opcodesTable.set("F.7", { name: "opFx55", operation: this.opFx55 });
    this.opcodesTable.set("F.8", { name: "opFx65", operation: this.opFx65 });
  }
getOperationKey(opcode) {
    let prefix = opcode >> 12;
    if (prefix != 0 && prefix != 8 && prefix != 0xe && prefix != 0xf)
        return prefix.toString(16).toUpperCase();
    let s;
    switch (prefix) {
        case 0:
            s = opcode & 0xff;
            if (s === 0xe0) {
                return "0.1";
            } else if (s === 0xee) {
                return "0.2";
            }
            return "0.0";
        case 8:
            s = opcode & 0x0f;
            if (s === 1) {
                return "8.1";
            } else if (s === 2) {
                return "8.2";
            } else if (s === 3) {
                return "8.3";
            } else if (s === 4) {
                return "8.4";
            } else if (s === 5) {
                return "8.5";
            } else if (s === 6) {
                return "8.6";
            } else if (s === 7) {
                return "8.7";
            } else if (s === 0xe) {
                return "8.8";
            }
            return "8.0";
        case 0xe:
            s = opcode & 0xff;
            if (s === 0xa1) {
                return "E.1";
            }
            return "E.0";
        case 0xf:
            s = opcode & 0xff;
            if (s === 0x0a) {
                return "F.1";
            } else if (s === 0x15) {
                return "F.2";
            } else if (s === 0x18) {
                return "F.3";
            } else if (s === 0x1e) {
                return "F.4";
            } else if (s === 0x29) {
                return "F.5";
            } else if (s === 0x33) {
                return "F.6";
            } else if (s === 0x55) {
                return "F.7";
            } else if (s === 0x65) {
                return "F.8";
            }
            return "F.0";

    }
}

  getnnn(v) {
    return v & 0xfff;
  }
  getn(v) {
    return v & 0xf;
  }
  getx(v) {
    return (v>>8) & 0xf;
  }
  gety(v) {
    return (v>>4) & 0xf;
  }
  getkk(v) {
    return v & 0xff;
  }


  op0nnn = () => {
    console.log("if op0nnn called, its Error");
  };

/*
00E0 - CLS
Clear the display.
*/
op00E0=()=> {
	this.cpu.bus.display.current.clear()
}

/*
00EE - RET
Return from a subroutine.
The interpreter sets the program counter to the address at the top of the stack, then subtracts 1 from the stack pointer.
*/
op00EE=()=> {
	this.cpu.PC = this.cpu.stack[this.cpu.SP];
	this.cpu.SP--;
}
/*
1nnn - JP addr
Jump to location nnn.
The interpreter sets the program counter to nnn.
*/
op1nnn=()=> {
	let nnn = this.getnnn(this.cpu.opcode)
	this.cpu.PC = nnn
}
/*
2nnn - CALL addr
Call subroutine at nnn.
The interpreter increments the stack pointer, then puts the current PC on the top of the stack. The PC is then set to nnn.
*/
op2nnn=()=> {
	let nnn = this.getnnn(this.cpu.opcode)
	this.cpu.SP++
	this.cpu.stack[this.cpu.SP] = this.cpu.PC
	this.cpu.PC = nnn
}



/*
3xkk - SE Vx, byte
Skip next instruction if Vx = kk.
The interpreter compares register Vx to kk, and if they are equal, increments the program counter by 2.
*/
op3xkk=()=>{
	let x = this.getx(this.cpu.opcode)
	let kk = this.getkk(this.cpu.opcode)
	if (this.cpu.registers[x] === kk) {
		this.cpu.PC += 2
	}
}

/*
4xkk - SNE Vx, byte
Skip next instruction if Vx != kk.
The interpreter compares register Vx to kk, and if they are not equal, increments the program counter by 2.
*/
op4xkk=()=>{
	let x = this.getx(this.cpu.opcode)
	let kk = this.getkk(this.cpu.opcode)
	if(this.cpu.registers[x] != kk) {
		this.cpu.PC += 2;
	}
}

/*
5xy0 - SE Vx, Vy
Skip next instruction if Vx = Vy.
The interpreter compares register Vx to register Vy, and if they are equal, increments the program counter by 2.
*/
op5xy0=()=>{
	let x = this.getx(this.cpu.opcode)
	let y = this.gety(this.cpu.opcode)
	if (this.cpu.registers[x] === this.cpu.registers[y]) {
		this.cpu.PC += 2
	}
}

/*
6xkk - LD Vx, byte
Set Vx = kk.
The interpreter puts the value kk into register Vx.
*/
op6xkk=()=>{
	let x = this.getx(this.cpu.opcode)
	let kk = this.getkk(this.cpu.opcode)
	this.cpu.registers[x] = kk
}

/*
7xkk - ADD Vx, byte
Set Vx = Vx + kk.
Adds the value kk to the value of register Vx, then stores the result in Vx.
*/
op7xkk=()=>{
	let x = this.getx(this.cpu.opcode)
	let kk = this.getkk(this.cpu.opcode)
	this.cpu.registers[x] += kk
}

/*
8xy0 - LD Vx, Vy
Set Vx = Vy.
Stores the value of register Vy in register Vx.
*/
op8xy0=()=>{
	let x = this.getx(this.cpu.opcode)
	let y = this.gety(this.cpu.opcode)
	this.cpu.registers[x] = this.cpu.registers[y]
}

/*
8xy1 - OR Vx, Vy
Set Vx = Vx OR Vy.
Performs a bitwise OR on the values of Vx and Vy, then stores the result in Vx. A bitwise OR compares the corrseponding bits from two values, and if either bit is 1, then the same bit in the result is also 1. Otherwise, it is 0.
*/
op8xy1=()=>{
	let x = this.getx(this.cpu.opcode)
	let y = this.gety(this.cpu.opcode)
	this.cpu.registers[x] = this.cpu.registers[x] | this.cpu.registers[y]
}

/*
8xy2 - AND Vx, Vy
Set Vx = Vx AND Vy.
Performs a bitwise AND on the values of Vx and Vy, then stores the result in Vx. A bitwise AND compares the corrseponding bits from two values, and if both bits are 1, then the same bit in the result is also 1. Otherwise, it is 0.
*/
op8xy2=()=>{
	let x = this.getx(this.cpu.opcode)
	let y = this.gety(this.cpu.opcode)
	this.cpu.registers[x] = this.cpu.registers[x] & this.cpu.registers[y]
}

/*
8xy3 - XOR Vx, Vy
Set Vx = Vx XOR Vy.
Performs a bitwise exclusive OR on the values of Vx and Vy, then stores the result in Vx. An exclusive OR compares the corrseponding bits from two values, and if the bits are not both the same, then the corresponding bit in the result is set to 1. Otherwise, it is 0.
*/
op8xy3=()=>{
	let x = this.getx(this.cpu.opcode)
	let y = this.gety(this.cpu.opcode)
	this.cpu.registers[x] = this.cpu.registers[x] ^ this.cpu.registers[y]
}

/*
8xy4 - ADD Vx, Vy
Set Vx = Vx + Vy, set VF = carry.
The values of Vx and Vy are added together. If the result is greater than 8 bits (i.e., > 255,) VF is set to 1, otherwise 0. Only the lowest 8 bits of the result are kept, and stored in Vx.
*/
op8xy4=()=>{
	let x = this.getx(this.cpu.opcode)
	let y = this.gety(this.cpu.opcode)
	let res =this.cpu.registers[x] + this.cpu.registers[y];
	this.cpu.registers[x] = this.cpu.registers[x] + this.cpu.registers[y]

	if (res > 255) {
		this.cpu.registers[0xf] = 1
	} else {
		this.cpu.registers[0xf] = 0
	}
}

/*
8xy5 - SUB Vx, Vy
Set Vx = Vx - Vy, set VF = NOT borrow.
If Vx > Vy, then VF is set to 1, otherwise 0. Then Vy is subtracted from Vx, and the results stored in Vx.
*/
op8xy5=()=>{
	let x = this.getx(this.cpu.opcode)
	let y = this.gety(this.cpu.opcode)
	if (this.cpu.registers[x] > this.cpu.registers[y]) {
		this.cpu.registers[0xf] = 1
	} else {
		this.cpu.registers[0xf] = 0
	}
	this.cpu.registers[x] = this.cpu.registers[x] - this.cpu.registers[y]
}

/*
8xy6 - SHR Vx {, Vy}
Set Vx = Vx SHR 1.
If the least-significant bit of Vx is 1, then VF is set to 1, otherwise 0. Then Vx is divided by 2.
*/
op8xy6=()=>{
	let x = this.getx(this.cpu.opcode)
	this.cpu.registers[0xf] = this.cpu.registers[x] & 1
	this.cpu.registers[x] = this.cpu.registers[x] >> 1
}

/*
8xy7 - SUBN Vx, Vy
Set Vx = Vy - Vx, set VF = NOT borrow.
If Vy > Vx, then VF is set to 1, otherwise 0. Then Vx is subtracted from Vy, and the results stored in Vx.
*/
op8xy7=()=>{
	let x = this.getx(this.cpu.opcode)
	let y = this.gety(this.cpu.opcode)
	if (this.cpu.registers[y] > this.cpu.registers[x]) {
		this.cpu.registers[0xf] = 1
	} else {
		this.cpu.registers[0xf] = 0
	}
	this.cpu.registers[x] = this.cpu.registers[y] - this.cpu.registers[x]
}

/*
8xyE - SHL Vx {, Vy}
Set Vx = Vx SHL 1.
If the most-significant bit of Vx is 1, then VF is set to 1, otherwise to 0. Then Vx is multiplied by 2.
*/
op8xyE=()=>{
	let x = this.getx(this.cpu.opcode)
	this.cpu.registers[0xf] = this.cpu.registers[x] >> 7
	this.cpu.registers[x] = this.cpu.registers[x] << 1
}

/*
9xy0 - SNE Vx, Vy
Skip next instruction if Vx != Vy.
The values of Vx and Vy are compared, and if they are not equal, the program counter is increased by 2.
*/
op9xy0=()=>{
	let x = this.getx(this.cpu.opcode)
	let y = this.gety(this.cpu.opcode)
	if (this.cpu.registers[x] != this.cpu.registers[y]) {
		this.cpu.PC += 2
	}
}

/*
Annn - LD I, addr
Set I = nnn.
The value of register I is set to nnn.
*/
opAnnn=()=>{
	let nnn = this.getnnn(this.cpu.opcode)
	this.cpu.I = nnn
}

/*
Bnnn - JP V0, addr
Jump to location nnn + V0.
The program counter is set to nnn plus the value of V0.
*/
opBnnn=()=>{
	let nnn = this.getnnn(this.cpu.opcode)
	this.cpu.PC = this.cpu.registers[0] + nnn
}

/*
Cxkk - RND Vx, byte
Set Vx = random byte AND kk.
The interpreter generates a random number from 0 to 255, which is then ANDed with the value kk. The results are stored in Vx. See instruction 8xy2 for more information on AND.
*/
opCxkk=()=>{
	let x = this.getx(this.cpu.opcode)
    let kk = this.getkk(this.cpu.opcode)
	let t = Math.floor(Math.random() * 256); 
	this.cpu.registers[x] = kk & t
}

/*
Dxyn - DRW Vx, Vy, nibble
Display n-byte sprite starting at memory location I at (Vx, Vy), set VF = collision.
The interpreter reads n bytes from memory, starting at the address stored in I. These bytes are then displayed as sprites on screen at coordinates (Vx, Vy). Sprites are XORed onto the existing screen. If this causes any pixels to be erased, VF is set to 1, otherwise it is set to 0. If the sprite is positioned so part of it is outside the coordinates of the display, it wraps around to the opposite side of the screen. See instruction 8xy3 for more information on XOR, and section 2.4, Display, for more information on the Chip-8 screen and sprites.
*/
opDxyn=()=>{
    let display=this.cpu.bus.display.current;
	let n  =this.getn(this.cpu.opcode);
	let x = this.getx(this.cpu.opcode)
	let y = this.gety(this.cpu.opcode)
	let posX = this.cpu.registers[x]
	let posY = this.cpu.registers[y]
	this.cpu.registers[0xf] = 0;
	for (let i = 0; i < n; i++ ){
		let data = this.cpu.bus.ram.read(this.cpu.I + i);
		//pointer to the curr pixel(bit) in the data
		let stepPixel = 7;
		posY = posY % display.height
		for (; stepPixel >= 0; stepPixel-- ){
			let newPixelBit = (data >> stepPixel) & 0x1;
			if (newPixelBit === 1) {

				var currPosX = posX + (7 - stepPixel)
				currPosX = currPosX % display.width

				let currColorIndex = display.getPixel(currPosX, posY).colorIndex;
				//indecates if the curr present pixel is black pixel or not
               let oldPixelBit = 0
                //although this is monochrome display, the colors dont have to be  white and black
				if (currColorIndex!=0) {
					oldPixelBit = 1
				}

				//check if there is collision
				if ((oldPixelBit+newPixelBit) === 2) {
					this.cpu.registers[0xf] = 1
                }
                //TODO
				let colorIndex =  0;

				if ((oldPixelBit ^ newPixelBit) === 1) {
					colorIndex = 1;
                    

				}
				display.setPixel(currPosX, posY, colorIndex)
			}

		}
		posY++
	}
}


/*
Ex9E - SKP Vx
Skip next instruction if key with the value of Vx is pressed.
Checks the keyboard, and if the key corresponding to the value of Vx is currently in the down position, PC is increased by 2.
*/

opEx9E=()=>{
	let x = this.getx(this.cpu.opcode)
	let keyCode = this.cpu.bus.joypad.current.getKeyCode(this.cpu.registers[x]);
	if(this.cpu.bus.joypad.current.keys.get(keyCode).pressed) {
		this.cpu.PC = this.cpu.PC + 2
	}
}

/*
ExA1 - SKNP Vx
Skip next instruction if key with the value of Vx is not pressed.
Checks the keyboard, and if the key corresponding to the value of Vx is currently in the up position, PC is increased by 2.
*/
opExA1=()=>{
	let x = this.getx(this.cpu.opcode)
    let keyCode = this.cpu.bus.joypad.current.getKeyCode(this.cpu.registers[x]);
    
	if (!this.cpu.bus.joypad.current.keys.get(keyCode).pressed) {
		this.cpu.PC = this.cpu.PC + 2
	}
}

/*
Fx07 - LD Vx, DT
Set Vx = delay timer value.
The value of DT is placed into Vx.
*/
opFx07=()=>{
	let x = this.getx(this.cpu.opcode)
    this.cpu.registers[x] = this.cpu.dt.value
   
}

/*
Fx0A - LD Vx, K
Wait for a key press, store the value of the key in Vx.
All execution stops until a key is pressed, then the value of that key is stored in Vx.
*/
opFx0A=()=>{
    if(!this.cpu.waitingForKey){
        this.cpu.waitingForKey=true;
    }
    let x = this.getx(this.cpu.opcode)
   

        if(this.cpu.bus.joypad.current.pressedKey!=undefined){
        this.cpu.registers[x] = this.cpu.bus.joypad.current.pressedKey.value;
        this.cpu.waitingForKey=false;
        this.cpu.bus.joypad.current.pressedKey=undefined;
    }
}

/*
Fx15 - LD DT, Vx
Set delay timer = Vx.
DT is set equal to the value of Vx.
*/
opFx15=()=>{
	let x = this.getx(this.cpu.opcode)
	this.cpu.dt.value = this.cpu.registers[x]
}

/*
Fx18 - LD ST, Vx
Set sound timer = Vx.
ST is set equal to the value of Vx.
*/
opFx18=()=>{
	let x = this.getx(this.cpu.opcode)
	this.cpu.st.value = this.cpu.registers[x]
}

/*
Fx1E - ADD I, Vx
Set I = I + Vx.
The values of I and Vx are added, and the results are stored in I.
*/
opFx1E=()=>{
	let x = this.getx(this.cpu.opcode)
	this.cpu.I = this.cpu.I + this.cpu.registers[x]
}

/*
Fx29 - LD F, Vx
Set I = location of sprite for digit Vx.
The value of I is set to the location for the hexadecimal sprite corresponding to the value of Vx. See section 2.4, Display, for more information on the Chip-8 hexadecimal font.
*/
opFx29=()=>{
	let x = this.getx(this.cpu.opcode)
	this.cpu.I = 5 * this.cpu.registers[x]

}

/*
Fx33 - LD B, Vx
Store BCD representation of Vx in memory locations I, I+1, and I+2.
The interpreter takes the decimal value of Vx, and places the hundreds digit in memory at location in I, the tens digit at location I+1, and the ones digit at location I+2.
*/
opFx33=()=>{
	let x = this.getx(this.cpu.opcode);
	let v = this.cpu.registers[x];
	let o = v % 10;
	v = v / 10;
	let t = v % 10;
	v = v / 10;
	let h = v % 10;

	this.cpu.bus.ram.write(this.cpu.I, h)
	this.cpu.bus.ram.write(this.cpu.I+1, t)
	this.cpu.bus.ram.write(this.cpu.I+2, o)

}

/*
Fx55 - LD [I], Vx
Store registers V0 through Vx in memory starting at location I.
The interpreter copies the values of registers V0 through Vx into memory, starting at the address in I.
*/
opFx55=()=>{
	let x = this.getx(this.cpu.opcode);
	for(let i = 0; i <= x; i++) {
		this.cpu.bus.ram.write(this.cpu.I+i, this.cpu.registers[i])
	}
	this.cpu.I = this.cpu.I + x + 1
}

/*
Fx65 - LD Vx, [I]
Read registers V0 through Vx from memory starting at location I.
The interpreter reads values from memory starting at location I into registers V0 through Vx.
*/
opFx65=()=>{
	let x = this.getx(this.cpu.opcode)
	for (let i = 0; i <= x; i++) {
		this.cpu.registers[i] = this.cpu.bus.ram.read(this.cpu.I + i)
	}
	this.cpu.I = this.cpu.I + x + 1
}













}
export default Opcodes;
