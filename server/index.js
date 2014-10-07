var five = require('johnny-five'),
    	cors = require('cors'),
    	express = require('express'),
	    board = new five.Board(),
	        led;

board.on('ready', function() {
	    led = new five.Led(3);
	    var app = express();
	    app.use(cors());
	    app.get("/percent/:percent", function(req,res){
		var percent = req.params.percent;
		if(percent === 0){
			led.off();
		}else{
			var bright = 255 * (percent/100);
			led.brightness(percent);
		}
		res.status(200).end();
	    });
	    app.get("/on", function(req,res){
	        led.fadeIn();
		res.status(200).end();
	    });
	    app.get("/off",function(req,res){
		led.fadeOut();
		res.status(200).end()
	    });
	    app.listen(3000);
});
