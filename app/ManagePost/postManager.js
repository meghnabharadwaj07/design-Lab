window.onload = getData(); 
$( function() {
$('#picker').selectpicker('refresh')
})
$( function() {
    $('#Create').click(function() {
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
           alert("Donation Created");
         }

        return false;
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


