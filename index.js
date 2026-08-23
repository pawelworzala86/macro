const fs = require('fs')

const source = fs.readFileSync('./macro.inc').toString()

const tokens = source.split(/\ |(\n)|\r/gm).filter(f=>f?(f.length):false)

console.log(tokens)

const AST = {
    kind: 'root',
    body: [],
}
let activeAST = AST

const MACROS = {}

for(let index=0;index<tokens.length;index++){
    const token = tokens[index]

    if(token=='macro'){
        const node = {
            kind: 'macro',
            parent: activeAST,
            body: [],
        }
        activeAST.body.push(node)
        activeAST = node
        MACROS['test'] = node
        index++
    }
    if((token=='end')&&(tokens[index+1]=='macro')){
        activeAST = activeAST.parent
        index++
    }
    if(token=='hex'){
        let hex = ''
        while(tokens[++index]!='\n'){
            hex += tokens[index]
        }
        activeAST.body.push({
            kind: 'hex',
            data: hex,
        })
    }
    if(MACROS[token]){
        activeAST.body.push({
            kind: 'call',
        })
    }
}

let hex = ''

function executeAST(node){
    if(node.body){
        for(const n of node.body){
            if(n.kind=='hex'){
                hex += n.data+'\n'
            }
            if(n.kind=='call'){
                executeAST(MACROS['test'])
            }
        }
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