// Odoo Qalam Nust Feedback filler

// Developed By a Mechanic from ME11 SMME NUST


// value of rating
// 2 for excellent
// 0 for average
// 1 for Poor
// 3 for very good
// 4 for good
var ratelabel=['average','poor','excellent','very good','good']

// for all very good only
// var ratings=[3]

// for random very good and excellent
var ratings=[2,3]
// Fill the value of rating in array from random rating be selected to be filled in rows or keep default.



var text_message="..."

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

console.log('Odoo Qalam Nust Feedback filler')
console.log('Developed By a Mechanic from ME11 SMME NUST')


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

 console.log(checknow)
 console.log(ratelabel[ratingnow])


 }

}
console.log(`No. of checked radios ${nochecked}`)

for (var i = 0; i < textareas.length; i++) {
    var textarea =textareas[i]
    textarea.innerText=text_message
    console.log(`Text Area Filled ${text_message}`)   
}