
# MERN-stack-Development
MERN stands for MongoDB, Express, React, Node, after the four key technologies that make up the stack.  MongoDB — document database Express(.js) — Node.js web framework React(.js) — a client-side JavaScript framework Node(.js) — the premier JavaScript web server


================================================
File: Javascript/readme.md
================================================
# JavaScript Practice 

## [Excercise](https://www.w3resource.com/javascript-exercises/)


================================================
File: Javascript/Assignment1.js
================================================
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


================================================
File: Javascript/Beginning.js
================================================
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




================================================
File: Javascript/Write a JavaScript program to display the current day and time in the following format.js
================================================
// Write a JavaScript program to display the current day and time in the following format.  
// Sample Output : Today is : Tuesday.
// Current time is : 10 PM : 30 : 38


today= new Date();
day=today.getDay();
day_list=["sunday","monday","tuesday","wednesday","thursaday","friday","saturday"]

console.log("Today is" ,day_list[day])

hour=today.getHours();
Minute=today.getMinutes();
Second=today.getSeconds();

 Prepand= (hour>=12) ?"PM" : "AM";
 hour= (hour>=12) ? hour-12 : hour
 if (hour ==0 && Prepand == "PM"){
     if (Minute==0 && Second==0){
         hour=12
         Prepand= "Noon"
     }
     else{
         hour=12
         Prepand= "PM"
     }
 }
 
  if (hour ==0 && prepand == "AM"){
     if (Minute==0 && Second==0){
         hour=12
         Prepand= "Midnight"
     }
     else{
         hour=12
         Prepand= "AM"
     }
 }
 
 console.log("Current Time: " + hour + Prepand + " : " + Minute + " : " + Second); 


================================================
File: Javascript/beginning2.js
================================================
// Coding challenge #25: Create a function that will receive two arrays of numbers as arguments and return an array composed of all the numbers that are either in the first array or second array but not in both




// Coding challenge #26: Create a function that will receive two arrays and will return an array with elements that are in the first array but not in the second 



// Coding challenge #27: Create a function that will receive an array of numbers as argument and will return a new array with distinct elements (no duplicates)

// Coding challenge #30-a: Create a function that will add two positive numbers of indefinite size. The numbers are received as strings and the result should be also provided as string.

// Coding challenge #53. Calculate 70! with high precision (all digits)



// Coding challenge #31a. Create a function that will return the number of words in a text

// Coding challenge #32. Create a function that will capitalize the first letter of each word in a text


// Coding challenge #33. Calculate the sum of numbers received in a comma delimited string


// Coding challenge #34. Create a function that will return an array with words inside a text


// Coding challenge #14: Print the first 10 Fibonacci numbers without recursion
// Coding challenge #15: Create a function that will find the nth Fibonacci number using recursion
// Coding challenge #52. Calculate Fibonacci(500) with high precision (all decimals)


================================================
File: Javascript/beginning3.js
================================================
// Coding challenge #36. Create a function that converts a string to an array of characters


// Coding challenge #37. Create a function that will convert a string in an array containing the ASCII codes of each character

// Coding challenge #38. Create a function that will convert an array containing ASCII codes in a string

// Coding challenge #39. Implement the Caesar cypher
// Decrypt a message by using the same encrypt function
// ... but using the inverse of the key (e.g. rotate in the other direction)
// Function will implement Caesar Cipher to
// encrypt / decrypt the msg by shifting the letters
// of the message acording to the key
// Modulo function: n mod p



// Coding challenge #40. Implement the bubble sort algorithm for an array of numbers


// Coding challenge #41. Create a function to calculate the distance between two points defined by their x, y coordinates


// Coding challenge #42. Create a function that will return a Boolean value indicating if two circles defined by center coordinates and radius are intersecting
// Calculate the distance between the two specified points


// Coding challenge 43. Create a function that will receive a bi-dimensional array as argument and a number and will extract as a unidimensional array the column specified by the number

// Coding challenge #44. Create a function that will convert a string containing a binary number into a number


// Coding challenge #45. Create a function to calculate the sum of all the numbers in a jagged array (array contains numbers or other arrays of numbers on an unlimited number of levels)


================================================
File: Javascript/beginning4.js
================================================
// Coding challenge #46-a. Find the maximum number in a jagged array of numbers or array of numbers
// Use recursion to find the maximum numeric value in an array of arrays
    // Cycle through all the elements of the array
        // If an element is of type array then invoke the same function
        // to find out the maximum element of that subarray

// Coding challenge #47. Deep copy a jagged array with numbers or other arrays in a new array


// Coding challenge #48. Create a function to return the longest word(s) in a string
// Get only the elements from specified positions from the array
// Returns an array with the words from specified text




// Coding challenge #49. Shuffle an array of strings
// Shuffle array implemented using Fisher–Yates shuffle algorithm
// Get a random int between min and max (both included)



================================================
File: Javascript/index.html
================================================
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Digital Clock</title>
  </head>
  <body>
    <div id="clock" onload="myClock()"></div>

    <style>
      body {
        background-image: url("../bg.jpg");
        background-size: cover;
        background-repeat: no-repeat;
        background-attachment: fixed;
        color: white;
        text-align: center;
        margin-top: 200px;
      }
      #clock {
        font-size: 100px;
        color: white;
        text-emphasis: bold;
      }
    </style>
    <script>
      function myClock() {
        var date = new Date();
        var hour = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();
        var session = "AM";
        if (hour == 0) {
          hour = 12;
        }
        if (hour >= 12) {
          hour = hour - 12;
          session = "PM";
        }
        var time = hour + ":" + min + ":" + sec + " " + session;

        document.getElementById("clock").innerHTML = time;
        setInterval(myClock, 1000);
      }

      document.getElementById("clock").innerHTML = myClock();
    </script>
  </body>
</html>


================================================
File: Javascript/bmi_calc/Readme.md
================================================
# BMI Calculator
## [click](https://bmi20.netlify.app/)



================================================
File: Javascript/bmi_calc/BMICalc.html
================================================
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="shortcut icon" href="images/logo.avif" type="image/x-icon" />
    <link rel="stylesheet" href="style.css" />
    <title>BMI Calculator</title>
  </head>
  <body>
    <center>
      <div class="bmi">
        <img src="images/bmi.gif" alt="" width="400px" style="opacity: 80%" />
        <table class="chart">
          <tr>
            <th>Underweight</th>
            <th>Normal</th>
            <th>Overweight</th>
            <th>obese</th>
          </tr>
          <tr>
            <td>Below 18.5</td>
            <td>18.5 - 24.9</td>
            <td>25.0 - 29.9</td>
            <td>30.0 and above</td>
          </tr>
        </table>
        <h1>BMI Calculator</h1>
        <label for="#heightinput">Height: </label>
        <input
          type="number"
          id="heightInput"
          placeholder="Height in feet"
        /><br />

        <label for="#weightinput">Weight: </label>
        <input
          type="number"
          id="weightInput"
          placeholder="weight in Kg"
        /><br />

        <button id="calculateBtn" onclick="calculate()">Calculate</button>
        <p id="result"></p>
      </div>
    </center>

    <script>
      var height, weight, bmi, result;

      function calculate() {
        height = document.getElementById("heightInput").value;
        height = height * 0.3048;
        weight = document.getElementById("weightInput").value;
        bmi = weight / (height * height);
        bmi = bmi.toFixed(2);
        result = document.getElementById("result");
        //error handling
        if (height == "" || weight == "") {
          alert("Please Enter Your Proper Height & Weight");
        } else if (height > 13 || weight > 500) {
          alert("Please Enter Your Proper Height & Weight");
        } else if (height < 0 || weight < 0) {
          alert("Please Enter Your Proper Height & Weight");
        } else {
          if (bmi > 30) {
            result.innerHTML = `Your BMI is ${bmi}  and you are obese.`;
          } else if (bmi > 25 && bmi < 29.9) {
            result.innerHTML = `Your BMI is  ${bmi}  and you are Overweight.`;
          } else if (bmi > 18.5 && bmi < 24.9) {
            result.innerHTML = `Your BMI is  ${bmi}  and you are Normal.`;
          } else {
            result.innerHTML = `Your BMI is  ${bmi}  and you are underweight.`;
          }
        }
      }
    </script>
  </body>
</html>


================================================
File: Javascript/bmi_calc/note.txt
================================================

BMI Calculator
BMI is a measurement of a person's leanness or corpulence based on their height and weight, and is intended to quantify tissue mass. It is widely used as a general indicator of whether a person has a healthy body weight for their height

Deployment
Use this Calculator

  https://bmi20.netlify.app/


================================================
File: Javascript/bmi_calc/style.css
================================================
body {
  background-image: url("images/bg2.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  color: blue;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  line-height: 1.5;
  margin: 0;
  padding: 0;
}
.bmi {
  background-color: #755023;
  opacity: 80%;
  color: white;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  line-height: 1.5;
  margin-left: 400px;
  margin-right: 400px;
  margin-top: 50px;
  margin-bottom: 20px;
  padding: 20px;
}
#heightInput {
  /* width: 100%;
  height: 100%; */
  border: 2px solid black;
  background-color: white;
  color: black;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 30px;
  padding: 5px;
}
#weightInput {
  /* width: 100%;
    height: 100%; */
  border: 2px solid black;
  background-color: white;
  color: black;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 30px;
  padding: 5px;
}
#calculateBtn {
  color: black;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  line-height: 1.5;
  border-radius: 10%;
  padding: 5px;
}
.chart {
  border: 2px solid black;
}
table,
th,
td {
  border: 1px solid black;
}


================================================
File: Javascript/bmi_calc/images/tt.txt
================================================



================================================
File: Javascript/digital/readme.md
================================================
# Digital Clock
## [click](https://digitalclock20.netlify.app/)


================================================
File: Javascript/digital/index.html
================================================
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Digital Clock</title>
  </head>
  <body>
    <div id="clock" onload="myClock()"></div>

    <style>
      body {
        background-image: url("../bg.jpg");
        background-size: cover;
        background-repeat: no-repeat;
        background-attachment: fixed;
        color: white;
        text-align: center;
        margin-top: 200px;
      }
      #clock {
        font-size: 100px;
        color: white;
        text-emphasis: bold;
      }
    </style>
    <script>
      function myClock() {
        var date = new Date();
        var hour = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();
        var session = "AM";
        if (hour == 0) {
          hour = 12;
        }
        if (hour >= 12) {
          hour = hour - 12;
          session = "PM";
        }
        var time = hour + ":" + min + ":" + sec + " " + session;

        document.getElementById("clock").innerHTML = time;
        setInterval(myClock, 1000);
      }

      document.getElementById("clock").innerHTML = myClock();
    </script>
  </body>
</html>


================================================
File: Javascript/digital/note.txt
================================================
https://digitalclock20.netlify.app/


================================================
File: React/Project1/Creating a TextUtils app.text
================================================
Some of its features will be:

Word Counting.
Removing Extra spaces.
Capitalizing the text of the document.
Adding Lowercase and uppercase to the text.


================================================
File: components/MyForm.js
================================================
import React from 'react';
import { TextInput, Checkbox, Button, Group, Box, Textarea,Space } from '@mantine/core';
import { useForm } from '@mantine/form';

export default function MyForm() {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      favoriteCourses: [],
      comment: '',
    },

    validate: {
      name: (value) => (value.trim() ? null : 'Name is required'),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      favoriteCourses: (value) => (value.length > 0 ? null : 'Select at least one favorite course'),
    },
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.currentTarget;
    const fieldValue = type === 'checkbox' ? checked : value;
    form.setFieldValue(name, fieldValue);
  };

  return (
    <div>
      <Box maw={300} mx="auto">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            withAsterisk
            label="Name"
            placeholder="Your name"
            name="name"
            value={form.values.name}
            onChange={handleChange}
            error={form.errors.name}
          />
      <Space h="md" />

          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            name="email"
            value={form.values.email}
            onChange={handleChange}
            error={form.errors.email}
          />
      <Space h="md" />

          <Checkbox.Group
            value={form.values.favoriteCourses}
            onChange={(values) => form.setFieldValue('favoriteCourses', values)}
            label="Select your favorite Course"
            description="This identifies your favorite course"
            withAsterisk
            error={form.errors.favoriteCourses}
          >
            <Group mt="xs">
              <Checkbox value="CSE110" label="CSE110" name="favoriteCourses" />
              <Checkbox value="CSE111" label="CSE111" name="favoriteCourses" />
              <Checkbox value="CSE220" label="CSE220" name="favoriteCourses" />
              <Checkbox value="CSE221" label="CSE221" name="favoriteCourses" />
              <Checkbox value="CSE422" label="CSE422" name="favoriteCourses" />
              <Checkbox value="CSE423" label="CSE423" name="favoriteCourses" />
            </Group>
          </Checkbox.Group>
          <Space h="md" />

          <Textarea
            placeholder="Your comment"
            label="Your comment"
            size="md"
            name="comment"
            value={form.values.comment}
            onChange={handleChange}
          />
      <Space h="md" />

          <Group position="right" mt="md\">
            <Button type="submit">Submit</Button>
          </Group>

        </form>
      </Box>
    </div>
  );
}


