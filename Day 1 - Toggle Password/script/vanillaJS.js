// my code goes here
//
//Variables
//
var password = document.querySelector('#password');  
var toggle = document.querySelector('#show-password');  

//
//Methods
//

/**
 * Handle click events
 * @param {Event} event The event object
 */
var clickHandler = function(event){
    //console.log(event.target);
    //Only run if show-password checkbox is clicked
    var eventTarget = event.target.getAttribute('id');

    if(eventTarget!="toggle") return;
    //console.log(eventTarget);
    //console.log(event.target.checked);
    if(event.target.checked){
      password.type = 'text';
      console.log("show password");
    } else {
       password.type = 'password';
    }

};

//Event Listeners

//Listen for the clicks in DOM
//event gets passed implicitly
document.addEventListener('click',clickHandler);

