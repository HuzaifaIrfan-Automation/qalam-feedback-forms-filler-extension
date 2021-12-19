// value of rating
// 2 for Excellent
// 0 for Average
// 1 for Poor
// 3 for Very Good
// 4 for Good
var ratelabel = ["Average", "Poor", "Excellent", "Very Good", "Good"];

var textarea = document.getElementById("comments");
// var checkboxes = document.getElementsByClassName("ratings");

var checkboxes = document.querySelectorAll("input[class='ratings']");
var submit_switch = document.getElementById("submit_switch");

var text_message = "...";
var ratings = [2, 3];

textarea.value = text_message;
console.log(text_message);

for (let i in ratings) {
  var rating = ratings[i];
  console.log(rating);

  document.getElementById(String(rating)).checked = true;
}

try {
  chrome.storage.local.get("qalam_feedback_comments_text", (value) => {
    var qalam_feedback_comments_text = value.qalam_feedback_comments_text;

    if (qalam_feedback_comments_text != undefined) {
      text_message = qalam_feedback_comments_text;
      textarea.value = text_message;
      console.log(text_message);
    }
  });

  chrome.storage.local.get("qalam_feedback_ratings", (value) => {
    var qalam_feedback_ratings = value.qalam_feedback_ratings;
    console.log(qalam_feedback_ratings);

    if (qalam_feedback_ratings != undefined) {
      for (let i = 0; i < 5; i++) {
        document.getElementById(String(i)).checked = false;
      }

      ratings = qalam_feedback_ratings;

      for (let i in qalam_feedback_ratings) {
        var rating = qalam_feedback_ratings[i];
        console.log(rating);

        document.getElementById(String(rating)).checked = true;
      }
    }
  });
} catch {
  console.log("Cant get Chrome Storage Local Values");

  chrome.storage.local.set({ qalam_feedback_ratings: ratings });
  chrome.storage.local.set({ qalam_feedback_comments_text: text_message });
}

// function getSelectedCheckboxValues(){
//     const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
//     let ratings = [];
//     checkboxes.forEach((checkbox) => {
//         ratings.push(Number(checkbox.value));
//     });

//     return ratings
//     }

checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    ratings = Array.from(checkboxes) // Convert checkboxes to an array to use filter and map.
      .filter((i) => i.checked) // Use Array.filter to remove unchecked checkboxes.
      .map((i) => Number(i.value)); // Use Array.map to extract only the checkbox values from the array of objects.

    chrome.storage.local.set({ qalam_feedback_ratings: ratings });

    console.log(ratings);
  });
});

function updateComments() {
  text_message = textarea.value;

  chrome.storage.local.set({ qalam_feedback_comments_text: text_message });
}

textarea.addEventListener("keyup", updateComments);

var submit_state = false;

function set_submit_state() {
  submit_state = submit_switch.checked;
  console.log(submit_state);
}

submit_switch.addEventListener("change", set_submit_state);

const fill_all_forms_btn = document.querySelector("#fill_all_forms");
fill_all_forms_btn.addEventListener("click", (event) => {
  fill_forms(ratings, text_message, submit_state);
});

const submit_all_forms_btn = document.querySelector("#submit_all_forms");
submit_all_forms_btn.addEventListener("click", (event) => {
  submit_all_forms();
});



const fill_form_btn = document.querySelector("#fill_form");
fill_form_btn.addEventListener("click", (event) => {
  console.log(ratings);

  console.log(text_message);

  console.log(submit_state);

  fill_form(ratings, text_message, submit_state);
});

const open_all_forms_btn = document.querySelector("#open_all_forms");
open_all_forms_btn.addEventListener("click", (event) => {
  open_all_forms();
});

const close_all_forms_btn = document.querySelector("#close_all_forms");
close_all_forms_btn.addEventListener("click", (event) => {
  close_all_forms();
});

const rid_all_forms_btn = document.querySelector("#rid_all_forms");
rid_all_forms_btn.addEventListener("click", (event) => {
  rid_all_forms();
});

function rid_all_forms() {
  open_all_forms();

  setTimeout(() => {
    fill_forms(ratings, text_message, true);
  }, 10000);

  setTimeout(() => {
    close_all_forms();
  }, 20000);

  setTimeout(() => {
    refresh_feedback_page();
  }, 25000);
}

function close_all_forms() {
  chrome.tabs.query({}, function (tabs) {
    for (var i = 0; i < tabs.length; ++i) {
      chrome.tabs.sendMessage(
        tabs[i].id,
        {
          op: 3,
        },
        function (response) {
          console.log(response);

          if (response) {
            document.getElementById("response").innerText = `All Forms Closed`;
          }
        }
      );
    }
  });
}

function refresh_feedback_page() {
  chrome.tabs.query({}, function (tabs) {
    for (var i = 0; i < tabs.length; ++i) {
      chrome.tabs.sendMessage(
        tabs[i].id,
        {
          op: 4,
        },
        function (response) {
          console.log(response);

          if (response) {
            document.getElementById("response").innerText = `All Forms Filled`;
          }
        }
      );
    }
  });
}

function open_all_forms() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { op: 1 }, function (response) {
      console.log("Opening all forms");

      if (response) {
        document.getElementById("response").innerText = "Opened All Forms";
        console.log(response);
        for (var i = 0; i < response.length; i++) {
          chrome.tabs.create({ url: response[i], active: false });
        }
      }
    });
  });
}

function fill_form(ratings, text_message, submit_state) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      {
        op: 2,
        ratings: ratings,
        text_message: text_message,
        submit_state: submit_state,
      },
      function (response) {
        if (response) {
          document.getElementById("response").innerText = "Form Filled";
        }
      }
    );
  });
}

// function extract_body(){

//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//   chrome.tabs.sendMessage(tabs[0].id, {extract_body:true}, function(response){

// return response

// });

// });

// }

function fill_forms(ratings, text_message, submit_state) {
  var forms_filled = 0;

  chrome.tabs.query({}, function (tabs) {
    for (var i = 0; i < tabs.length; ++i) {
      chrome.tabs.sendMessage(
        tabs[i].id,
        {
          op: 2,
          ratings: ratings,
          text_message: text_message,
          submit_state: submit_state,
        },
        function (response) {
          console.log(response);

          if (response) {
            ++forms_filled;

            document.getElementById(
              "response"
            ).innerText = `${forms_filled} Forms Filled`;
          }
        }
      );
    }
  });
}


function submit_all_forms() {
  var forms_submitted = 0;

  chrome.tabs.query({}, function (tabs) {
    for (var i = 0; i < tabs.length; ++i) {
      chrome.tabs.sendMessage(
        tabs[i].id,
        {
          op: 5,
        },
        function (response) {
          console.log(response);

          if (response) {
            ++forms_submitted;

            document.getElementById(
              "response"
            ).innerText = `${forms_submitted} Forms Submitted`;
          }
        }
      );
    }
  });
}

