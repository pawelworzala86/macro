const fs = require('fs')

const source = fs.readFileSync('./macro.inc').toString()

const tokens = source.split(/\ |(\n)|\r|(\=)|(\,)/gm).filter(f=>f?(f.length):false)
tokens.push('\n')

console.log(tokens)

const dataTypes = {dq:8,dd:4,dw:2,db:1}

const AST = {
    kind: 'root',
    body: [],
}
let activeAST = AST

const MACROS = {}

for(let index=0;index<tokens.length;index++){
    const token = tokens[index]

    if(Object.keys(dataTypes).includes(token)){
        index++
        const params = []
        while(tokens[index]!='\n'){
            if(tokens[index]!=','){
                params.push(tokens[index])
            }
            index++
        }
        activeAST.body.push({
            kind: token,
            params,
        })
    }
    if(token=='macro'){
        const name = tokens[index+1]
        const node = {
            kind: 'macro',
            name,
            parent: activeAST,
            params: [],
            body: [],
        }
        index+=2
        const params = []
        while(tokens[index]!='\n'){
            if(tokens[index]!=','){
                params.push(tokens[index])
            }
            index++
        }
        node.params = params
        activeAST.body.push(node)
        activeAST = node
        MACROS[name] = node
        //index++
    }
    if((token=='end')&&(tokens[index+1]=='macro')){
        activeAST = activeAST.parent
        index++
    }
    if(token=='hex'){
        let hex = []
        while(tokens[++index]!='\n'){
            hex.push(tokens[index])
        }
        activeAST.body.push({
            kind: 'hex',
            data: hex,
        })
    }
    if(MACROS[token]){
        const node = {
            kind: 'call',
            name: token,
            params: [],
        }
        activeAST.body.push(node)
        const params = []
        while(tokens[++index]!='\n'){
            if(tokens[index]!=','){
                params.push(tokens[index])
            }
        }
        node.params = params
    }
    if(token=='if'){
        let left = tokens[++index]
        let cond = tokens[++index]
        if(tokens[index+1]=='='){
            cond += tokens[++index]
        }
        let right = tokens[++index]
        const node = {
            kind: 'if',
            parent: activeAST,
            cond: {
                left,cond,right,
            },
            body: [
                {body: []},
                {body: []}
            ],
        }
        activeAST.body.push(node)
        node.body[0].parent = node
        node.body[1].parent = node
        activeAST = node.body[0]
        //index++
    }
    if(token=='else'){
        activeAST = activeAST.parent.body[1]
    }
    if((token=='end')&&(tokens[index+1]=='if')){
        activeAST = activeAST.parent.parent
        index++
    }
}

let hex = ''
let PARAMS = []


function parseIntToHex(value, bytes) {
    const b = BigInt(bytes);
    const mask = (1n << (8n * b)) - 1n;
    let v = BigInt(value);
    // two's complement — działa dla minusów automatycznie
    v &= mask;
    return v.toString(16).padStart(bytes * 2, "0").toUpperCase();
}

function parseUnsignedToHex(value, bytes) {
    value = value.replace('u','')
    const b = BigInt(bytes);
    const mask = (1n << (8n * b)) - 1n;
    // wymuszenie zakresu unsigned
    const v = BigInt(value) & mask;
    return v.toString(16).padStart(bytes * 2, "0").toUpperCase();
}

function parseFloatToHex(value, bytes) {
    value = value.replace('f','')
    const buffer = new ArrayBuffer(bytes);
    const view = new DataView(buffer);
    if (bytes === 4) {
        view.setFloat32(0, value, false); // big-endian
    } else if (bytes === 8) {
        view.setFloat64(0, value, false); // big-endian
    } else {
        throw new Error("Float must be 4 or 8 bytes");
    }
    let hex = "";
    for (let i = 0; i < bytes; i++) {
        hex += view.getUint8(i).toString(16).padStart(2, "0");
    }
    return hex.toUpperCase();
}

function hexToLE(hex) {
    // usuń ewentualne "0x"
    hex = hex.replace(/^0x/, "").toLowerCase();
    // dopaduj do pełnych bajtów (parzysta liczba znaków)
    if (hex.length % 2 !== 0) {
        hex = "0" + hex;
    }
    // rozbij na bajty
    const bytes = hex.match(/.{2}/g);
    // odwróć kolejność bajtów → LE
    return bytes.reverse().join("");
}



function parseDataType(value,bytes){
    if((value.indexOf('.')>-1)||value.endsWith('f')){
        return hexToLE(parseFloatToHex(value,bytes))
    }else if(value.endsWith('u')){
        return hexToLE(parseUnsignedToHex(value,bytes))
    }
    return hexToLE(parseIntToHex(value,bytes))
}

function executeAST(node){
    function data(name){
        //console.log('data(name): ',name,params)
        for(let idx=PARAMS.length-1;idx>=0;idx--){
            const params = PARAMS[idx]
            let index = 0
            while(params[0][index]){
                if(params[0][index]==name){
                    return params[1][index]
                }
                index++
            }
        }
        return name
    }

    if(node.body){
        for(const n of node.body){
            if(n.kind=='hex'){
                hex += n.data.map(d=>{
                    return data(d)
                }).join(' ')+'\n'
            }
            if(n.kind=='call'){
                PARAMS.push([MACROS[n.name].params,n.params])
                executeAST(MACROS[n.name])
            }
            if(n.kind=='if'){
                if(eval(data(n.cond.left)+n.cond.cond+data(n.cond.right))){
                    executeAST(n.body[0])
                }else{
                    executeAST(n.body[1])
                }
            }
            if(Object.keys(dataTypes).includes(n.kind)){
                n.params.map(p=>{
                    const bytes = dataTypes[n.kind]
                    hex += parseDataType(p,bytes)+'\n'
                })
            }
        }
        PARAMS.splice(PARAMS.length-1,1)
    }
}

executeAST(AST)

fs.writeFileSync('./hex.txt',hex)


function removeParents(node){
    delete node.parent
    if(node.body){
        node.body = node.body.map(n=>{
            return removeParents(n)
        })
    }
    return node
}

console.log(removeParents(AST))

fs.writeFileSync('./AST.json',JSON.stringify(AST,null,4))