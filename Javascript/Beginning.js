////Coding challenge #1. Coding challenge #1: Print numbers from 1 to 10
for (i = 0; i < 11; i++) {
  console.log(i);
}

//Coding challenge #2. Coding challenge #2: Print the odd numbers less than 100
for (i = 0; i <= 100; i++) {
  if (i % 2 == 0) {
    console.log(i);
  }
}
// Coding challenge #3: Print the multiplication table with 7
for (i = 1; i <= 10; i++) {
  namta = "7 * " + i + " = " + 7 * i; //concat string
  console.log(namta);
}

for (i = 1; i <= 10; i++) {
  console.log(i * 7);
}

// Coding challenge #4: Print all the multiplication tables with numbers from 1 to 10
function numTab(num) {
  for (var i = 1; i <= 10; i++) {
    var result = num + "*" + i + " = " + num * i;
    console.log(result);
  }
}
for (var j = 1; j <= 10; j++) {
  numTab(j);
}

// #5: Calculate the sum of numbers from 1 to 10
var result = 0;
for (var i = 1; i < 11; i++) {
  result = result + i;
}
console.log(result);

// Coding challenge #6: Calculate 10!
var result = 1;
for (var i = 1; i < 11; i++) {
  result = result * i;
}
console.log(result);

// Coding challenge #7: Calculate the sum of odd numbers greater than 10 and less than 30
var result = 0;
for (i = 11; i < 30; i = i + 2) {
  result = result + i;
  console.log(i);
}
console.log(result);
// Coding challenge #8: Create a function that will convert from Celsius to Fahrenheit
function conversion(num) {
  var result = (num * 9) / 5 + 32;
  return result;
}
console.log(conversion(20));
// Coding challenge #9: Create a function that will convert from Fahrenheit to Celsius
function conveTwo(num) {
  var result = (num - 32) * (5 / 9);
  return result;
}
console.log(conveTwo(68));

// Coding challenge #10: Calculate the sum of numbers in an array of numbers
function summ(myarr) {
  var result = 0;
  for (i = 0; i < myarr.length; i++) {
    result = result + myarr[i];
  }
  return result;
}
myarr = [2, 3, -1, 5, 7, 9, 10, 15, 95];
console.log(summ(myarr));

// Coding challenge #11: Calculate the average of the numbers in an array of numbers

function avgg(myarr) {
  var result = 0;
  for (i = 0; i < myarr.length; i++) {
    result = result + myarr[i];
  }
  return result / myarr.length;
}
myarr = [1, 3, 9, 15, 90];
console.log(avgg(myarr));

// Coding challenge #12: Create a function that receives an array of numbers and returns an array containing only the positive numbers

function getPo(myarr) {
  var result = 0;
  var newArr = [];
  for (i = 0; i < myarr.length; i++) {
    if (myarr[i] > 0) {
      newArr.push(myarr[i]);
    }
  }
  return newArr;
}
myarr = [-5, 10, -3, 12, -9, 5, 90, 0, 1];
console.log(getPo(myarr));

// Coding challenge #13: Find the maximum number in an array of numbers

function maxNum(myarr) {
  var result = myarr[0];
  for (i = 0; i < myarr.length; i++) {
    if (myarr[i] > result) {
      result = myarr[i];
    }
  }
  return result;
}
myarr = [-5, 10, -3, 12, -9, 5, 90, 0, 1];
console.log(maxNum(myarr));

// Coding challenge #16: Create a function that will return a Boolean specifying if a number is prime
function isPrime(num) {
  for (i = 2; i < num; i++) {
    if (num % i == 0) {
      return false;
    }
  }
  return true;
}
console.log(isPrime(7));

// Coding challenge #17: Calculate the sum of digits of a positive integer number
function sumPo(num) {
  var result = 0;
  while (num > 0) {
    result = result + (num % 10);
    num = parseInt(num / 10);
  }
  return result;
}
console.log(sumPo(1235231));

// Function prints the first nPrimes numbers
function nPrime(numm) {
  for (j = 1; j <= numm; j++) {
    if (isPrime(j) == true) {
      console.log(j);
    }
  }
}
// Coding challenge #18: Print the first 100 prime numbers
console.log(nPrime(100));

// Coding challenge #28: Calculate the sum of first 100 prime numbers
function sumPrime(numm) {
  result = 0;
  for (j = 1; j <= numm; j++) {
    if (isPrime(j) == true) {
      result = result + j;
    }
  }
  return result;
}
console.log(sumPrime(100));

// Coding challenge #19: Create a function that will return in an array the first "nPrimes" prime numbers greater than a particular number "startAt"
function getPrime(startAt, numm) {
  for (j = startAt; j <= numm; j++) {
    if (isPrime(j) == true) {
      console.log(j);
    }
  }
}

console.log(getPrime(10, 100));

// Coding challenge #14: Print the first 10 Fibonacci numbers without recursion
// Coding challenge #15: Create a function that will find the nth Fibonacci number using recursion

// Coding challenge #20: Rotate an array to the left 1 position
function rotateArray(myArr) {
  shifted = myArr.shift();
  myArr.push(shifted);
  return myArr;
}
myArr = [10, 20, 30, 40];
console.log(rotateArray(myArr));

// Coding challenge #22: Reverse an array
function reverseArray(myArr) {
  return myArr.reverse();
}
myArr = [10, 20, 30, 40];
console.log(reverseArray(myArr));

// Coding challenge #21: Rotate an array to the right 1 position
function rotateArray(myArr){
    popped=myArr.pop()
    myArr.unshift(popped)
    return myArr
}

myArr=[1,2,3]
console.log(rotateArray(myArr))
// Coding challenge #23: Reverse a string
function reverseStr(mystr) {
  return mystr.split("").reverse().join("");
}

mystr = "JavaScript";
console.log(reverseStr(mystr));

// Coding challenge #24: Create a function that will merge two arrays and return the result as a new array
function mergeArr(arr1, arr2) {
  return arr1.concat(arr2);
}

arr1 = [1, 2, 3];
arr2 = [4, 5, 6];
console.log(mergeArr(arr1, arr2));


// Coding challenge #35. Create a function to convert a CSV text to a “bi-dimensional” array

// [["John","Smith","954-000-0000"],["Mich","Tiger","305-000-0000"],["Monique","Vasquez","103-000-0000"]]

function csvToArray(text) {
    var rows = text.trim().split('\n');
    console.log(rows)
    var arr = rows.map(row => row.split(';'));
  
  
    return arr;
  }
  var csv = "John;Smith;954-000-0000\nMich;Tiger;305-000-0000\nMonique;Vasquez;103-000-0000";;
  var arr = csvToArray(csv);
  console.log(arr)


