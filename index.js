const fs = require('fs')

const source = fs.readFileSync('./macro.inc').toString()

const tokens = source.split(/\ |(\n)|\r|(\=)|\,/gm).filter(f=>f?(f.length):false)
tokens.push('\n')

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
            params: [],
            body: [],
        }
        index+=2
        const params = []
        while(tokens[index]!='\n'){
            params.push(tokens[index])
            index++
        }
        node.params = params
        activeAST.body.push(node)
        activeAST = node
        MACROS['test'] = node
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
            params: [],
        }
        activeAST.body.push(node)
        const params = []
        while(tokens[++index]!='\n'){
            params.push(tokens[index])
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
                PARAMS.push([MACROS['test'].params,n.params])
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