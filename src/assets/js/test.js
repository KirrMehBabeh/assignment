const app = {
    init: function(){
        document.addEventListener('deviceready', app.ready);
    },
    ready: function(){
        document.querySelector('.alert').addEventListener('click', app.showAlert);

    },
    showAlert: function(ev){
        navigator.notification.alert('Thanks for logging in', 'You Logged In', 'Dismiss');
    }
}