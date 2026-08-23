const fs = require('fs')

const source = fs.readFileSync('./macro.inc').toString()

const tokens = source.split(/\ |(\n)|\r/gm).filter(f=>f?(f.length):false)

console.log(tokens)

const AST = {
    kind: 'root',
    body: [],
}
let activeAST = AST

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
}

function executeAST(node){
    if(node.body){
        node.body.map(n=>{
            executeAST(n)
        })
    }
}

executeAST(AST)


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