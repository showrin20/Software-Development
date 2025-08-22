function calculateFrames(){
    let name1=document.getElementById("name1").value;
    let name2 =document.getElementById("name2").value;

    if (!name1 || !name2){
        document.getElementById("result").innerHTML +"Please enter both names!";
        return;
    }
    for (let char  of name1)
        if (name2.includes(char)){
            name1=name2.replace(char,"");
            name2=name1.replace(char,"");
        }

        const totalLength = name1.length + name2.length;
        const flames =['F', 'L', 'A', 'M', 'E', 'S'];
        let index= 0;
        while (flames.length>1){
            index =(index+ totalLength-1)% flames.length;
            flames.splice(index,1);
        }

        let resultText ='';
        switch (flames[0]){
            case 'F':
                resultText ='Friends';
                break;
            case 'L':
                resultText ='Love';
                break;
            case 'A':           
                resultText ='Affection';
                break; 
            case 'M':
                resultText ='Marriage';
                break;
            case 'E':
                resultText ='Enemy';
                break;
            case 'S':                              
                resultText ='Siblings';
                break;
        }
        document.getElementById("result").innerHTML = document.getElementById('name1').value + ' and ' + document.getElementById('name2').value + ' are ' + resultText + '.'    ;
    }

