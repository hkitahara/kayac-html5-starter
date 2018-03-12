import Sample from './lib/Sample';
import $ from 'jquery';

const sample = new Sample({
    name: 'world'
});

$('.wrapper').on('click', () => {
    console.log(`hello, ${sample.name}.`);
});

let localVideo = document.getElementById('local_video');
let localStream;

// start local localVideo
document.getElementById('start').onclick = function startVideo() {
  navigator.mediaDevices.getUserMedia({video: true, audio: false})
  .then(function (stream) { // success
    localStream = stream;
    localVideo.src = window.URL.createObjectURL(localStream);

    var ctracker = new clm.tracker();
    ctracker.init();
    ctracker.start(localVideo);

    function positionLoop() {
    	requestAnimationFrame(positionLoop);
    	var positions = ctracker.getCurrentPosition();
    	// do something with the positions ...
    	// print the positions
    	var positionString = "";
    	if (positions) {
    		for (var p = 0;p < 10;p++) {
    			positionString += "featurepoint "+p+" : ["+positions[p][0].toFixed(2)+","
          +positions[p][1].toFixed(2)+"]<br/>";
    		}
    		document.getElementById('positions').innerHTML = positionString;
    	}

    }
    positionLoop();

    var canvasInput = document.getElementById('drawCanvas');
    var cc = canvasInput.getContext('2d');
    canvasInput.width = 640;
    canvasInput.height = 480;
    function drawLoop() {
      requestAnimationFrame(drawLoop);
      cc.clearRect(0, 0, canvasInput.width, canvasInput.height);
      if(ctracker.getCurrentPosition()) {
        ctracker.draw(canvasInput);
      }
    }
    drawLoop();
  }).catch(function (error) { // error
    console.error('mediaDevice.getUserMedia() error:', error);
    return;
  });
}
