---
title:  Simple chat using Firebase
date:   2015-11-14 14:30:00
description: How you can build a basic chat application using JavaScript and Firebase API
---
<a href="http://www.firebase.com/" target="_new">Firebase</a> provides a realtime database service with an user friendly backend interface to manage your data. With some JavaScript I created this simple chat app, <a href="http://osterbergmarcus.github.io/chat/" target="_new">check it out!</a>
<br/>
```javascript
// make a reference to your database
var messagesRef = new Firebase('https://<your url>.firebaseio.com/');

// cache frequent DOM references
var messageField = $('#messageInput'),
nameField = $('#nameInput'),
messageList = $('#messages'),
onlineList = $('#online-users');

// pressing enter will push our object (message) to our JSON  tree using the method push() and clear out input field
messageField.keypress(function (e) {
  if (e.keyCode == 13) {
    var username = nameField.val();
    var message = messageField.val();

    messagesRef.push({name:username, text:message});
    messageField.val('');
  }
});

// add a callback that gets data from each child object that  are created under its parent
  messagesRef.limitToLast(10).on('child_added', function (snapshot) {

    var data = snapshot.val();
    var username = data.name || "anonymous";
    var message = data.text;

// just to make sure we don't receive any empty messages  that have some how been triggered
    if (username && message) {

// creates our message and append it to our element
    var text = "says";
    var messageElement = $("<li>");
    var nameElement = $("<strong class='name'></strong>");
    nameElement.text(username.concat(' ' +text+ ' '));
     messageElement.text(message).prepend(nameElement);

    messageList.append(messageElement);

// scroll to bottom of list to display latest message
    messageList[0].scrollTop = messageList[0].scrollHeight;
  }
  });

// reference to a new data object where we will track presence in our channel
  var listRef = new Firebase("https://<your-url>.firebaseio.com/presence/");
  var userRef = listRef.push();

// add online user to presence list
  var presenceRef = new Firebase("https://<your-url>.firebaseio.com/.info/connected");
  presenceRef.on("value", function(snap) {
    if (snap.val()) {
      userRef.set(true);
      #remove user from preference list when disconnected by using the remove() method
      userRef.onDisconnect().remove();
    }
  });

// list our objects in presence list as online users in our   element
  listRef.on("value", function(snap) {

    onlineList.text(snap.numChildren());
  });
```
<br/>
There is a lot more methods and well written documentation supporting a variety of languages on Firebase official homepage. All ready to use for your next application.

Feel free to improve this app by requesting issues or pull requests on <a href="https://github.com/osterbergmarcus/Firebase-chat-app" target="_new">Github</a>
