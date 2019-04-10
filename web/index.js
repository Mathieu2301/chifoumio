/*
  by Mathieu Colmon
  pro@usp-3.fr
*/

var home = new Vue({
  el: '#main',
  data: {
    title: 'Chifoum.io',
    seen: true,
    searching: false
  },
  methods: {
    start_search: function () {
      home.searching = true;
      home.title = "Searching for a player...";
      home.seen = true;
      in_game.seen = false;

      setTimeout(function(){
        socket.emit('start_search', function(opponent){
          in_game.seen = true;
          home.seen = false;
  
          in_game.title = "Playing against : " + opponent;
  
          socket.on('player_leave', function(user) {
            if (user == opponent){
              notif('Your opponent left...');
              home.start_search();
            }
          });
        })
      }, 300)

    },
    join_private: function() {
      notif('Not available now :(', 'error')
    }
  }
})

var in_game = new Vue({
  el: '#in_game',
  data: {
    title: 'Charging...',
    seen: false,

    selected: 1
  },
  methods: {
    select_pierre: function(){
      
    },
    select_feuille: function(){

    },
    select_ciseaux: function(){

    }
  }
})

// Socket.io {

  var socket = io();



// } Socket.io 

/* Essentials functions :

    - includes_array("userna*me", ['\\', '/', ':', ';', ',', '*', '?', '!', '"', '<', '>', '|', '_', "'", '%', '#', '+', '-']) // Return true if the string contains one of the items in the list
    - copyToClipboard(text) // Copy a text in the clipboard
    - GET_(param) // Return get parameters in the URL
    - getCookie(name) // Return the value of a cookie
    - setCookie(name, value) // Set a value in a cookie
    - notif(msg, type) // Show a toast. The type can be : "'error'", "'warn'", "'info'" or "'success'" (default: info)
    - browser_notif(text) // Show a desktop notification 
    - soundNotif() // Play a sound (Like a notification)
    - fullscreen() // Put the app in fullscreen

*/

// When a key is pressed
document.onkeypress=function(e){
  e=e||window.event;
  var key=e.which?e.which:event.keyCode;
  
  console.log("Key = " + key); // Log the ID of the key in the console

}

function browser_notif(text){soundNotif();if(!("Notification" in window)){alert("Bad browser")}else if(Notification.permission==="granted"){var notification=new Notification(text)}else if(Notification.permission!=='denied'){Notification.requestPermission(function(permission){if(!('permission' in Notification)){Notification.permission=permission}if(permission==="granted"){var notification=new Notification(text)}})}}function soundNotif(){new Audio("https://www.memoclic.com/medias/sons-wav/1/336.wav").play()}function fullscreen(){var docElm=document.documentElement;if(docElm.requestFullscreen){docElm.requestFullscreen()}else if(docElm.mozRequestFullScreen){docElm.mozRequestFullScreen()}else if(docElm.webkitRequestFullScreen){docElm.webkitRequestFullScreen()}}function notif(msg,type){var toast_msg="";var toast_title="";var toast_color="blue";var toast_image="";var toast_delay;toast_msg=msg;toast_delay=5000;if(type=="error"){toast_title="Error";toast_color="red";toast_image="iziToast-icon ico-error revealIn"}else if(type=="warn"){toast_title="Error";toast_color="yellow";toast_image="iziToast-icon ico-warning revealIn"}else if(type=="success"){toast_color="green";toast_image="iziToast-icon ico-success revealIn"}else{toast_title="Info";toast_color="blue";toast_image="iziToast-icon ico-info revealIn"}iziToast.show({id:null,title:toast_title,message:toast_msg,messageSize:'',messageLineHeight:'',theme:'light',color:toast_color,icon:toast_image,maxWidth:null,zindex:null,layout:2,balloon:!1,close:!0,closeOnEscape:!0,closeOnClick:!0,rtl:!1,position:'bottomRight',target:'',targetFirst:!0,toastOnce:!1,timeout:toast_delay,animateInside:!0,drag:!0,pauseOnHover:!0,resetOnHover:!1,progressBar:!0,overlay:!1,overlayClose:!1,overlayColor:'rgba(0, 0, 0, 0.6)',transitionIn:'fadeInUp',transitionOut:'fadeOutDown',transitionInMobile:'fadeInUp',transitionOutMobile:'fadeOutDown'})}function getCookie(cname){var name=cname+"=";var decodedCookie=decodeURIComponent(document.cookie);var ca=decodedCookie.split(';');for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==' '){c=c.substring(1)}if(c.indexOf(name)==0){return c.substring(name.length,c.length)}}return""}function setCookie(name,value){document.cookie=name+"="+value+";365;path=/"}function GET_(param){var url=new URL(document.location);return url.searchParams.get(param)}function copyToClipboard(text){$('#clipboard').text(text);var $temp=$("<input>");$("body").append($temp);$temp.val($('#clipboard').text()).select();document.execCommand("copy");$temp.remove();$('#clipboard').text("")}function includes_array(str, array){var result = false;array.forEach(el => {if (str.includes(el)) result = true;});return result;}