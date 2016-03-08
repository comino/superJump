$(function(){
    $('#star1').hide();
    $('#star2').hide();
    $('#star3').hide();
    $('#star4').hide();
    $('#star5').hide();
    $('#superfall').hide();
    $('#score').hide();
    $('#chant').html("DO IT!!1");

    var mqtt;
    var reconnectTimeout = 2000;
    function MQTTconnect() {
        mqtt = new Paho.MQTT.Client(
            host,
            port,
            "web_" + parseInt(Math.random() * 100,10)
        );

        var options = {
            timeout: 3,
            useSSL: useTLS,
            cleanSession: cleansession,
            onSuccess: onConnect,
            onFailure: function (message) {
                $('#status').html("Connection failed: " + message.errorMessage + "Retrying");
                setTimeout(MQTTconnect, reconnectTimeout);
            }
        };
        mqtt.onConnectionLost = onConnectionLost;
        mqtt.onMessageArrived = onMessageArrived;
        if (username != null) {
            options.userName = username;
            options.password = password;
        }
        console.log("Host="+ host + ", port=" + port + " TLS = " + useTLS + " username=" + username + " password=" + password);
        mqtt.connect(options);
    }
    function onConnect() {
        $('#status').html('Connected to ' + host + ':' + port);
        // Connection succeeded; subscribe to our topic
        mqtt.subscribe(topic, {qos: 0});
        $('#topic').html(topic);
    }
    function onConnectionLost(response) {
        setTimeout(MQTTconnect, reconnectTimeout);
        $('#status').html("connection lost: " + responseObject.errorMessage + ". Reconnecting");
    };
    function onMessageArrived(message) {
        var topic = message.destinationName;
        var payload = message.payloadString;
        obj = JSON.parse(payload);
        console.log(obj);
        if (obj.score == 0) {

            $('#star1').hide();
            $('#star2').hide();
            $('#star3').hide();
            $('#star4').hide();
            $('#star5').hide();
            $('#superfall').hide();
            $('#score').hide();
            $('#chant').html("DO IT!!1");

        } else if (obj.score != 0) {
            $('#star1').show();

            if (obj.score > 1) {
                $('#star2').show();
            } else {
                $('#star2').hide();
            }

            if (obj.score > 2) {
                $('#star3').show();
            } else {
                $('#star3').hide();
            }

            if (obj.score > 3) {
                $('#star4').show();
            } else {
                $('#star4').hide();
            }

            if (obj.score > 4) {
                $('#star5').show();
                $('#superfall').show();
            } else {
                $('#star5').hide();
                $('#superfall').hide();
            }

            $('#chant').show();
            if (obj.score == 1 ) {
                $('#chant').html("Booh!");
            } else if (obj.score == 2 ) {
                $('#chant').html("Meh.");
            } else if (obj.score == 3 ) {
                $('#chant').html("Fall harder!!1");
            } else if (obj.score == 4 ) {
                $('#chant').html("Barely Hurt.");
            } else if (obj.score == 5 ) {
                $('#chant').html("Smash!!1");
            } else {
                $('#chant').hide();
            }

        }
    };
    $(document).ready(function() {
        MQTTconnect();
    });
});
