macro int separator value
    dq value
end macro

valA:int = 255

macro function name params*
    name:
        dq 255
    ;ret
end macro

function test(paramA, paramB){
    dq 255
}