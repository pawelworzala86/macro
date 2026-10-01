const fs = require('fs')
const convert = require('./convert.js')

const instructions = require('./instructions.js')
const parseInstruction = require('./mnemonic.js')
const opcode = require('./opcode.js')

const asmInstructs = {}
instructions.map(instr=>{
    const mnemonic = instr.mnemonic
    const params = instr.mnemonic.indexOf(',')>-1
    asmInstructs[mnemonic.split(' ')[0]] = params?2:1
})
const asmCmds = Object.keys(asmInstructs)




const sourceFileName = process.argv[2].replace(/\'|\"/gm,'') //'./examples/test.inc'
const destFileName = process.argv[3].replace(/\'|\"/gm,'') //'./dist/test.txt'


if(!fs.existsSync('./cache')){
    fs.mkdirSync('./cache')
}
if(!fs.existsSync('./dist')){
    fs.mkdirSync('./dist')
}

let source = fs.readFileSync(sourceFileName).toString()
source = source.replace(/\;.*/gm,'')

const tokens = source.split(/\ |(\n)|\r|(\=)|(\,)|(\:)/gm).filter(f=>f?(f.length):false)
tokens.push('\n')

console.log(tokens)

const dataTypes = {dq:8,dd:4,dw:2,db:1}

const AST = {
    kind: 'root',
    body: [],
}
let activeAST = AST

const MACROS = {}

function readCommaSeparatedParams(tokenList, startIndex){
    const params = []
    let current = []
    let index = startIndex

    while(index < tokenList.length && tokenList[index] !== '\n'){
        if(tokenList[index] === ','){
            if(current.length){
                params.push(current.join(' '))
                current = []
            }
            index++
            continue
        }
        current.push(tokenList[index])
        index++
    }

    if(current.length){
        params.push(current.join(' '))
    }

    return { params, nextIndex: index }
}

for(let index=0;index<tokens.length;index++){
    const token = tokens[index]

    if(Object.keys(dataTypes).includes(token)){
        const { params, nextIndex } = readCommaSeparatedParams(tokens, index + 1)
        index = nextIndex
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
        const { params, nextIndex } = readCommaSeparatedParams(tokens, index + 2)
        index = nextIndex
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
        const { params, nextIndex } = readCommaSeparatedParams(tokens, index + 1)
        index = nextIndex
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
    if(token=='='){
        const name = tokens[index-1]
        let value = []
        while(tokens[++index]!=='\n'){
            value.push(tokens[index])
        }
        const node = {
            kind: 'assign',
            name,
            value: value.join(' '),
        }
        activeAST.body.push(node) 
    }
    if(token==':'){
        const name = tokens[index-1]
        const node = {
            kind: 'label',
            name,
        }
        activeAST.body.push(node)
    }
    if(token=='ALGIN'){
        const value = tokens[++index]
        const node = {
            kind: 'ALGIN',
            value,
        }
        activeAST.body.push(node)
    }
    if(asmCmds.includes(token)){
        const name = token
        const values = [tokens[++index]]
        index++
        if(tokens[index]==','){
            const param2 = tokens[++index]
            values.push(param2)
        }
        const node = {
            kind: 'asm',
            name,
            values,
        }
        console.log('ASM node',node)
        activeAST.body.push(node)
    }
    /*if(token=='iDATA'){
        const node = {
            kind: 'iDATA',
        }
        activeAST.body.push(node)
    }
    if(token=='dDATA'){
        const node = {
            kind: 'dDATA',
        }
        activeAST.body.push(node)
    }*/
}

let totalOFFSET = 0
let hex = ''
let PARAMS = []
let DATASET = {
    OFFSET: 0,
}
let iatOffset = 0

function addHex(value){
    const clear = value.replace(/\ |\n|\r|\t/gm,'').trim()
    //console.log('addHex',clear)
    DATASET['OFFSET'] += clear.length/2
    totalOFFSET += clear.length/2
    hex += clear
}



const REPLS = []

function parseDataType(value,bytes){
    let val = data(value)
    if(val!==value){
        value = val
    }

    const resolvedMath = parseMath(value)
    if(resolvedMath !== undefined && resolvedMath !== value && !Number.isNaN(Number(resolvedMath))){
        value = String(resolvedMath)
    }

    value = value.toString()

    if((!['"',"'"].includes(value[0]))&&((value.indexOf('.')>-1)||value.endsWith('f'))){
        return convert.hexToLE(convert.parseFloatToHex(value,bytes))
    }else if(value.endsWith('u')){
        return convert.hexToLE(convert.parseUnsignedToHex(value,bytes))
    }else if(parseInt(value)||(value=='0')){
        return convert.hexToLE(convert.parseIntToHex(value,bytes))
    }else if(value.startsWith("'")&&value.endsWith("'")){
        return convert.stringToHex(value)
    }
    
    REPLS.push({
        ext: value,
        OFFSET: totalOFFSET,//DATASET['OFFSET'],
    })
    return '00000000'
}

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
    if(DATASET[name]!==undefined){
        return DATASET[name]
    }
    return name
}

function executeAST(node){
    if(node.body){
        for(const n of node.body){
            if(n.kind=='hex'){
                addHex(n.data.map(d=>{
                    return data(d)
                }).join(' ')+'\n')
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
                    console.log(':::',p,bytes)
                    addHex(parseDataType(p,bytes)+'\n')
                })
            }
            if(n.kind=='assign'){
                let parsedData = n.value
                if(parseInt(n.value)||(n.value=='0')){
                    parsedData = parseInt(n.value)
                }
                DATASET[n.name] = parsedData
            }
            if(n.kind=='label'){
                DATASET[n.name] = DATASET['OFFSET'] //- iatOffset
            }
            if(n.kind=='ALGIN'){
                const value = n.value
                const paddingCount = (value - (totalOFFSET % value)) % value
                let code = ''
                for(let i = 0; i < paddingCount; i++){
                    code += '00'
                }
                addHex(code+'\n')
            }

            if(n.kind=='asm'){
                const cmd = n.name
                let params = n.values
                const instruct = parseInstruction(cmd+' '+params.join(', '))
                const code2 = opcode.encode(instruct, params);
                console.log(code2)
                if(cmd=='call'){
                    params = params.map(p=>{
                        if((p.indexOf('[0x')==-1)&&(p[0]=='[')){
                            let value = p.substring(1,p.length-1)
                            console.log(value)
                            REPLS.push({
                                kind: 'callFunc',
                                ext: value,
                                OFFSET: totalOFFSET + (code2.length-4),
                                callOFFSET: DATASET['OFFSET'],
                                length: code2.length,
                            })
                            return '00000000'
                        }else{
                            return p
                        }
                    })
                }else{
                    params = params.map(p=>{
                        if((p.indexOf('[0x')==-1)&&(p[0]=='[')){
                            let value = p.substring(1,p.length-1)
                            console.log(value)
                            REPLS.push({
                                kind: 'callData',
                                ext: value,
                                OFFSET: totalOFFSET + (code2.length-4),
                                callOFFSET: DATASET['OFFSET'],
                                length: code2.length,
                            })
                            return '00000000'
                        }else{
                            return p
                        }
                    })
                }
                console.log(params)
                const code = code2.join('')//.replace(/\,/gm,' ')
                addHex(code+'\n')
            }

            /*if(n.kind=='iDATA'){
                iatOffset = 2
            }
            if(n.kind=='dDATA'){
                iatOffset = 0
            }*/
        }
        PARAMS.splice(PARAMS.length-1,1)
    }
}

executeAST(AST)

function parseMath(d){
    if(d===undefined||d===null){
        return d
    }

    let expr = d.toString().trim()
    if(!expr){
        return d
    }

    const normalized = expr.replace(/([+\-*/%()])/g,' $1 ').replace(/\s+/g,' ').trim()
    const tokens = normalized.split(/\s+/).filter(Boolean)

    if(tokens.length > 1 || /[+\-*/%()]/.test(expr)){
        const resolved = tokens.map(part => {
            if(/[+\-*/%()]/.test(part)){
                return part
            }
            const value = data(part)
            if(value === part){
                return part
            }
            return parseMath(value)
        }).join(' ')

        try {
            return eval(resolved)
        }catch(err){
            return d
        }
    }

    return d
}


const RVA_TEXT_START = 0x1000;
console.log(REPLS)
console.log(hex.length)

for(const RP of REPLS){
    let off = 0

    console.log('RP.ext',RP.ext)
    let dat = data(RP.ext)
    dat = parseMath(dat)

    let leftInsertOffset = 2

    console.log('dat',dat)

    if(RP.kind&&(RP.kind=='callData')){
        const stringHelloRva = dat//DATASET['helloTxt']
        const ripAfterLea    = RVA_TEXT_START + RP.callOFFSET + RP.length
        const offsetToHello  = stringHelloRva - ripAfterLea;

        dat = convert.hexToLE(convert.parseIntToHex(offsetToHello,4))
        //if(RP.ext=='kernel32_dll_name'){
        console.log('dat',dat, RP.ext)
          //  process.exit()
        //}
        //process.exit()

        leftInsertOffset = 1
    }else if(RP.kind&&(RP.kind=='callFunc')){
        const stringHelloRva = dat//DATASET['helloTxt']
        const ripAfterLea    = RVA_TEXT_START + RP.callOFFSET + RP.length
        const offsetToHello  = stringHelloRva - ripAfterLea;

        dat = convert.hexToLE(convert.parseIntToHex(offsetToHello,4))
        console.log('dat',dat)
        //process.exit()

        leftInsertOffset = 1
    }else{
        dat = convert.hexToLE(convert.parseIntToHex(dat,4))
    }

    console.log('dat',dat)

    //for(let index=0;index<hex.length;index++){
        //if(!['\r','\n','\ '].includes(hex.charAt(index))){
        //    off+=0.5
        //}
        //if(off==RP.OFFSET){
            hex = hex.slice(0, RP.OFFSET*2) + dat + hex.slice(RP.OFFSET*2+8);
           // index+=8
        //}
    //}

    console.log('A')
}



console.log('A')

if(destFileName.indexOf('.exe')>-1){
    const chex = hex.replace(/\ |\n|\r|\t/gm,'')
    const uint8 = Uint8Array.from(Buffer.from(chex, 'hex'));
    fs.writeFileSync(destFileName, uint8)
    fs.writeFileSync(destFileName.replace('.exe','.txt'),hex)
}else{
    fs.writeFileSync(destFileName,hex)
}

/*
function removeParents(node){
    delete node.parent
    if(node.body){
        node.body = node.body.map(n=>{
            return removeParents(n)
        })
    }
    return node
}*/

//console.log(removeParents(AST))

fs.writeFileSync('./cache/AST.json',JSON.stringify(AST,null,4))

console.log(DATASET)
//console.log(REPLS)


/*
if(DATASET['kernel32_dll_name']){
    const stringHelloRva = DATASET['kernel32_dll_name']
    const ripAfterLea    = RVA_TEXT_START + 0x11 + 6;
    const offsetToHello  = stringHelloRva// - ripAfterLea;
    //const offsetToHello = RVA_TEXT_START
    //writeUInt32LE(code, offsetToHello, 0x0B, 'RIP-rel offset do "Hello World!"');
    let val = convert.hexToLE(convert.parseIntToHex(offsetToHello.toString(),4))
    console.log(val)
}*/