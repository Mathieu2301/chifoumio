var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 80;

app.use('/', require('express').static("web"));

app.get('/*', function(req, res){
    res.redirect('/');
});

var online_users = [];
var insearch_user = "";
var insearch_user_connect = function(){}

io.on('connection', function(client){
    var client_id = client.id.substr(-4);
    online_users.push({id: client_id, name: "Anonymous", ip: client.conn.remoteAddress});
    console.log("User connected : " + client_id);

    var opponent = "";
    var insearch = true;
    var ingame = false;

    client.on('start_search', function(callback){

        if (insearch_user == ""){
            insearch_user = client_id;
            insearch_user_connect = function(opponent){
                callback(opponent)
            }

            insearch = true;
        }else{
            opponent = insearch_user;
            insearch_user = "";
            insearch = false;

            insearch_user_connect(client_id);
            callback(opponent);
        }

    })

    client.on('disconnect', function(){
        console.log("User disconnected : " + client_id);

        if (insearch_user == client_id) insearch_user = "";

        online_users.forEach(function(user, index){
            if (user.id == client_id) online_users.remove(index)
        });

        io.sockets.emit('player_leave', client_id)
    });
})



Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

server.listen(port);