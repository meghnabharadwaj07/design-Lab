
$( function() {
    $('#Create').click(function() {
      var url = document.location.href;
     var post = url.split('?')[1];  
    const name=document.getElementById("fname").value+" "+document.getElementById("lname").value;
    const address=document.getElementById("address1").value+" "+document.getElementById("address2").value+" "+document.getElementById("city").value
    +" "+document.getElementById("pincode").value+" "+document.getElementById("state").value+" "+document.getElementById("country").value;
    const selected = document.querySelectorAll('input[type=checkbox]:checked');
    const values = Array.from(selected).map(el => el.value);
   
      
        var data={
            "Name" : name,
            "description" :address, 
            "startDate":document.getElementById("startDate").value ,
            "endDate":document.getElementById("endDate").value ,
            "donorId":"74bf66dd-5e17-4171-8a58-f3912691b0fc",
            "postId":post,
            "itemList":values
        
        };
        var status=postData('http://localhost:7071/api/donation', data)
        if(status){
            alert("Donation Created")
        }
        

       return false;
   });
        
   $('.container').load('load',function() {
   getData();
    
});
$('.form').load('load',function() {
    var url = document.location.href;
    var postId = url.split('?')[1];
    getItemList(postId);
     
 });

 
    
});
async function postData(url , data ) {
 
    var response = await fetch(url, {
      method: 'POST', 
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
      body: JSON.stringify(data) 
    });
   return response.status===204;
  }
  
async function getData(){
    
    var response=await fetch('http://localhost:7071/api/posts')
   
     var postList=await response.json();
     console.log(postList);
     var ul = document.getElementById("card");
     
     for(let i=0;i<postList.length;i++)
     {
         var postId="donationPageUI.html?"+postList[i].id;
        var li = document.createElement("li");
        var elem = document.createElement("img");
        elem.setAttribute("src", "donation1.png");
        elem.setAttribute("class", "leftimg");
        elem.setAttribute("alt", "Avatar");
        li.appendChild(elem);
        var para = document.createElement("p");
        para.setAttribute("class", "fullclickheader");
        var paraimg=document.createElement("img");
        paraimg.setAttribute("src", "profile.png");
        paraimg.setAttribute("class", "headerimg");
        paraimg.setAttribute("width", "25px");
        paraimg.setAttribute("heigh", "25px");
        para.appendChild(paraimg);
        var paratext=document.createTextNode(postList[i].Name);
        para.appendChild(paratext);
        para.appendChild(paraimg);
        li.appendChild(para);
        var parades = document.createElement("p");
        var description=document.createTextNode(postList[i].description);
        parades.appendChild(description);
        li.appendChild(parades);
        var paradate = document.createElement("p");
        paradate.appendChild(document.createTextNode("StartDate : "));
        var st=document.createTextNode(postList[i].startDate);
        paradate.appendChild(st);
        paradate.appendChild(document.createTextNode(" to "));
        paradate.appendChild(document.createTextNode("EndDate : "));
        var ed=document.createTextNode(postList[i].endDate);
        paradate.appendChild(ed);
        li.appendChild(paradate);
        var link = document.createElement("a");
        link.setAttribute("href", postId);
        link.setAttribute("class", "main");
        var text=document.createTextNode("Click to Donate");
        link.appendChild(text);
        li.appendChild(link);
        var but = document.createElement("button");
        but.setAttribute("title", "click to close");
        but.setAttribute("aria-label", "click to close");
        var text1=document.createTextNode("x");
        but.appendChild(text1);
        li.appendChild(but);
        ul.appendChild(li);
     }
  
     
     
   
   }
   async function getItemList(postId){
      
    var response=await fetch(`http://localhost:7071/api/posts/${postId}`)
    var post=await response.json();
    var itemList=post[0].postItemList;
    var div= document.getElementById("ListOfItem");
    
    for(let i=0;i<itemList.length;i++)
    {
      var name=itemList[i];
      var check=document.createElement("input");
      check.setAttribute("type","checkbox");
      check.setAttribute("id",name);
      check.setAttribute("value",name);
      div.appendChild(check);
      var label=document.createElement("label");
      label.setAttribute("for",name);
      var text= document.createTextNode(name);
      label.appendChild(text);
      div.appendChild(label);
    }
   
   }