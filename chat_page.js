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

Room_Name = localStorage.getItem("Room_Name");
User_Name = localStorage.getItem("user_name");
Password = localStorage.getItem("Password");

document.getElementById("Room_Display").innerHTML = "Room Name: " + Room_Name;

function send(){
    var msg_value = document.getElementById("Msg").value;
    if (msg_value == ""){
        alert("Message cannot be blank");
    } else{
    MSG = document.getElementById("Msg").value;
    firebase.database().ref("/Rooms/" + Room_Name).push({
        name: User_Name,
        message: MSG,
        likes: 0,
    });

    document.getElementById("Msg").value = "";
    document.getElementById("Msg").placeholder = "Your message has been successfully sent!";

    setTimeout(function(){ 
        console.log("Ready");
        document.getElementById("Msg").placeholder = "Enter your message here";
    }, 4000);
}
}

function logout(){
    localStorage.removeItem("Room_Name");
    localStorage.removeItem("user_name");
    localStorage.removeItem("Password");
    window.location = "index.html";
}

function get_Data() {
    firebase.database().ref("/Rooms/"+Room_Name).on('value', function(snapshot){
            document.getElementById("Message_Area").innerHTML = "";
            snapshot.forEach(function(childSnapshot){
                childKey  = childSnapshot.key; childData = childSnapshot.val();
                if(childKey != "Password"){
                    if (childKey !="Purpose"){
                firebase_message_id = childKey;
                message_data = childData;  

        Name = message_data['name'];
        Message = message_data['message'];
        Likes = message_data['likes'];

        name_tag = "<h4 id='Name'> "+ Name +"<sub><img class='user_tick' src='tick.png'></sub></h4>";
        message_tag = "<h4 id='message_h4'>" + Message + "</h4>";
        like_button = "<button class='likes' id="+firebase_message_id+" value="+Likes+" onclick='updateLikes(this.id)'>";
        span_tag = "<span id='spanny' class='glyphicon glyphicon-thumbs-up'><sub><img id='log' src='icons8-thumbs-up-50.png'></sub> Likes: "+ Likes +"</span></button><br><hr id='hr1'>"; 
        
        earlier = document.getElementById("Message_Area").innerHTML;
        row = name_tag + message_tag + like_button + span_tag;

        document.getElementById("Message_Area").innerHTML = row + earlier;

        row = undefined;
        earlier = undefined;        
    }} });  }); }
get_Data();

function updateLikes(message_id){
    button_id = message_id;
    Likes = document.getElementById(button_id).value;
    updated_Likes = Number(Likes) + 1;

    firebase.database().ref("/Rooms/" + Room_Name).child(message_id).update({
          likes: updated_Likes
    });
}

function share(){
    share_msg = "Hey there! " + User_Name + " has invited you to a chat on https://adityapaul-1234.github.io/WhatsUp_v0.2/. Please use the following login credentials. Room Name: " +  Room_Name + "; Password: " + Password + "; " + User_Name + " can't wait to chat with you :)"
    navigator.clipboard.writeText(share_msg);
    alert("Chat Details copied to clipboard.");
}
