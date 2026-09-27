const instructions = require('./instructions.js');

function classifyRegister(reg) {
    reg = reg.toLowerCase();

    const r8 = ["al","cl","dl","bl","spl","bpl","sil","dil"];
    const r16 = ["ax","cx","dx","bx","sp","bp","si","di"];
    const r32 = ["eax","ecx","edx","ebx","esp","ebp","esi","edi"];
    const r64 = ["rax","rcx","rdx","rbx","rsp","rbp","rsi","rdi"];

    if (r8.includes(reg) || /^r\d+b$/.test(reg)) return "r8";
    if (r16.includes(reg) || /^r\d+w$/.test(reg)) return "r16";
    if (r32.includes(reg) || /^r\d+d$/.test(reg)) return "r32";
    if (r64.includes(reg) || /^r\d+$/.test(reg)) return "r64";

    return null;
}

function classifyImmediate(val) {
    const v = Number(val);

    if (v >= -128 && v <= 255) return "imm8";
    if (v >= -32768 && v <= 65535) return "imm16";
    if (v >= -2147483648 && v <= 4294967295) return "imm32";
    return "imm64";
}

function classifyMemory(op) {
    // memory operand → width unknown, infer from other operand
    return "m";
}

function classifyOperand(op) {
    if (typeof op !== 'string') return null;

    op = op.trim();
    if (!op) return null;

    // register
    const reg = classifyRegister(op);
    if (reg) return reg;

    // immediate
    if (/^-?\d+$/.test(op)) {
        return classifyImmediate(op);
    }

    // memory operand
    if (/^\[.*\]$/.test(op)) {
        if(op.length==12){
            return 'r/m64'
        }
        return classifyMemory(op);
    }

    return null;
}

function inferMemoryWidth(memType, otherType) {
    // r/mX width = width of register operand
    if (otherType.startsWith("r")) return "r/m" + otherType.slice(1);
    if (otherType.startsWith("imm")) return "r/m64"; // default for imm → 64-bit mem
    return "m";
}

function parseInstruction(instr) {
    if (typeof instr !== 'string') return null;

    const trimmed = instr.trim().toLowerCase();
    if (!trimmed) return null;

    const parts = trimmed.split(/\s+/).filter(Boolean);
    if (parts.length < 2) return null;

    const [mnemonic, op1raw, op2raw] = parts;

    const byMnemonic = instructions.find(entry => entry.mnemonic.split(' ')[0] === mnemonic);
    if (!byMnemonic) {
        return null//byMnemonic.mnemonic;
    }

    const op1 = classifyOperand(op1raw ? op1raw.replace(/,$/, '') : null);
    const op2 = op2raw ? classifyOperand(op2raw.replace(/,$/, '')) : null;

    if (!op1 || (op2raw && op2 === null)) return null;

    let o1 = op1;
    let o2 = op2;

    // infer memory width
    if (op1 === "m" && op2) o1 = inferMemoryWidth(op1, op2);
    if (op2 === "m" && op1) o2 = inferMemoryWidth(op2, op1);

    if((o1=='r64')&&(o2!='r/m64')){
        o1 = 'r/m64'
    }

    if (o2) return `${mnemonic} ${o1}, ${o2}`;
    return `${mnemonic} ${o1}`;
}

console.log(parseInstruction('and rsp, -16'))

module.exports = parseInstruction