const fs = require('fs')

const source = fs.readFileSync('./macro.inc').toString()

const tokens = source.split(/\ |(\n)|\r|(\=)/gm).filter(f=>f?(f.length):false)

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
    if((token=='end')&&(tokens[index+1]=='if')){
        activeAST = activeAST.parent.parent
        index++
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
            if(n.kind=='if'){
                if(eval(n.cond.left+n.cond.cond+n.cond.right)){
                    executeAST(n.body[0])
                }else{
                    executeAST(n.body[1])
                }
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