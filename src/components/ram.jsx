class Ram {
  constructor(bus) {
    this.bus=bus;
    this.mem = new Uint8Array(4096);
    this.config();
    
  }
  config() {
    //fill the mem with hex digits representations
    //0
    this.mem[0] = 0xf0;
    this.mem[1] = 0x90;
    this.mem[2] = 0x90;
    this.mem[3] = 0x90;
    this.mem[4] = 0xf0;
    //1
    this.mem[5] = 0x20;
    this.mem[6] = 0x60;
    this.mem[7] = 0x20;
    this.mem[8] = 0x20;
    this.mem[9] = 0x70;
    //2
    this.mem[10] = 0xf0;
    this.mem[11] = 0x10;
    this.mem[12] = 0xf0;
    this.mem[13] = 0x80;
    this.mem[14] = 0xf0;
    //3
    this.mem[15] = 0xf0;
    this.mem[16] = 0x10;
    this.mem[17] = 0xf0;
    this.mem[18] = 0x10;
    this.mem[19] = 0xf0;
    //4
    this.mem[20] = 0x90;
    this.mem[21] = 0x90;
    this.mem[22] = 0xf0;
    this.mem[23] = 0x10;
    this.mem[24] = 0x10;
    //5
    this.mem[25] = 0xf0;
    this.mem[26] = 0x80;
    this.mem[27] = 0xf0;
    this.mem[28] = 0x10;
    this.mem[29] = 0xf0;
    //6
    this.mem[30] = 0xf0;
    this.mem[31] = 0x80;
    this.mem[32] = 0xf0;
    this.mem[33] = 0x90;
    this.mem[34] = 0xf0;
    //7
    this.mem[35] = 0xf0;
    this.mem[36] = 0x10;
    this.mem[37] = 0x20;
    this.mem[38] = 0x40;
    this.mem[39] = 0x40;
    //8
    this.mem[40] = 0xf0;
    this.mem[41] = 0x90;
    this.mem[42] = 0xf0;
    this.mem[43] = 0x90;
    this.mem[44] = 0xf0;
    //9
    this.mem[45] = 0xf0;
    this.mem[46] = 0x90;
    this.mem[47] = 0xf0;
    this.mem[48] = 0x10;
    this.mem[49] = 0xf0;
    //A
    this.mem[50] = 0xf0;
    this.mem[51] = 0x90;
    this.mem[52] = 0xf0;
    this.mem[53] = 0x90;
    this.mem[54] = 0x90;
    //B
    this.mem[55] = 0xe0;
    this.mem[56] = 0x90;
    this.mem[57] = 0xe0;
    this.mem[58] = 0x90;
    this.mem[59] = 0xe0;
    //C
    this.mem[60] = 0xf0;
    this.mem[61] = 0x80;
    this.mem[62] = 0x80;
    this.mem[63] = 0x80;
    this.mem[64] = 0xf0;
    //D
    this.mem[65] = 0xe0;
    this.mem[66] = 0x90;
    this.mem[67] = 0x90;
    this.mem[68] = 0x90;
    this.mem[69] = 0xe0;
    //E
    this.mem[70] = 0xf0;
    this.mem[71] = 0x80;
    this.mem[72] = 0xf0;
    this.mem[73] = 0x80;
    this.mem[74] = 0xf0;
    //F
    this.mem[75] = 0xf0;
    this.mem[76] = 0x80;
    this.mem[77] = 0xf0;
    this.mem[78] = 0x80;
    this.mem[79] = 0x80;
  }
  write=(address,data)=>{
      if(address>=0&&address<4096)
      this.mem[address]=data;
  }
  read=(address)=>{
    if(address>=0&&address<4096)
    return this.mem[address];
}
  loadRam=(buffer)=> {
    let data =new Uint8Array(buffer);
    for(var i=0;i<data.length;i++){
       
        this.write(i+0x200,data[i]);
    }
    this.bus.ramLoaded();
  }

}

export default Ram;
