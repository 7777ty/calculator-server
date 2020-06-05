
const toRPlish=require('./toRPolish');
const publicConstant =require('../helper/constant');
const publicVariable =require('../helper/variable');

var onComputed =function(expression) {
    console.log('1111');
    console.log(expression);
    expression=toRPlish(expression);
    console.log('2222');
    console.log(expression);
    let result='';
    expression.forEach((e)=>{
        if(!(publicConstant.operatorString.includes(e))){
            publicVariable.numberStack.push(e);
        } else {
            const number1=parseFloat(publicVariable.numberStack.pop());
            const number2=parseFloat(publicVariable.numberStack.pop());
            let sum=0;
            switch (e) {
                case '+':{
                    sum=number1+number2;
                    publicVariable.numberStack.push(sum);
                    break
                }
                case '-':{
                    sum=number2-number1;
                    publicVariable.numberStack.push(sum);
                    break
                }
                case '*':{
                    sum=parseFloat((number1*number2).toFixed(10));
                    publicVariable.numberStack.push(sum);
                    break
                }
                case '/':{
                    if (number1===0){
                        throw new Error("除数为0");
                        break;
                    }
                    sum=number2/number1;
                    publicVariable.numberStack.push(sum);
                    break;
                }
                case '%':{
                    if (!(Number.isInteger(number2)&&Number.isInteger(number1))){
                        throw new Error("求余运算两边是小数");
                        break;
                    }
                    if(number1=== 0){
                        throw new Error("求余运算分母是0");
                        break;
                    }
                    sum=number2%number1;
                    publicVariable.numberStack.push(sum);
                    break;
                }
            }
        }
    });
    result=publicVariable.numberStack.pop();

    publicVariable.suffixExpression=[];
    return result
}
module.exports=onComputed;

