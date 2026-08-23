macro test
    hex 00 00 00 00
    if 1==0
        hex 10
    else
        hex 11
    end if
end macro

test
test