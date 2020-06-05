const compareOperator=function (a, b) {
    if(a === '*' || a === '/' || a === '%'){
        return true
    }else if((a === '+' || a === '-') && ((b === '*' || b === '/' || b === '%'))){
        return false
    }

};


module.exports=compareOperator;
