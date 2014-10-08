var five = require('johnny-five'),
    	cors = require('cors'),
    	express = require('express'),
	    board = new five.Board(),
	        led;

board.on('ready', function() {
	    led3 = new five.Led(3);
	    led5 = new five.Led(5);
	    led6 = new five.Led(6);
	    led9 = new five.Led(9);
	    led10 = new five.Led(10);
	    led11 = new five.Led(11);
	    var app = express();
	    app.use(cors());
	    app.get("/percent/:percent", function(req,res){
		var percent = req.params.percent;
		if(percent === 0){
			led3.off();
		}else{
			var bright = 255 * (percent/100);
			led3.brightness(percent);
		}
		res.status(200).end();
	    });
	    app.get("/piano/:keys", function(req,res){
		    var keys = req.params.keys;
		    console.log(keys & 2);
		    if(keys & 2){
			    console.log("turn on.");
			    led3.on();
		    }else{
			    led3.off();
		    }
		    if(keys & 4){
			    led5.on();
		    }else{
			    led5.off();
		    }
		    if(keys & 8){
			    led6.on();
		    }else{
			    led6.off();
		    }
		    if(keys & 16){
			    led9.on();
		    }else{
			    led9.off();
		    }
		    if(keys & 32){
			    led10.on();
		    }else{
			    led10.off();
		    }
		    if(keys & 64){
			    led11.on();
		    }else{
			    led11.off();
		    }
		    res.status(200).end();
	    });
	    app.get("/gesture/:gesture", function(req,res){
		    switch(req.params.gesture){
			    case 'ladder-left':
				    console.log("ladder-left");
				    ladder([led3,led5,led6,led9,led10,led11]);
				    break;
			    case 'ladder-right':
				    console.log("ladder-right");
				    ladder([led11,led10,led9,led6,led5,led3]);
				    break;
			    case 'wave-out':
				    console.log("wave-out");
				    wave([[led11,led3],[led10,led5],[led9,led6]]);
				    break;
			    case 'wave-in':
				    console.log("wave-in");
				    wave([[led9,led6],[led10,led5],[led11,led3]]);
				    break;
		    }
		    res.status(200).end();
	    });
	    app.get("/on", function(req,res){
	        led3.fadeIn();
		led5.fadeIn();
		led6.fadeIn();
		led9.fadeIn();
		led10.fadeIn();
		led11.fadeIn();
		res.status(200).end();
	    });
	    app.get("/off",function(req,res){
		led3.fadeOut();
		led5.fadeOut();
		led6.fadeOut();
		led9.fadeOut();
		led10.fadeOut();
		led11.fadeOut();
		res.status(200).end()
	    });
	    app.listen(3000);
});

function ladder(leds){
	if(leds.length == 0) return;
	var led = leds.pop();
	led.fadeIn();
	setTimeout(function(){led.fadeOut();ladder(leds);},250);

}
function wave(leds){
	if(leds.length == 0) return;
	var set = leds.pop();
	set[0].fadeIn();
	set[1].fadeIn();
	setTimeout(function(){set[0].fadeOut();set[1].fadeOut();wave(leds);},500);
}
