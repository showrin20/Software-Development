// Question: Write a program that generates a multiplication table for a given number using a for loop.
function multiplicationTable(num){
      var result=[]
      for (i = 0; i < 11; i++) {
            result.push(i * num)
         
            
}
for (i = 1; i <= 10; i++) {
    namta = num + " x " + i + " = " +result[i]; //concat string
  console.log(namta);
}


}
num=55
console.log(multiplicationTable(num))
