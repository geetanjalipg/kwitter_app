//YOUR FIRE BASE LINKS

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBbOxRrWeAS2A6yGGTpLRCybPALzd1TiUI",

  authDomain: "kwitter-4f9ab.firebaseapp.com",

  databaseURL: "https://kwitter-4f9ab-default-rtdb.firebaseio.com",

  projectId: "kwitter-4f9ab",

  storageBucket: "kwitter-4f9ab.appspot.com",

  messagingSenderId: "358880284527",

  appId: "1:358880284527:web:5abd2f0483fcd9f1c1e29a"

};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send() {
  msg = document.getElementById("msg").value;
  firebase.database().ref(room_name).push({
    name: user_name,
    message: msg,
    like: 0
  });

  document.getElementById("msg").value = "";
}

function getData() {
  firebase.database().ref("/" + room_name).on('value', function (snapshot) {
    document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
        firebase_message_id = childKey;
        message_data = childData;
        //Start code
        name = message_data["name"];
        message = message_data["message"];
        like = message_data["like"];
        name_withtag = "<h4>" + name + "<img class='user_tick' src='tick.png'></h4>";
        message_tag = "<h4 class='message_h4' > " + message + "</h4>";
        button_like = "<button class='btn btn-warning' id='" + firebase_message_id + "' value=" + like + " onclick='updatelike(this.id)'>";
        button_thumbsup = "<span class='glyphicon glyphicon-thumbs-up'> Like : " + like + "</span></button>";
        section = name_withtag + message_tag + button_like + button_thumbsup;
        document.getElementById("output").innerHTML += section;

        //End code
      }
    });
  });
}
getData();
function updatelike(msg_id) {
  likes = document.getElementById(msg_id).value;
  updatedlikes = Number(likes) + 1;
  firebase.database().ref(room_name).child(msg_id).update({
    like: updatedlikes

  });

}
function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}

