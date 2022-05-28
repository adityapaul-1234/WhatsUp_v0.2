var firebaseConfig = {
    apiKey: "AIzaSyC8UTeCp2gI8gYPWOoaJIZg8krnqWTCPWE",
    authDomain: "what-s-sup.firebaseapp.com",
    databaseURL: "https://what-s-sup-default-rtdb.firebaseio.com",
    projectId: "what-s-sup",
    storageBucket: "what-s-sup.appspot.com",
    messagingSenderId: "775966961781",
    appId: "1:775966961781:web:c289d493cb82d366a4c83c"
  };
firebase.initializeApp(firebaseConfig);

setInterval(function(){
    height = screen.height;
    cal = (80/100)*height; 
    final = Math.round(cal);
    document.getElementById("Main").style.height = final + "px";    
}, 1000);

x = "none";
function AddNewRoom(){
    username = document.getElementById("Username").value;
    roomname = document.getElementById("Roomname").value;
    password = document.getElementById("Password").value;
    console.log(username, roomname, password);

    if (username == ""){
      alert("Please enter a user name");
    }else if (roomname == ""){
        alert("Please enter a room name");
    } else if (password.length < 6){
        alert("Password must at least be 6 characters");
    } else{
        room = document.getElementById("Roomname").value;
    
        var ref1 = firebase.database().ref("Rooms/" + room);
        ref1.once("value")
        .then(function(snapshot) {
        var x = snapshot.exists();
        console.log(x);

        y = x;
        });
        window.setTimeout(function(){
        CheckRoom(y);
        }, 2500);
    
}  
}

function CheckRoom(item){
    if (item == false){
    firebase.database().ref("/Rooms").child(roomname).update({
        Purpose: "Adding Room Name",
        Password: password,
  });
  localStorage.setItem("Room_Name", roomname);
  localStorage.setItem("user_name", username);
  localStorage.setItem("Password", password);
  setInterval(function(){
    window.location = "chat_page.html" 
}, 2500); 
} else if (item == true){
    alert("Room Name already exists");
}
}


state = "none";
a = "none";

function ExistingRoom(){
    state="true";
    username = document.getElementById("Username").value;
    roomname = document.getElementById("Roomname").value;
    password = document.getElementById("Password").value;

    if (username == ""){
      alert("Please enter a user name");
    } else if (roomname == ""){
        alert("Please enter a room name");
    } else if (password.length < 6){
        alert("Password must at least be 6 characters");
    } else{
        room = document.getElementById("Roomname").value;
    
    var ref = firebase.database().ref("Rooms/" + room);
    ref.once("value")
      .then(function(snapshot) {
        var a = snapshot.exists();
        console.log(a);

        b = a;
      });
      window.setTimeout(function(){
        AddRoom(b);
      }, 2500);
      
      
} }

function AddRoom(item){
    console.log("Function Called");
    console.log(item);
    if (item == true){
        console.log("Worked");
        firebase.database().ref("/Rooms/"+roomname).on('value', function(snapshot){
            snapshot.forEach(function(childSnapshot){
                childKey  = childSnapshot.key; childData = childSnapshot.val();
                if(childKey != "Purpose"){
                firebase_message_id = childKey;
                message_data = childData;
    
                firebase.database().ref("/Rooms/"+roomname).on('value', function(snapshot){
                  child_key = snapshot.key; child_data = snapshot.val();
                  
                }); 
                correct_password = child_data["Password"];
                console.log("correct_password");
                
                if (state == "true"){
                    if (password == correct_password){
                        localStorage.setItem("Room_Name", roomname);
                        localStorage.setItem("user_name", username);
                        localStorage.setItem("Password", password);
                        window.location = "chat_page.html";
                    } else if (password != correct_password){
                        alert("Invalid password");
                        state = "false";
                    }          
                } 
                
    } });  })
    } else if (item == false){
        alert("Room Name does not exist");
        console.log("Not Worked");
    }   
}