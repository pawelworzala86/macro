macro test paramA, paramB
    hex paramA 00 00 00
    if 1==0
        hex 10
    else
        hex 11
    end if
    macro test2 paramAA
        if paramAA==undefined
            hex 99
        end if
    end macro
    test2
end macro

test 01 08
test 22 07

dd 100
dd 100u
dd 100.12

VALA = 100

dd testFunc

testFunc:

dd VALA,64