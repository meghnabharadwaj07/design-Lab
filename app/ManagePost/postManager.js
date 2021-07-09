const ngoId="6af4b665-ab78-484e-97bb-1ea242515b17";
$( function() {
$('#picker').selectpicker('refresh')
})
$( function() {
    $('#Create').click(function() {
      var url = document.location.href;
    var postId = url.split('?')[1];
    if(!postId){
     const selected = document.querySelectorAll('#picker option:checked');
     const values = Array.from(selected).map(el => el.label);
     console.log(values);
        var data={
           "Name" : document.getElementById("name").value,
      "description" :document.getElementById("description").value, 
      "startDate":document.getElementById("startdate").value ,
      "endDate":document.getElementById("enddate").value ,
      "postItemList":values
        }
        
   var status=postData('http://localhost:7071/api/posts/6af4b665-ab78-484e-97bb-1ea242515b17', data)
         if(status) 
         {
           alert("Post Created");
         }

        return false;
    }
    else{
      const selected = document.querySelectorAll('#picker option:checked');
     const values = Array.from(selected).map(el => el.label);
     console.log(values);
        var data={
           "Name" : document.getElementById("name").value,
      "description" :document.getElementById("description").value, 
      "startDate":document.getElementById("startdate").value ,
      "endDate":document.getElementById("enddate").value ,
      "id":postId,
      "postItemList":values,
      "ngoId":ngoId

        }
        console.log(data);
      var status=updateData(`http://localhost:7071/api/posts/${postId}`, data)
        if(status) 
        {
          alert("Post Updated");
        }

       return false;
    }
    });
    $('#PostList').load('load',function() {
      getPost();
       
   });
   $('.container').load('load',function() {
    var url = document.location.href;
    var postId = url.split('?')[1];
    if(!postId)
    getData();
    else{
      getEdit(postId)
    }
     
 });
});
async function getEdit(postId)
{
  var response=await fetch(`http://localhost:7071/api/posts/${postId}`);
  var post=await response.json();
  
  document.getElementById("name").setAttribute('value',post[0].Name);
  document.getElementById("description").setAttribute('value',post[0].description);
  document.getElementById("startdate").setAttribute('value',post[0].startDate);
  document.getElementById("enddate").setAttribute('value',post[0].endDate);
 getData();
 ngoId=post[0].ngoId;
       
 
 


}
async function updateData(url , data ) {
 
  var response = await fetch(url, {
    method: 'PUT', 
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
    body: JSON.stringify(data) 
  });
 return response.status===204;
}
async function postData(url , data ) {
 
  var response = await fetch(url, {
    method: 'POST', 
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
    body: JSON.stringify(data) 
  });
 return response.ok;
}

async function getData(){
 var response=await fetch('http://localhost:7071/api/ngo/6af4b665-ab78-484e-97bb-1ea242515b17')

  var ngoProfile=await response.json()
  var list= ngoProfile[0].itemList;
    
  
  var options=""; 
  for(let i=0;i<list.length;i++)
  
  {
    options+="<option value='"+i+"'>"+list[i]+"</option>";
    
  }
  $("#picker").append(options);
  // To programmatically update the JavaScript selection, first select the selection, then use the refresh method to update the UI to match the new state. This is required when deleting or adding options, or when disabling/enabling selection via JavaScript.
$('#picker').selectpicker('refresh');
//The render method forces the renderer to be re-rendered - Select ui, which is useful if you change any of the associated values ​​while programming to affect the layout of the elements.
$('#picker').selectpicker('render');


}

async function getPost(){
  var response=await fetch('http://localhost:7071/api/posts/6af4b665-ab78-484e-97bb-1ea242515b17/ngo')
  
   var posts=await response.json()
   var postBody=document.getElementById("PostList");
   for(let i=0;i<posts.length;i++)
   {
     var postId= "createPostUI.html?"+posts[i].id;
     var donationId="../confirmPickup/ViewDonationUI.html?"+posts[i].id;
     var div=document.createElement("div");
     div.setAttribute("class","card");
     var img=document.createElement("img");
     img.setAttribute("src","donation1.png");
     img.setAttribute("alt","Avatar");
     img.setAttribute("style","width:100%");
     div.appendChild(img);
     var a=document.createElement("a");
     a.setAttribute("href",donationId);
     a.setAttribute("class","card-block clearfix")
     var row=document.createElement("div");
     row.setAttribute("class","row");
     var col=document.createElement("div");
     col.setAttribute("class","col-12");
     col.appendChild(document.createTextNode("card"))
     row.appendChild(col);
     a.appendChild(row);
     div.appendChild(a);
     var button=document.createElement("button");
     button.setAttribute("onclick",`location.href = '${postId}';`)
     var int=document.createElement("i");
     int.setAttribute("class","fa fa-plus-circle");
     int.setAttribute("style","font-size:15px;padding-left:10px");
     button.appendChild(int);
     var buttontext=document.createTextNode("Edit Post");
     button.appendChild(buttontext);
     div.appendChild(button);
     var divinside=document.createElement("div");
     divinside.setAttribute("class","container");
     var h4=document.createElement("h4");
     var b=document.createElement("b");
     var name=document.createTextNode(posts[i].Name);
     b.appendChild(name);
     h4.appendChild(b);
     divinside.appendChild(h4);
     var p= document.createElement("p");
     p.appendChild(document.createTextNode(posts[i].description));
     divinside.appendChild(p);
     div.appendChild(divinside);
     postBody.appendChild(div);
   }
   
 
 }

    
    
