const compareOperator =require('./compareOperator');

const toRPolish=function (input) {
    const numberString='0123456789';
    const operatorString='+-*/%';
    const S1=[]; //操作数栈
    const S2=[]; //运算符栈
    let flag=true;
    if(operatorString.includes(input[input.length-1])){
        input=input.substring(0, input.length - 1);
    }
    for (let i =0 ;i<input.length;i++){
        if(numberString.includes(input[i])){
            for(let j =i;j<input.length;j++){
                if(operatorString.includes(input[j])){
                    S1.push(input.slice(i,j));
                    if (S2.length===0 || !compareOperator(S2[S2.length-1],input[j])){
                        S2.push(input[j]);
                        flag=false;
                    }else if(compareOperator(S2[S2.length-1],input[j])){
                        flag=true;
                        S1.push(S2.pop());
                        while(flag){
                            if (S2.length===0 || !compareOperator(S2[S2.length-1],input[j])){
                                S2.push(input[j]);
                                flag=false;
                            }else if(compareOperator(S2[S2.length-1],input[j])){
                                S1.push(S2.pop());
                            }
                        }
                    }
                    i=j;
                    break;
                }else if(j===input.length-1){
                    S1.push(input.slice(i,j+1));
                    while (S2.length>0){
                        S1.push(S2.pop());
                    }
                    i=j;
                }
            }
        }
    }
    return S1;
}
module.exports=toRPolish;
