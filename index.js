const fs = require('fs')
const convert = require('./convert.js')

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
    if(token=='='){
        const name = tokens[index-1]
        const node = {
            kind: 'assign',
            name,
            value: tokens[++index],
        }
        activeAST.body.push(node) 
    }
}

let OFFSET = 0
let hex = ''
let PARAMS = []
let DATASET = {}

function addHex(value){
    const clear = value.replace(/\ |\n|\r/gm,'')
    OFFSET += clear.length/2
    hex += value
}





function parseDataType(value,bytes){
    let val = data(value)
    if(val!==value){
        value = val
    }
    if((value.indexOf('.')>-1)||value.endsWith('f')){
        return convert.hexToLE(convert.parseFloatToHex(value,bytes))
    }else if(value.endsWith('u')){
        return convert.hexToLE(convert.parseUnsignedToHex(value,bytes))
    }else if(parseFloat(value)){
        return convert.hexToLE(convert.parseIntToHex(value,bytes))
    }
    return 'REPLS'
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
                    addHex(parseDataType(p,bytes)+'\n')
                })
            }
            if(n.kind=='assign'){
                DATASET[n.name] = n.value
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

console.log(DATASET)