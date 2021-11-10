


function fill_form(ratings,text_message){

// Odoo Qalam Nust Feedback Filler

// Developed By a Mechanic from ME11 SMME NUST


// value of rating
// 2 for Excellent
// 0 for Average
// 1 for Poor
// 3 for Very Good
// 4 for Good
var ratelabel=['Average','Poor','Excellent','Very Good','Good']

// for all very good only
// var ratings=[3]

// for random very good and excellent
// var ratings=[2,3]
// Fill the value of rating in array from random rating be selected to be filled in rows or keep default.



// var text_message="..."

// Instructions
// Change Values Above to be filled
// Login to Qalam
// Go to feedback forms.
// Open any unfilled form
// Press f12 on keyboard ((or Right click and Inspect Element and go to 'Console' Tab))
// and Paste this whole text. and Enter.
// And form filled in milli seconds




var radios = document.getElementsByTagName('input');
var textareas = document.getElementsByTagName('textarea');



var nochecked=0

var random = Math.floor(Math.random() * ratings.length);

var rated=[]

var ratingnow =ratings[random]
var checknow=ratingnow

for (var i = checknow; i < radios.length; i+=1) {

 

    if(i  == checknow){

rated.push(checknow)
  
    var radio =radios[i]
    if (radio.type == 'radio' && !radio.checked) {
        radio.checked=true
        nochecked= nochecked +1
        console.log(`Checked ${i} Radio`)
    }else{
    console.log(`Already Checked ${i} Radio`)
    }


checknow=checknow-ratingnow
    checknow=checknow+5
    

 random = Math.floor(Math.random() * ratings.length)
 ratingnow =ratings[random]

 checknow=checknow+ratingnow

//  console.log(checknow)
 console.log(ratelabel[ratingnow])


 }

}
console.log(`No. of checked radios ${nochecked}`)

for (var i = 0; i < textareas.length; i++) {
    var textarea =textareas[i]
    textarea.innerText=text_message
    console.log(`Text Area Filled ${text_message}`)   
}


if(nochecked > 0){

    return true
}else{
    return false
}

}


(function() {




console.log('Odoo Qalam Nust Feedback Filler Injected')
console.log('Developed By a Mechanic from ME11 SMME NUST')


chrome.runtime.onMessage.addListener(
    function(recieved, sender, sendResponse) {

 
     
        var ratings = recieved.ratings
        var text_message= recieved.text_message

        console.log(`Recieved: \n Comments: ${text_message} \n Ratings`)

        console.log(ratings)
        
        filled = fill_form(ratings,text_message)

            sendResponse(filled);
        

        



    }
);
       

        


})();