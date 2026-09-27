const instructions = [
    { mnemonic: "mov r32, imm32", opcode: "B8 + rd" },
    { mnemonic: "mov r64, imm32", opcode: "B8 + rd" },
    { mnemonic: "mov r/m8, r8", opcode: "88 /r" },
    { mnemonic: "mov r/m16, r16", opcode: "89 /r" },
    { mnemonic: "mov r/m32, r32", opcode: "89 /r" },
    { mnemonic: "mov r/m64, r64", opcode: "48 89 /r" },

    { mnemonic: "mov r8, r/m8", opcode: "8A /r" },
    { mnemonic: "mov r16, r/m16", opcode: "8B /r" },
    { mnemonic: "mov r32, r/m32", opcode: "8B /r" },
    { mnemonic: "mov r64, r/m64", opcode: "48 8B /r" },

    { mnemonic: "mov r/m8, imm8", opcode: "C6 /0 ib" },
    { mnemonic: "mov r/m16, imm16", opcode: "C7 /0 iw" },
    { mnemonic: "mov r/m32, imm32", opcode: "C7 /0 id" },
    { mnemonic: "mov r/m64, imm32", opcode: "48 C7 /0 id" },

    { mnemonic: "mov r8, imm8", opcode: "B0 + rb" },
    { mnemonic: "mov r16, imm16", opcode: "B8 + rw" },
    { mnemonic: "mov r32, imm32", opcode: "B8 + rd" },
    { mnemonic: "mov r64, imm64", opcode: "48 B8 + rq" },

    { mnemonic: "mov r/m64, imm64", opcode: "48 C7 /0 id" },  // pseudo, imm64 = 8 bytes

    { mnemonic: "lea r16, r/m16", opcode: "8D /r" },
    { mnemonic: "lea r32, r/m32", opcode: "8D /r" },
    { mnemonic: "lea r64, r/m64", opcode: "48 8D /r" },

    { mnemonic: "push r64", opcode: "50 + rq" },
    { mnemonic: "push r/m64", opcode: "FF /6" },
    { mnemonic: "push imm8", opcode: "6A ib" },
    { mnemonic: "push imm32", opcode: "68 id" },

    { mnemonic: "pop r64", opcode: "58 + rq" },
    { mnemonic: "pop r/m64", opcode: "8F /0" },






    { mnemonic: "add r/m8, imm8", opcode: "80 /0 ib" },
    { mnemonic: "add r/m16, imm16", opcode: "81 /0 iw" },
    { mnemonic: "add r/m32, imm32", opcode: "81 /0 id" },
    { mnemonic: "add r/m64, imm32", opcode: "48 81 /0 id" },
    { mnemonic: "add r/m64, imm8", opcode: "48 83 /0 ib" },

    { mnemonic: "add r8, r/m8", opcode: "02 /r" },
    { mnemonic: "add r/m8, r8", opcode: "00 /r" },
    { mnemonic: "add r32, r/m32", opcode: "03 /r" },
    { mnemonic: "add r/m32, r32", opcode: "01 /r" },
    { mnemonic: "add r64, r/m64", opcode: "48 03 /r" },
    { mnemonic: "add r/m64, r64", opcode: "48 01 /r" },

    { mnemonic: "sub r/m8, imm8", opcode: "80 /5 ib" },
    { mnemonic: "sub r/m32, imm32", opcode: "81 /5 id" },
    { mnemonic: "sub r/m64, imm32", opcode: "48 81 /5 id" },
    { mnemonic: "sub r/m64, imm8", opcode: "48 83 /5 ib" },

    { mnemonic: "inc r/m8", opcode: "FE /0" },
    { mnemonic: "inc r/m16", opcode: "FF /0" },
    { mnemonic: "inc r/m32", opcode: "FF /0" },
    { mnemonic: "inc r/m64", opcode: "48 FF /0" },

    { mnemonic: "dec r/m8", opcode: "FE /1" },
    { mnemonic: "dec r/m16", opcode: "FF /1" },
    { mnemonic: "dec r/m32", opcode: "FF /1" },
    { mnemonic: "dec r/m64", opcode: "48 FF /1" },






    { mnemonic: "and r/m8, imm8",   opcode: "80 /4 ib" },
    { mnemonic: "and r/m16, imm16", opcode: "81 /4 iw" },
    { mnemonic: "and r/m32, imm32", opcode: "81 /4 id" },
    { mnemonic: "and r/m64, imm32", opcode: "48 81 /4 id" },
    { mnemonic: "and r/m16, imm8",  opcode: "83 /4 ib" },
    { mnemonic: "and r/m32, imm8",  opcode: "83 /4 ib" },
    { mnemonic: "and r/m64, imm8",  opcode: "48 83 /4 ib" },


    { mnemonic: "or r/m8, imm8", opcode: "80 /1 ib" },
    { mnemonic: "or r/m32, imm32", opcode: "81 /1 id" },
    { mnemonic: "or r/m64, imm32", opcode: "48 81 /1 id" },

    { mnemonic: "xor r/m8, imm8", opcode: "80 /6 ib" },
    { mnemonic: "xor r/m32, imm32", opcode: "81 /6 id" },
    { mnemonic: "xor r/m64, imm32", opcode: "48 81 /6 id" },
    { mnemonic: "xor r32, r32", opcode: "31 /r" },
    { mnemonic: "xor r/m64, r64", opcode: "48 31 /r" },

    { mnemonic: "test r/m8, imm8", opcode: "F6 /0 ib" },
    { mnemonic: "test r/m32, imm32", opcode: "F7 /0 id" },
    { mnemonic: "test r/m64, imm32", opcode: "48 F7 /0 id" },





    { mnemonic: "mul r/m8", opcode: "F6 /4" },
    { mnemonic: "mul r/m32", opcode: "F7 /4" },
    { mnemonic: "mul r/m64", opcode: "48 F7 /4" },

    { mnemonic: "imul r/m16", opcode: "0F AF /r" },
    { mnemonic: "imul r/m32", opcode: "0F AF /r" },
    { mnemonic: "imul r/m64", opcode: "48 0F AF /r" },

    { mnemonic: "div r/m8", opcode: "F6 /6" },
    { mnemonic: "div r/m32", opcode: "F7 /6" },
    { mnemonic: "div r/m64", opcode: "48 F7 /6" },




    { mnemonic: "shl r/m8, imm8", opcode: "C0 /4 ib" },
    { mnemonic: "shl r/m32, imm8", opcode: "C1 /4 ib" },
    { mnemonic: "shl r/m64, imm8", opcode: "48 C1 /4 ib" },

    { mnemonic: "shr r/m8, imm8", opcode: "C0 /5 ib" },
    { mnemonic: "shr r/m32, imm8", opcode: "C1 /5 ib" },
    { mnemonic: "shr r/m64, imm8", opcode: "48 C1 /5 ib" },

    { mnemonic: "sar r/m8, imm8", opcode: "C0 /7 ib" },
    { mnemonic: "sar r/m32, imm8", opcode: "C1 /7 ib" },
    { mnemonic: "sar r/m64, imm8", opcode: "48 C1 /7 ib" },

    { mnemonic: "rol r/m8, imm8", opcode: "C0 /0 ib" },
    { mnemonic: "rol r/m32, imm8", opcode: "C1 /0 ib" },
    { mnemonic: "rol r/m64, imm8", opcode: "48 C1 /0 ib" },

    { mnemonic: "ror r/m8, imm8", opcode: "C0 /1 ib" },
    { mnemonic: "ror r/m32, imm8", opcode: "C1 /1 ib" },
    { mnemonic: "ror r/m64, imm8", opcode: "48 C1 /1 ib" },






    { mnemonic: "jmp rel8", opcode: "EB cb" },
    { mnemonic: "jmp rel32", opcode: "E9 cd" },
    { mnemonic: "jmp r/m64", opcode: "FF /4" },

    { mnemonic: "call rel32", opcode: "E8 cd" },
    { mnemonic: "call r/m64", opcode: "FF /2" },
    { mnemonic: "call m", opcode: "FF /2" },

    { mnemonic: "ret", opcode: "C3" },
    { mnemonic: "ret imm16", opcode: "C2 iw" },





    { mnemonic: "jo rel8", opcode: "70 cb" },
    { mnemonic: "jno rel8", opcode: "71 cb" },
    { mnemonic: "jb rel8", opcode: "72 cb" },
    { mnemonic: "jnb rel8", opcode: "73 cb" },
    { mnemonic: "jz rel8", opcode: "74 cb" },
    { mnemonic: "jnz rel8", opcode: "75 cb" },
    { mnemonic: "jbe rel8", opcode: "76 cb" },
    { mnemonic: "ja rel8", opcode: "77 cb" },
    { mnemonic: "js rel8", opcode: "78 cb" },
    { mnemonic: "jns rel8", opcode: "79 cb" },
    { mnemonic: "jp rel8", opcode: "7A cb" },
    { mnemonic: "jnp rel8", opcode: "7B cb" },
    { mnemonic: "jl rel8", opcode: "7C cb" },
    { mnemonic: "jnl rel8", opcode: "7D cb" },
    { mnemonic: "jle rel8", opcode: "7E cb" },
    { mnemonic: "jg rel8", opcode: "7F cb" },





    { mnemonic: "jo rel32", opcode: "0F 80 cd" },
    { mnemonic: "jno rel32", opcode: "0F 81 cd" },
    { mnemonic: "jb rel32", opcode: "0F 82 cd" },
    { mnemonic: "jnb rel32", opcode: "0F 83 cd" },
    { mnemonic: "jz rel32", opcode: "0F 84 cd" },
    { mnemonic: "jnz rel32", opcode: "0F 85 cd" },
    { mnemonic: "jbe rel32", opcode: "0F 86 cd" },
    { mnemonic: "ja rel32", opcode: "0F 87 cd" },
    { mnemonic: "js rel32", opcode: "0F 88 cd" },
    { mnemonic: "jns rel32", opcode: "0F 89 cd" },
    { mnemonic: "jp rel32", opcode: "0F 8A cd" },
    { mnemonic: "jnp rel32", opcode: "0F 8B cd" },
    { mnemonic: "jl rel32", opcode: "0F 8C cd" },
    { mnemonic: "jnl rel32", opcode: "0F 8D cd" },
    { mnemonic: "jle rel32", opcode: "0F 8E cd" },
    { mnemonic: "jg rel32", opcode: "0F 8F cd" },






    { mnemonic: "cmovo r16, r/m16", opcode: "0F 40 /r" },
    { mnemonic: "cmovo r32, r/m32", opcode: "0F 40 /r" },
    { mnemonic: "cmovo r64, r/m64", opcode: "48 0F 40 /r" },

    { mnemonic: "cmovno r16, r/m16", opcode: "0F 41 /r" },
    { mnemonic: "cmovno r32, r/m32", opcode: "0F 41 /r" },
    { mnemonic: "cmovno r64, r/m64", opcode: "48 0F 41 /r" },

    { mnemonic: "cmovb r16, r/m16", opcode: "0F 42 /r" },
    { mnemonic: "cmovb r32, r/m32", opcode: "0F 42 /r" },
    { mnemonic: "cmovb r64, r/m64", opcode: "48 0F 42 /r" },

    { mnemonic: "cmovnb r16, r/m16", opcode: "0F 43 /r" },
    { mnemonic: "cmovnb r32, r/m32", opcode: "0F 43 /r" },
    { mnemonic: "cmovnb r64, r/m64", opcode: "48 0F 43 /r" },

    { mnemonic: "cmovz r16, r/m16", opcode: "0F 44 /r" },
    { mnemonic: "cmovz r32, r/m32", opcode: "0F 44 /r" },
    { mnemonic: "cmovz r64, r/m64", opcode: "48 0F 44 /r" },

    { mnemonic: "cmovnz r16, r/m16", opcode: "0F 45 /r" },
    { mnemonic: "cmovnz r32, r/m32", opcode: "0F 45 /r" },
    { mnemonic: "cmovnz r64, r/m64", opcode: "48 0F 45 /r" },

    { mnemonic: "cmovbe r16, r/m16", opcode: "0F 46 /r" },
    { mnemonic: "cmovbe r32, r/m32", opcode: "0F 46 /r" },
    { mnemonic: "cmovbe r64, r/m64", opcode: "48 0F 46 /r" },

    { mnemonic: "cmova r16, r/m16", opcode: "0F 47 /r" },
    { mnemonic: "cmova r32, r/m32", opcode: "0F 47 /r" },
    { mnemonic: "cmova r64, r/m64", opcode: "48 0F 47 /r" },

    { mnemonic: "cmovs r16, r/m16", opcode: "0F 48 /r" },
    { mnemonic: "cmovs r32, r/m32", opcode: "0F 48 /r" },
    { mnemonic: "cmovs r64, r/m64", opcode: "48 0F 48 /r" },

    { mnemonic: "cmovns r16, r/m16", opcode: "0F 49 /r" },
    { mnemonic: "cmovns r32, r/m32", opcode: "0F 49 /r" },
    { mnemonic: "cmovns r64, r/m64", opcode: "48 0F 49 /r" },

    { mnemonic: "cmovp r16, r/m16", opcode: "0F 4A /r" },
    { mnemonic: "cmovp r32, r/m32", opcode: "0F 4A /r" },
    { mnemonic: "cmovp r64, r/m64", opcode: "48 0F 4A /r" },

    { mnemonic: "cmovnp r16, r/m16", opcode: "0F 4B /r" },
    { mnemonic: "cmovnp r32, r/m32", opcode: "0F 4B /r" },
    { mnemonic: "cmovnp r64, r/m64", opcode: "48 0F 4B /r" },

    { mnemonic: "cmovl r16, r/m16", opcode: "0F 4C /r" },
    { mnemonic: "cmovl r32, r/m32", opcode: "0F 4C /r" },
    { mnemonic: "cmovl r64, r/m64", opcode: "48 0F 4C /r" },

    { mnemonic: "cmovnl r16, r/m16", opcode: "0F 4D /r" },
    { mnemonic: "cmovnl r32, r/m32", opcode: "0F 4D /r" },
    { mnemonic: "cmovnl r64, r/m64", opcode: "48 0F 4D /r" },

    { mnemonic: "cmovle r16, r/m16", opcode: "0F 4E /r" },
    { mnemonic: "cmovle r32, r/m32", opcode: "0F 4E /r" },
    { mnemonic: "cmovle r64, r/m64", opcode: "48 0F 4E /r" },

    { mnemonic: "cmovg r16, r/m16", opcode: "0F 4F /r" },
    { mnemonic: "cmovg r32, r/m32", opcode: "0F 4F /r" },
    { mnemonic: "cmovg r64, r/m64", opcode: "48 0F 4F /r" },






    { mnemonic: "seto r/m8", opcode: "0F 90 /r" },
    { mnemonic: "setno r/m8", opcode: "0F 91 /r" },
    { mnemonic: "setb r/m8", opcode: "0F 92 /r" },
    { mnemonic: "setnb r/m8", opcode: "0F 93 /r" },
    { mnemonic: "setz r/m8", opcode: "0F 94 /r" },
    { mnemonic: "setnz r/m8", opcode: "0F 95 /r" },
    { mnemonic: "setbe r/m8", opcode: "0F 96 /r" },
    { mnemonic: "seta r/m8", opcode: "0F 97 /r" },
    { mnemonic: "sets r/m8", opcode: "0F 98 /r" },
    { mnemonic: "setns r/m8", opcode: "0F 99 /r" },
    { mnemonic: "setp r/m8", opcode: "0F 9A /r" },
    { mnemonic: "setnp r/m8", opcode: "0F 9B /r" },
    { mnemonic: "setl r/m8", opcode: "0F 9C /r" },
    { mnemonic: "setnl r/m8", opcode: "0F 9D /r" },
    { mnemonic: "setle r/m8", opcode: "0F 9E /r" },
    { mnemonic: "setg r/m8", opcode: "0F 9F /r" },




    { mnemonic: "loop rel8", opcode: "E2 cb" },
    { mnemonic: "loope rel8", opcode: "E1 cb" },
    { mnemonic: "loopne rel8", opcode: "E0 cb" },



    { mnemonic: "xchg r8, r/m8", opcode: "86 /r" },
    { mnemonic: "xchg r/m8, r8", opcode: "86 /r" },

    { mnemonic: "xchg r16, r/m16", opcode: "87 /r" },
    { mnemonic: "xchg r/m16, r16", opcode: "87 /r" },

    { mnemonic: "xchg r32, r/m32", opcode: "87 /r" },
    { mnemonic: "xchg r/m32, r32", opcode: "87 /r" },

    { mnemonic: "xchg r64, r/m64", opcode: "48 87 /r" },
    { mnemonic: "xchg r/m64, r64", opcode: "48 87 /r" },

    { mnemonic: "xchg r32, eax", opcode: "90 + rd" },
    { mnemonic: "xchg r64, rax", opcode: "48 90 + rq" },




    { mnemonic: "bswap r32", opcode: "0F C8 + rd" },
    { mnemonic: "bswap r64", opcode: "48 0F C8 + rq" },




    { mnemonic: "nop", opcode: "90" },
    { mnemonic: "nop r/m32", opcode: "0F 1F /0" },
    { mnemonic: "nop r/m64", opcode: "48 0F 1F /0" },



    { mnemonic: "enter imm16, imm8", opcode: "C8 iw ib" },
    { mnemonic: "leave", opcode: "C9" },




    { mnemonic: "clc", opcode: "F8" },
    { mnemonic: "stc", opcode: "F9" },
    { mnemonic: "cmc", opcode: "F5" },

    { mnemonic: "cld", opcode: "FC" },
    { mnemonic: "std", opcode: "FD" },



    { mnemonic: "cbw", opcode: "66 98" },
    { mnemonic: "cwde", opcode: "98" },
    { mnemonic: "cdqe", opcode: "48 98" },




    { mnemonic: "cwd", opcode: "66 99" },
    { mnemonic: "cdq", opcode: "99" },
    { mnemonic: "cqo", opcode: "48 99" },



    { mnemonic: "pushf", opcode: "9C" },
    { mnemonic: "popf", opcode: "9D" },


    { mnemonic: "cpuid", opcode: "0F A2" },



    { mnemonic: "ud2", opcode: "0F 0B" },



    { mnemonic: "hlt", opcode: "F4" },



    { mnemonic: "wait", opcode: "9B" },
    { mnemonic: "fwait", opcode: "9B" },



    { mnemonic: "xlat", opcode: "D7" },





    { mnemonic: "movsb", opcode: "A4" },
    { mnemonic: "movsw", opcode: "66 A5" },
    { mnemonic: "movsd", opcode: "A5" },
    { mnemonic: "movsq", opcode: "48 A5" },

    { mnemonic: "stosb", opcode: "AA" },
    { mnemonic: "stosw", opcode: "66 AB" },
    { mnemonic: "stosd", opcode: "AB" },
    { mnemonic: "stosq", opcode: "48 AB" },

    { mnemonic: "lodsb", opcode: "AC" },
    { mnemonic: "lodsw", opcode: "66 AD" },
    { mnemonic: "lodsd", opcode: "AD" },
    { mnemonic: "lodsq", opcode: "48 AD" },

    { mnemonic: "scasb", opcode: "AE" },
    { mnemonic: "scasw", opcode: "66 AF" },
    { mnemonic: "scasd", opcode: "AF" },
    { mnemonic: "scasq", opcode: "48 AF" },



    { mnemonic: "rep movsb", opcode: "F3 A4" },
    { mnemonic: "rep movsw", opcode: "F3 66 A5" },
    { mnemonic: "rep movsd", opcode: "F3 A5" },
    { mnemonic: "rep movsq", opcode: "F3 48 A5" },

    { mnemonic: "rep stosb", opcode: "F3 AA" },
    { mnemonic: "rep stosw", opcode: "F3 66 AB" },
    { mnemonic: "rep stosd", opcode: "F3 AB" },
    { mnemonic: "rep stosq", opcode: "F3 48 AB" },

    { mnemonic: "repe cmpsb", opcode: "F3 A6" },
    { mnemonic: "repe cmpsw", opcode: "F3 66 A7" },
    { mnemonic: "repe cmpsd", opcode: "F3 A7" },
    { mnemonic: "repe cmpsq", opcode: "F3 48 A7" },

    { mnemonic: "repne cmpsb", opcode: "F2 A6" },
    { mnemonic: "repne cmpsw", opcode: "F2 66 A7" },
    { mnemonic: "repne cmpsd", opcode: "F2 A7" },
    { mnemonic: "repne cmpsq", opcode: "F2 48 A7" },




    { mnemonic: "lock", opcode: "F0" },



    { mnemonic: "cmpxchg r/m8, r8", opcode: "0F B0 /r" },
    { mnemonic: "cmpxchg r/m16, r16", opcode: "0F B1 /r" },
    { mnemonic: "cmpxchg r/m32, r32", opcode: "0F B1 /r" },
    { mnemonic: "cmpxchg r/m64, r64", opcode: "48 0F B1 /r" },

    { mnemonic: "cmpxchg8b m64", opcode: "0F C7 /1" },
    { mnemonic: "cmpxchg16b m128", opcode: "48 0F C7 /1" },



    { mnemonic: "xadd r/m8, r8", opcode: "0F C0 /r" },
    { mnemonic: "xadd r/m16, r16", opcode: "0F C1 /r" },
    { mnemonic: "xadd r/m32, r32", opcode: "0F C1 /r" },
    { mnemonic: "xadd r/m64, r64", opcode: "48 0F C1 /r" },




    { mnemonic: "bt r/m16, r16", opcode: "0F A3 /r" },
    { mnemonic: "bt r/m32, r32", opcode: "0F A3 /r" },
    { mnemonic: "bt r/m64, r64", opcode: "48 0F A3 /r" },

    { mnemonic: "bt r/m16, imm8", opcode: "0F BA /4 ib" },
    { mnemonic: "bt r/m32, imm8", opcode: "0F BA /4 ib" },
    { mnemonic: "bt r/m64, imm8", opcode: "48 0F BA /4 ib" },

    { mnemonic: "bts r/m16, r16", opcode: "0F AB /r" },
    { mnemonic: "bts r/m32, r32", opcode: "0F AB /r" },
    { mnemonic: "bts r/m64, r64", opcode: "48 0F AB /r" },

    { mnemonic: "bts r/m16, imm8", opcode: "0F BA /5 ib" },
    { mnemonic: "bts r/m32, imm8", opcode: "0F BA /5 ib" },
    { mnemonic: "bts r/m64, imm8", opcode: "48 0F BA /5 ib" },

    { mnemonic: "btr r/m16, r16", opcode: "0F B3 /r" },
    { mnemonic: "btr r/m32, r32", opcode: "0F B3 /r" },
    { mnemonic: "btr r/m64, r64", opcode: "48 0F B3 /r" },

    { mnemonic: "btr r/m16, imm8", opcode: "0F BA /6 ib" },
    { mnemonic: "btr r/m32, imm8", opcode: "0F BA /6 ib" },
    { mnemonic: "btr r/m64, imm8", opcode: "48 0F BA /6 ib" },

    { mnemonic: "btc r/m16, r16", opcode: "0F BB /r" },
    { mnemonic: "btc r/m32, r32", opcode: "0F BB /r" },
    { mnemonic: "btc r/m64, r64", opcode: "48 0F BB /r" },

    { mnemonic: "btc r/m16, imm8", opcode: "0F BA /7 ib" },
    { mnemonic: "btc r/m32, imm8", opcode: "0F BA /7 ib" },
    { mnemonic: "btc r/m64, imm8", opcode: "48 0F BA /7 ib" },



    { mnemonic: "rdrand r16", opcode: "0F C7 /6" },
    { mnemonic: "rdrand r32", opcode: "0F C7 /6" },
    { mnemonic: "rdrand r64", opcode: "48 0F C7 /6" },

    { mnemonic: "rdseed r16", opcode: "0F C7 /7" },
    { mnemonic: "rdseed r32", opcode: "0F C7 /7" },
    { mnemonic: "rdseed r64", opcode: "48 0F C7 /7" },




    { mnemonic: "rdtsc", opcode: "0F 31" },
    { mnemonic: "rdtscp", opcode: "0F 01 F9" },



    { mnemonic: "in al, imm8", opcode: "E4 ib" },
    { mnemonic: "in ax, imm8", opcode: "E5 ib" },
    { mnemonic: "in eax, imm8", opcode: "E5 ib" },

    { mnemonic: "in al, dx", opcode: "EC" },
    { mnemonic: "in ax, dx", opcode: "ED" },
    { mnemonic: "in eax, dx", opcode: "ED" },

    { mnemonic: "out imm8, al", opcode: "E6 ib" },
    { mnemonic: "out imm8, ax", opcode: "E7 ib" },
    { mnemonic: "out imm8, eax", opcode: "E7 ib" },

    { mnemonic: "out dx, al", opcode: "EE" },
    { mnemonic: "out dx, ax", opcode: "EF" },
    { mnemonic: "out dx, eax", opcode: "EF" },



    { mnemonic: "insb", opcode: "6C" },
    { mnemonic: "insw", opcode: "66 6D" },
    { mnemonic: "insd", opcode: "6D" },

    { mnemonic: "outsb", opcode: "6E" },
    { mnemonic: "outsw", opcode: "66 6F" },
    { mnemonic: "outsd", opcode: "6F" },



    { mnemonic: "shld r/m16, r16, imm8", opcode: "0F A4 /r ib" },
    { mnemonic: "shld r/m32, r32, imm8", opcode: "0F A4 /r ib" },
    { mnemonic: "shld r/m64, r64, imm8", opcode: "48 0F A4 /r ib" },

    { mnemonic: "shld r/m16, r16, cl", opcode: "0F A5 /r" },
    { mnemonic: "shld r/m32, r32, cl", opcode: "0F A5 /r" },
    { mnemonic: "shld r/m64, r64, cl", opcode: "48 0F A5 /r" },

    { mnemonic: "shrd r/m16, r16, imm8", opcode: "0F AC /r ib" },
    { mnemonic: "shrd r/m32, r32, imm8", opcode: "0F AC /r ib" },
    { mnemonic: "shrd r/m64, r64, imm8", opcode: "48 0F AC /r ib" },

    { mnemonic: "shrd r/m16, r16, cl", opcode: "0F AD /r" },
    { mnemonic: "shrd r/m32, r32, cl", opcode: "0F AD /r" },
    { mnemonic: "shrd r/m64, r64, cl", opcode: "48 0F AD /r" },



    { mnemonic: "imul r16, r/m16, imm8", opcode: "6B /r ib" },
    { mnemonic: "imul r32, r/m32, imm8", opcode: "6B /r ib" },
    { mnemonic: "imul r64, r/m64, imm8", opcode: "48 6B /r ib" },

    { mnemonic: "imul r16, r/m16, imm16", opcode: "69 /r iw" },
    { mnemonic: "imul r32, r/m32, imm32", opcode: "69 /r id" },
    { mnemonic: "imul r64, r/m64, imm32", opcode: "48 69 /r id" },




    { mnemonic: "fadd st(0), st(i)", opcode: "D8 C0+i" },
    { mnemonic: "fadd st(i), st(0)", opcode: "DC C0+i" },

    { mnemonic: "fsub st(0), st(i)", opcode: "D8 E0+i" },
    { mnemonic: "fsub st(i), st(0)", opcode: "DC E8+i" },

    { mnemonic: "fmul st(0), st(i)", opcode: "D8 C8+i" },
    { mnemonic: "fmul st(i), st(0)", opcode: "DC C8+i" },

    { mnemonic: "fdiv st(0), st(i)", opcode: "D8 F0+i" },
    { mnemonic: "fdiv st(i), st(0)", opcode: "DC F8+i" },

    { mnemonic: "fld m32real", opcode: "D9 /0" },
    { mnemonic: "fld m64real", opcode: "DD /0" },

    { mnemonic: "fst m32real", opcode: "D9 /2" },
    { mnemonic: "fst m64real", opcode: "DD /2" },

    { mnemonic: "fstp m32real", opcode: "D9 /3" },
    { mnemonic: "fstp m64real", opcode: "DD /3" },
    { mnemonic: "fstp st(i)", opcode: "DD D8+i" },

    { mnemonic: "fnop", opcode: "D9 D0" },




    { mnemonic: "lgdt m16&32", opcode: "0F 01 /2" },
    { mnemonic: "lidt m16&32", opcode: "0F 01 /3" },

    { mnemonic: "sgdt m16&32", opcode: "0F 01 /0" },
    { mnemonic: "sidt m16&32", opcode: "0F 01 /1" },




    { mnemonic: "mov cr0, r64", opcode: "0F 22 /r" },
    { mnemonic: "mov cr2, r64", opcode: "0F 22 /r" },
    { mnemonic: "mov cr3, r64", opcode: "0F 22 /r" },
    { mnemonic: "mov cr4, r64", opcode: "0F 22 /r" },
    { mnemonic: "mov cr8, r64", opcode: "0F 22 /r" },

    { mnemonic: "mov r64, cr0", opcode: "0F 20 /r" },
    { mnemonic: "mov r64, cr2", opcode: "0F 20 /r" },
    { mnemonic: "mov r64, cr3", opcode: "0F 20 /r" },
    { mnemonic: "mov r64, cr4", opcode: "0F 20 /r" },
    { mnemonic: "mov r64, cr8", opcode: "0F 20 /r" },


    { mnemonic: "mov dr0, r64", opcode: "0F 23 /r" },
    { mnemonic: "mov dr1, r64", opcode: "0F 23 /r" },
    { mnemonic: "mov dr2, r64", opcode: "0F 23 /r" },
    { mnemonic: "mov dr3, r64", opcode: "0F 23 /r" },
    { mnemonic: "mov dr6, r64", opcode: "0F 23 /r" },
    { mnemonic: "mov dr7, r64", opcode: "0F 23 /r" },

    { mnemonic: "mov r64, dr0", opcode: "0F 21 /r" },
    { mnemonic: "mov r64, dr1", opcode: "0F 21 /r" },
    { mnemonic: "mov r64, dr2", opcode: "0F 21 /r" },
    { mnemonic: "mov r64, dr3", opcode: "0F 21 /r" },
    { mnemonic: "mov r64, dr6", opcode: "0F 21 /r" },
    { mnemonic: "mov r64, dr7", opcode: "0F 21 /r" },


    { mnemonic: "invlpg m8", opcode: "0F 01 /7" },


    { mnemonic: "wrmsr", opcode: "0F 30" },
    { mnemonic: "rdmsr", opcode: "0F 32" },


    { mnemonic: "swapgs", opcode: "0F 01 F8" },



    { mnemonic: "syscall", opcode: "0F 05" },
    { mnemonic: "sysret", opcode: "0F 07" },



    { mnemonic: "sysenter", opcode: "0F 34" },
    { mnemonic: "sysexit", opcode: "0F 35" },



    { mnemonic: "jmp ptr16:32", opcode: "EA cd" },
    { mnemonic: "jmp ptr16:64", opcode: "EA cp" },

    { mnemonic: "call ptr16:32", opcode: "9A cd" },
    { mnemonic: "call ptr16:64", opcode: "9A cp" },

    { mnemonic: "retf", opcode: "CB" },
    { mnemonic: "retf imm16", opcode: "CA iw" },


    { mnemonic: "lss r16, m16:16", opcode: "0F B2 /r" },
    { mnemonic: "lss r32, m32:16", opcode: "0F B2 /r" },
    { mnemonic: "lss r64, m64:16", opcode: "48 0F B2 /r" },

    { mnemonic: "lfs r16, m16:16", opcode: "0F B4 /r" },
    { mnemonic: "lfs r32, m32:16", opcode: "0F B4 /r" },
    { mnemonic: "lfs r64, m64:16", opcode: "48 0F B4 /r" },

    { mnemonic: "lgs r16, m16:16", opcode: "0F B5 /r" },
    { mnemonic: "lgs r32, m32:16", opcode: "0F B5 /r" },
    { mnemonic: "lgs r64, m64:16", opcode: "48 0F B5 /r" },


    { mnemonic: "lar r16, r/m16", opcode: "0F 02 /r" },
    { mnemonic: "lar r32, r/m32", opcode: "0F 02 /r" },
    { mnemonic: "lar r64, r/m64", opcode: "48 0F 02 /r" },

    { mnemonic: "lsl r16, r/m16", opcode: "0F 03 /r" },
    { mnemonic: "lsl r32, r/m32", opcode: "0F 03 /r" },
    { mnemonic: "lsl r64, r/m64", opcode: "48 0F 03 /r" },



    { mnemonic: "verr r/m16", opcode: "0F 00 /4" },
    { mnemonic: "verw r/m16", opcode: "0F 00 /5" },


    { mnemonic: "arpl r/m16, r16", opcode: "63 /r" },






    { mnemonic: "bound r16, m16&16", opcode: "62 /r" },
    { mnemonic: "bound r32, m32&32", opcode: "62 /r" },



    { mnemonic: "cmp r8, r/m8", opcode: "3A /r" },
    { mnemonic: "cmp r/m8, r8", opcode: "38 /r" },

    { mnemonic: "cmp r16, r/m16", opcode: "3B /r" },
    { mnemonic: "cmp r/m16, r16", opcode: "39 /r" },

    { mnemonic: "cmp r32, r/m32", opcode: "3B /r" },
    { mnemonic: "cmp r/m32, r32", opcode: "39 /r" },

    { mnemonic: "cmp r64, r/m64", opcode: "48 3B /r" },
    { mnemonic: "cmp r/m64, r64", opcode: "48 39 /r" },



    { mnemonic: "test r8, r/m8", opcode: "84 /r" },
    { mnemonic: "test r16, r/m16", opcode: "85 /r" },
    { mnemonic: "test r32, r/m32", opcode: "85 /r" },
    { mnemonic: "test r64, r/m64", opcode: "48 85 /r" },



    { mnemonic: "shl r/m8, cl", opcode: "D2 /4" },
    { mnemonic: "shl r/m32, cl", opcode: "D3 /4" },
    { mnemonic: "shl r/m64, cl", opcode: "48 D3 /4" },

    { mnemonic: "shr r/m8, cl", opcode: "D2 /5" },
    { mnemonic: "shr r/m32, cl", opcode: "D3 /5" },
    { mnemonic: "shr r/m64, cl", opcode: "48 D3 /5" },

    { mnemonic: "sar r/m8, cl", opcode: "D2 /7" },
    { mnemonic: "sar r/m32, cl", opcode: "D3 /7" },
    { mnemonic: "sar r/m64, cl", opcode: "48 D3 /7" },



    { mnemonic: "aaa", opcode: "37" },
    { mnemonic: "aas", opcode: "3F" },
    { mnemonic: "daa", opcode: "27" },
    { mnemonic: "das", opcode: "2F" },



    { mnemonic: "aam", opcode: "D4 0A" },
    { mnemonic: "aad", opcode: "D5 0A" },



    { mnemonic: "cs:", opcode: "2E" },
    { mnemonic: "ss:", opcode: "36" },
    { mnemonic: "ds:", opcode: "3E" },
    { mnemonic: "es:", opcode: "26" },
    { mnemonic: "fs:", opcode: "64" },
    { mnemonic: "gs:", opcode: "65" },


    { mnemonic: "neg r/m8", opcode: "F6 /3" },
    { mnemonic: "neg r/m16", opcode: "F7 /3" },
    { mnemonic: "neg r/m32", opcode: "F7 /3" },
    { mnemonic: "neg r/m64", opcode: "48 F7 /3" },

    { mnemonic: "not r/m8", opcode: "F6 /2" },
    { mnemonic: "not r/m16", opcode: "F7 /2" },
    { mnemonic: "not r/m32", opcode: "F7 /2" },
    { mnemonic: "not r/m64", opcode: "48 F7 /2" },


    { mnemonic: "inc r16", opcode: "40 + rw" },
    { mnemonic: "inc r32", opcode: "40 + rd" },

    { mnemonic: "dec r16", opcode: "48 + rw" },
    { mnemonic: "dec r32", opcode: "48 + rd" },



    { mnemonic: "fchs", opcode: "D9 E0" },
    { mnemonic: "fabs", opcode: "D9 E1" },

    { mnemonic: "ftst", opcode: "D9 E4" },
    { mnemonic: "fxam", opcode: "D9 E5" },

    { mnemonic: "fld1", opcode: "D9 E8" },
    { mnemonic: "fldl2t", opcode: "D9 E9" },
    { mnemonic: "fldl2e", opcode: "D9 EA" },
    { mnemonic: "fldpi", opcode: "D9 EB" },
    { mnemonic: "fldlg2", opcode: "D9 EC" },
    { mnemonic: "fldln2", opcode: "D9 ED" },

    { mnemonic: "f2xm1", opcode: "D9 F0" },
    { mnemonic: "fyl2x", opcode: "D9 F1" },
    { mnemonic: "fptan", opcode: "D9 F2" },
    { mnemonic: "fpatan", opcode: "D9 F3" },
    { mnemonic: "fxtract", opcode: "D9 F4" },
    { mnemonic: "fprem1", opcode: "D9 F5" },
    { mnemonic: "fprem", opcode: "D9 F8" },
    { mnemonic: "fyl2xp1", opcode: "D9 F9" },
    { mnemonic: "fsqrt", opcode: "D9 FA" },
    { mnemonic: "fsincos", opcode: "D9 FB" },
    { mnemonic: "frndint", opcode: "D9 FC" },
    { mnemonic: "fscale", opcode: "D9 FD" },
    { mnemonic: "fsin", opcode: "D9 FE" },
    { mnemonic: "fcos", opcode: "D9 FF" },


    { mnemonic: "sahf", opcode: "9E" },
    { mnemonic: "lahf", opcode: "9F" },


    { mnemonic: "xlatb", opcode: "D7" },



    { mnemonic: "bsf r16, r/m16", opcode: "0F BC /r" },
    { mnemonic: "bsf r32, r/m32", opcode: "0F BC /r" },
    { mnemonic: "bsf r64, r/m64", opcode: "48 0F BC /r" },

    { mnemonic: "bsr r16, r/m16", opcode: "0F BD /r" },
    { mnemonic: "bsr r32, r/m32", opcode: "0F BD /r" },
    { mnemonic: "bsr r64, r/m64", opcode: "48 0F BD /r" },



    { mnemonic: "popcnt r16, r/m16", opcode: "F3 0F B8 /r" },
    { mnemonic: "popcnt r32, r/m32", opcode: "F3 0F B8 /r" },
    { mnemonic: "popcnt r64, r/m64", opcode: "F3 48 0F B8 /r" },



    { mnemonic: "tzcnt r16, r/m16", opcode: "F3 0F BC /r" },
    { mnemonic: "tzcnt r32, r/m32", opcode: "F3 0F BC /r" },
    { mnemonic: "tzcnt r64, r/m64", opcode: "F3 48 0F BC /r" },

    { mnemonic: "lzcnt r16, r/m16", opcode: "F3 0F BD /r" },
    { mnemonic: "lzcnt r32, r/m32", opcode: "F3 0F BD /r" },
    { mnemonic: "lzcnt r64, r/m64", opcode: "F3 48 0F BD /r" },



    { mnemonic: "movsx r16, r/m8", opcode: "0F BE /r" },
    { mnemonic: "movsx r32, r/m8", opcode: "0F BE /r" },
    { mnemonic: "movsx r64, r/m8", opcode: "48 0F BE /r" },

    { mnemonic: "movsx r16, r/m16", opcode: "0F BF /r" },
    { mnemonic: "movsx r32, r/m16", opcode: "0F BF /r" },
    { mnemonic: "movsx r64, r/m16", opcode: "48 0F BF /r" },


    { mnemonic: "movzx r16, r/m8", opcode: "0F B6 /r" },
    { mnemonic: "movzx r32, r/m8", opcode: "0F B6 /r" },
    { mnemonic: "movzx r64, r/m8", opcode: "48 0F B6 /r" },

    { mnemonic: "movzx r16, r/m16", opcode: "0F B7 /r" },
    { mnemonic: "movzx r32, r/m16", opcode: "0F B7 /r" },
    { mnemonic: "movzx r64, r/m16", opcode: "48 0F B7 /r" },



    { mnemonic: "crc32 r32, r/m8", opcode: "F2 0F 38 F0 /r" },
    { mnemonic: "crc32 r32, r/m32", opcode: "F2 0F 38 F1 /r" },

    { mnemonic: "crc32 r64, r/m8", opcode: "F2 48 0F 38 F0 /r" },
    { mnemonic: "crc32 r64, r/m64", opcode: "F2 48 0F 38 F1 /r" },



    { mnemonic: "prefetchnta m8", opcode: "0F 18 /0" },
    { mnemonic: "prefetcht0 m8", opcode: "0F 18 /1" },
    { mnemonic: "prefetcht1 m8", opcode: "0F 18 /2" },
    { mnemonic: "prefetcht2 m8", opcode: "0F 18 /3" },


    { mnemonic: "cmpxchg r8, r/m8", opcode: "0F B0 /r" },
    { mnemonic: "cmpxchg r16, r/m16", opcode: "0F B1 /r" },
    { mnemonic: "cmpxchg r32, r/m32", opcode: "0F B1 /r" },
    { mnemonic: "cmpxchg r64, r/m64", opcode: "48 0F B1 /r" },


    { mnemonic: "cmpsb", opcode: "A6" },
    { mnemonic: "cmpsw", opcode: "66 A7" },
    { mnemonic: "cmpsd", opcode: "A7" },
    { mnemonic: "cmpsq", opcode: "48 A7" },



    { mnemonic: "endbr32", opcode: "F3 0F 1E FA" },
    { mnemonic: "endbr64", opcode: "F3 0F 1E FB" },


    { mnemonic: "clac", opcode: "0F 01 CA" },
    { mnemonic: "stac", opcode: "0F 01 CB" },


    { mnemonic: "lfence", opcode: "0F AE E8" },
    { mnemonic: "sfence", opcode: "0F AE F8" },
    { mnemonic: "mfence", opcode: "0F AE F0" },


    { mnemonic: "pause", opcode: "F3 90" },









    { mnemonic: "movaps xmm, xmm/m128", opcode: "0F 28 /r" },
    { mnemonic: "movaps xmm/m128, xmm", opcode: "0F 29 /r" },

    { mnemonic: "movups xmm, xmm/m128", opcode: "0F 10 /r" },
    { mnemonic: "movups xmm/m128, xmm", opcode: "0F 11 /r" },


    { mnemonic: "movapd xmm, xmm/m128", opcode: "66 0F 28 /r" },
    { mnemonic: "movapd xmm/m128, xmm", opcode: "66 0F 29 /r" },

    { mnemonic: "movupd xmm, xmm/m128", opcode: "66 0F 10 /r" },
    { mnemonic: "movupd xmm/m128, xmm", opcode: "66 0F 11 /r" },


    { mnemonic: "movss xmm, xmm/m32", opcode: "F3 0F 10 /r" },
    { mnemonic: "movss xmm/m32, xmm", opcode: "F3 0F 11 /r" },

    { mnemonic: "movsd xmm, xmm/m64", opcode: "F2 0F 10 /r" },
    { mnemonic: "movsd xmm/m64, xmm", opcode: "F2 0F 11 /r" },


    { mnemonic: "movd xmm, r/m32", opcode: "66 0F 6E /r" },
    { mnemonic: "movd r/m32, xmm", opcode: "66 0F 7E /r" },

    { mnemonic: "movq xmm, r/m64", opcode: "F3 0F 7E /r" },
    { mnemonic: "movq r/m64, xmm", opcode: "66 0F D6 /r" },


    { mnemonic: "addps xmm, xmm/m128", opcode: "0F 58 /r" },
    { mnemonic: "subps xmm, xmm/m128", opcode: "0F 5C /r" },
    { mnemonic: "mulps xmm, xmm/m128", opcode: "0F 59 /r" },
    { mnemonic: "divps xmm, xmm/m128", opcode: "0F 5E /r" },


    { mnemonic: "addpd xmm, xmm/m128", opcode: "66 0F 58 /r" },
    { mnemonic: "subpd xmm, xmm/m128", opcode: "66 0F 5C /r" },
    { mnemonic: "mulpd xmm, xmm/m128", opcode: "66 0F 59 /r" },
    { mnemonic: "divpd xmm, xmm/m128", opcode: "66 0F 5E /r" },



    { mnemonic: "addss xmm, xmm/m32", opcode: "F3 0F 58 /r" },
    { mnemonic: "subss xmm, xmm/m32", opcode: "F3 0F 5C /r" },
    { mnemonic: "mulss xmm, xmm/m32", opcode: "F3 0F 59 /r" },
    { mnemonic: "divss xmm, xmm/m32", opcode: "F3 0F 5E /r" },


    { mnemonic: "addsd xmm, xmm/m64", opcode: "F2 0F 58 /r" },
    { mnemonic: "subsd xmm, xmm/m64", opcode: "F2 0F 5C /r" },
    { mnemonic: "mulsd xmm, xmm/m64", opcode: "F2 0F 59 /r" },
    { mnemonic: "divsd xmm, xmm/m64", opcode: "F2 0F 5E /r" },


    { mnemonic: "sqrtss xmm, xmm/m32", opcode: "F3 0F 51 /r" },
    { mnemonic: "sqrtsd xmm, xmm/m64", opcode: "F2 0F 51 /r" },


    { mnemonic: "minss xmm, xmm/m32", opcode: "F3 0F 5D /r" },
    { mnemonic: "maxss xmm, xmm/m32", opcode: "F3 0F 5F /r" },

    { mnemonic: "minsd xmm, xmm/m64", opcode: "F2 0F 5D /r" },
    { mnemonic: "maxsd xmm, xmm/m64", opcode: "F2 0F 5F /r" },


    { mnemonic: "ucomiss xmm, xmm/m32", opcode: "0F 2E /r" },
    { mnemonic: "ucomisd xmm, xmm/m64", opcode: "66 0F 2E /r" },


    { mnemonic: "comiss xmm, xmm/m32", opcode: "0F 2F /r" },
    { mnemonic: "comisd xmm, xmm/m64", opcode: "66 0F 2F /r" },


    { mnemonic: "cvtsi2ss xmm, r/m32", opcode: "F3 0F 2A /r" },
    { mnemonic: "cvtsi2ss xmm, r/m64", opcode: "F3 0F 2A /r" },

    { mnemonic: "cvtsi2sd xmm, r/m32", opcode: "F2 0F 2A /r" },
    { mnemonic: "cvtsi2sd xmm, r/m64", opcode: "F2 0F 2A /r" },


    { mnemonic: "cvtss2si r32, xmm/m32", opcode: "F3 0F 2D /r" },
    { mnemonic: "cvtss2si r64, xmm/m32", opcode: "F3 0F 2D /r" },

    { mnemonic: "cvtsd2si r32, xmm/m64", opcode: "F2 0F 2D /r" },
    { mnemonic: "cvtsd2si r64, xmm/m64", opcode: "F2 0F 2D /r" },


    { mnemonic: "cvtss2sd xmm, xmm/m32", opcode: "F3 0F 5A /r" },
    { mnemonic: "cvtsd2ss xmm, xmm/m64", opcode: "F2 0F 5A /r" },


    { mnemonic: "movmskps r32, xmm", opcode: "0F 50 /r" },
    { mnemonic: "movmskpd r32, xmm", opcode: "66 0F 50 /r" },


    { mnemonic: "pmovmskb r32, xmm", opcode: "66 0F D7 /r" },


    { mnemonic: "pinsrw xmm, r/m16, imm8", opcode: "66 0F C4 /r ib" },
    { mnemonic: "pextrw r32, xmm, imm8", opcode: "66 0F C5 /r ib" },


    { mnemonic: "movhlps xmm1, xmm2", opcode: "0F 12 /r" },
    { mnemonic: "movlhps xmm1, xmm2", opcode: "0F 16 /r" },


    { mnemonic: "unpcklps xmm, xmm/m128", opcode: "0F 14 /r" },
    { mnemonic: "unpckhps xmm, xmm/m128", opcode: "0F 15 /r" },


    { mnemonic: "unpcklpd xmm, xmm/m128", opcode: "66 0F 14 /r" },
    { mnemonic: "unpckhpd xmm, xmm/m128", opcode: "66 0F 15 /r" },
]

module.exports = instructions