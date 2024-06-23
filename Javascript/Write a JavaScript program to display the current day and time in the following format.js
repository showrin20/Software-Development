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
