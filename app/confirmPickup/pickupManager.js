var url = document.location.href;
var postId = url.split('?')[1];
$( function() {
   
        $('.fullclick').load('load',function() {
          getData();
           
       });
       
    });
    async function getData(){
        var response=await fetch(`http://localhost:7071/api/donation/${postId}/post`)
       
         var donations=await response.json()
         console.log(donations);
         var ul=document.getElementById("ul");
           for(let i=0;i<donations.length;i++)
           {  
               donorId=donations[i].donorId;
               var _donor=await fetch(`http://localhost:7071/api/donor/${donorId}`);
               var donor= await _donor.json();
               console.log(donor);
               var li= document.createElement("li");
               var div=document.createElement("div");
               div.setAttribute("class","leftimg");
               var img=document.createElement("img");
               img.setAttribute("src","donation1.png");
               img.setAttribute("alt","Avatar");
               div.appendChild(img);
               li.appendChild(div);

               var newdiv=document.createElement("div");
               newdiv.setAttribute("class","middle");
               var p=document.createElement("p");
               var b= document.createElement("b");
               var br=document.createElement("br");
               newdiv.appendChild(br);
               var text=document.createTextNode(donor[i].Name);
               b.appendChild(text);
               p.appendChild(b);
               newdiv.appendChild(p)
               newdiv.appendChild(br);
               var text1=document.createTextNode(`Contact number :${donor[i].phone}`);
               newdiv.appendChild(text1);
               var p1=document.createElement("p");
               var text2=document.createTextNode(`Contact email :${donor[i].email}`);
               p1.appendChild(text2)
               newdiv.appendChild(p1);
               newdiv.appendChild(br);
               var text3=document.createTextNode(`Contact address :${donor[i].address}`);
               newdiv.appendChild(text3);
               li.appendChild(newdiv);
               var enddiv=document.createElement("div");
               enddiv.setAttribute("class","end");
               var button1=document.createElement("button");
               button1.setAttribute("style","font-size:15px;position:absolute;right:270px;bottom:10px");
               var button1text=document.createTextNode("Approve");
               button1.appendChild(button1text);
               var int1=document.createElement("i");
               int1.setAttribute("class","fa fa-thumbs-up");
               button1.appendChild(int1);
               enddiv.appendChild(button1);

               var button2=document.createElement("button");
               button2.setAttribute("style","font-size:15px;position:absolute;right:195px;bottom:10px");
               var button2text=document.createTextNode("Reject");
               button2.appendChild(button2text);
               var int2=document.createElement("i");
               int2.setAttribute("class","fa fa-close");
               button2.appendChild(int2);
               enddiv.appendChild(button2);

               var button3=document.createElement("button");
               button3.setAttribute("style","font-size:15px;position:absolute;right:105px;bottom:10px");
               var button3text=document.createTextNode("Calendar");
               button3.appendChild(button3text);
               var int3=document.createElement("i");
               int3.setAttribute("class","fa fa-calendar");
               button3.appendChild(int3);
               enddiv.appendChild(button3);

               var button4=document.createElement("button");
               button4.setAttribute("style","font-size:15px;position:absolute;right:0px;bottom:10px");
               var button4text=document.createTextNode("Completed");
               button4.appendChild(button4text);
               var int4=document.createElement("i");
               int4.setAttribute("class","fa fa-check");
               button4.appendChild(int4);
               enddiv.appendChild(button4);

               
               
               
               li.appendChild(enddiv);
               ul.appendChild(li);
           }
         
         
           
        
       }