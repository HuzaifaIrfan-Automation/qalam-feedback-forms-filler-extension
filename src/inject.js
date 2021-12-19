function fill_form(ratings, text_message, submit_state) {
  // Odoo Qalam Nust Feedback Filler

  // Developed By a Mechanic from ME11 SMME NUST

  // value of rating
  // 2 for Excellent
  // 0 for Average
  // 1 for Poor
  // 3 for Very Good
  // 4 for Good
  var ratelabel = ["Average", "Poor", "Excellent", "Very Good", "Good"];

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

  var radios = document.getElementsByTagName("input");
  var textareas = document.getElementsByTagName("textarea");

  var nochecked = 0;

  for (var k = 0; k < 5; k += 1) {
    var random = Math.floor(Math.random() * ratings.length);
    // console.log(random);

    var rated = [];

    var ratingnow = ratings[random];
    var checknow = ratingnow;
    // console.log(ratingnow);

    // console.log(checknow);

    for (var i = 0; i < radios.length / 5; i += 1) {
      // if(i  == checknow){

      rated.push(checknow);

      //   console.log(rated);

      try {
        var radio = radios[checknow];
        radio.checked = true;
      } catch (e) {
        // statements to handle any exceptions
        console.error(e); // pass exception object to error handler
      }

      nochecked = nochecked + 1;
      console.log(`Checked ${checknow} Radio`);

      checknow = checknow - ratingnow;
      //   console.log(checknow);
      checknow = checknow + 5;
      //   console.log(checknow);

      random = Math.floor(Math.random() * ratings.length);
      ratingnow = ratings[random];

      //   console.log(ratingnow);

      checknow = checknow + ratingnow;

      //   console.log(checknow);
      //   console.log(ratelabel[ratingnow]);

      //  }
    }
    console.log(`No. of checked radios ${nochecked}`);
  }

  for (var i = 0; i < textareas.length; i++) {
    var textarea = textareas[i];
    textarea.innerText = text_message;
    console.log(`Text Area Filled ${text_message}`);
  }

  if (nochecked > 0) {
    if (submit_state) {
      submit_form();
      //   console.log("To be Submitted");
    } else {
      //   console.log(" Not be Submitted");
    }

    return true;
  } else {
    return false;
  }
}

function submit_form() {
  var submit_btn = document.getElementsByName("button_submit")[0];
 
  setTimeout(() => {
    submit_btn.click();
  }, 100);
}

function openInNewTab(url) {
  var win = window.open(url, "_blank");
  self.focus();
  // window.focus();
  // win.focus();
}

function open_feedback_forms() {
  var links = document.querySelectorAll("a[class='md-list-addon-element']");

  var feed_back_links = [];
  for (var i = 0; i < links.length; i++) {
    // console.log(links[i]);
    var href = links[i].href;
    feed_back_links.push(href);
    // openInNewTab(href)

    // links[i].click();
  }
  console.log(feed_back_links);
  return feed_back_links;
}

function close_tab() {
  window.close();
}

var pathArray = window.location.pathname.split("/");
console.log(pathArray);

(function () {
  console.log("Odoo Qalam Nust Feedback Filler Injected");
  console.log("Developed By a Mechanic from ME11 SMME NUST");

  chrome.runtime.onMessage.addListener(function (
    recieved,
    sender,
    sendResponse
  ) {
    var op = recieved.op;
    var response = false;
    if (pathArray[1] == "survey") {

      if (op == 5) {
        submit_form()
        response = true;
      }
      if (op == 3) {
        close_tab();
        response = true;
      }

      if (op == 2) {
        var ratings = recieved.ratings;
        var text_message = recieved.text_message;
        var submit_state = recieved.submit_state;

        console.log(`Recieved: \n Comments: ${text_message} \n Ratings`);

        console.log(ratings);

        console.log(`\n Submit State: ${submit_state}`);

        response = fill_form(ratings, text_message, submit_state);
      }
    }

    if (pathArray[3] == "feedback") {
      if (op == 1) {
        var feed_back_links = open_feedback_forms();
        response = feed_back_links;
      }

      //Refresh page and get rid of form
      if (op == 4) {
        window.location.reload();
        response = true;
      }
    }

    sendResponse(response);
  });
})();
