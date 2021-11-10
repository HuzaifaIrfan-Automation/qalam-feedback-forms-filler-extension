


// value of rating
// 2 for Excellent
// 0 for Average
// 1 for Poor
// 3 for Very Good
// 4 for Good
var ratelabel=['Average','Poor','Excellent','Very Good','Good']





var textarea = document.getElementById('comments');
var checkboxes = document.querySelectorAll("input[type=checkbox]");
    


var text_message="..."
let ratings = [2,3]


try{

chrome.storage.local.get("qalam_feedback_comments_text", value =>{
    var qalam_feedback_comments_text = value.qalam_feedback_comments_text
    text_message=qalam_feedback_comments_text
    textarea.value = text_message
    console.log(text_message)
    
    

})


chrome.storage.local.get("qalam_feedback_ratings", value =>{
    var qalam_feedback_ratings = value.qalam_feedback_ratings
   console.log(qalam_feedback_ratings)


   for (let i in qalam_feedback_ratings) {
var rating =qalam_feedback_ratings[i]
    console.log(rating)
   
    document.getElementById(String(rating)).checked = true;
    

  }



})




}catch{

    console.log('Cant get Chrome Storage Local Values')

    chrome.storage.local.set({"qalam_feedback_ratings":ratings})
    chrome.storage.local.set({"qalam_feedback_comments_text":text_message})

}








// function getSelectedCheckboxValues(){
//     const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
//     let ratings = [];
//     checkboxes.forEach((checkbox) => {
//         ratings.push(Number(checkbox.value));
//     });
    
//     return ratings
//     }
    
    

    checkboxes.forEach(function(checkbox) {
      checkbox.addEventListener('change', function() {
        ratings = 
          Array.from(checkboxes) // Convert checkboxes to an array to use filter and map.
          .filter(i => i.checked) // Use Array.filter to remove unchecked checkboxes.
          .map(i => Number(i.value)) // Use Array.map to extract only the checkbox values from the array of objects.
          
          chrome.storage.local.set({"qalam_feedback_ratings":ratings})

        console.log(ratings)
      })
    });
    











    function updateComments() {
        text_message = textarea.value;
    
        chrome.storage.local.set({"qalam_feedback_comments_text":text_message})
    
    }
    
    textarea.addEventListener('keyup', updateComments);
    
    




const fill_btn = document.querySelector('#fill');
fill_btn.addEventListener('click', (event) => {

    console.log(ratings)

    console.log(text_message)




    fill_form(ratings,text_message)
});














function fill_form(ratings,text_message){

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {ratings: ratings,text_message: text_message}, function(response){
     
        document.getElementById("response").innerText = response

    });
});


}



