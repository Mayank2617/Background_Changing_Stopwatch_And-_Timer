// background Change Mechanism
var img = document.getElementsByTagName("body")[0];
var c = 1;
const changeImage = () => {
    console.log(c);
    if (c == 8) {
        c = 1;
    } else {
        c++;
    }
    var changedUrl = "img" + c + ".jpg";
    console.log(changedUrl);
    img.style.backgroundImage = "url(./images/" + changedUrl + ")";
}

// clock Mechanism

let isRunning = false;
var startContinueChecker = 0;
var hour = 0;
var minute = 0;
var second = 0;
var miliSec = 0;
var stopwatch = 0;
var hrString;
var minString;
var secString;
var miliSecString;

const start = () => {
    if (startContinueChecker == 0) {
        isRunning = true;
        stopwatch = setInterval(() => {
            if (isRunning) {
                miliSec++;
                if (miliSec == 10) {
                    second = second + 1;
                    miliSec = 0;
                }
                if (second == 60) {
                    minute = minute + 1;
                    second = 0;
                }
                if (minute == 60) {
                    hour = hour + 1;
                    minute = 0;
                    second = 0;
                }
                var hrString = hour;
                var minString = minute;
                var secString = second;
                var miliSecString = miliSec;

                if (hour < 10) {
                    hrString = "0" + hrString;
                }
                if (minute < 10) {
                    minString = "0" + minString;
                }
                if (second < 10) {
                    secString = "0" + secString;
                }
                if (miliSec < 10) {
                    miliSecString = "0" + miliSecString;
                }
                document.getElementById("hour").textContent = hrString;
                document.getElementById("minute").textContent = minString;
                document.getElementById("second").textContent = secString;
                document.getElementById("miliSec").textContent = miliSecString;
            }
        }, 100);
        document.getElementById("stopReset").textContent = "Stop";
        startContinueChecker = 1;
    }
}

const stop = () => {
    if (startContinueChecker == 1) {
        isRunning = false;
        clearInterval(stopwatch);
        startContinueChecker = 0;
        document.getElementById("startContinue").textContent = "Continue";
        document.getElementById("startContinue").style.fontSize = "4.8rem"
        document.getElementById("stopReset").textContent = "Reset";
    }
    else if (startContinueChecker == 0) {
        document.getElementById("stopReset").textContent = "Stop";
        document.getElementById("startContinue").textContent = "Start";
        document.getElementById("startContinue").style.fontSize = "5.8rem"
        // resetwork
        hour = 0;
        minute = 0;
        second = 0;
        miliSec = 0;
        document.getElementById("hour").textContent = "00";
        document.getElementById("minute").textContent = "00";
        document.getElementById("second").textContent = "00";
        document.getElementById("miliSec").textContent = "00";
    }
}

// full Screen Keypress

document.addEventListener("keydown", function (event) {
    fullscreenKey(event.key);
})
document.getElementById("")

const fullscreenKey = (a) => {

    if (a == 'f') {
        toggleFullScreen();
    }
}
// fullscreen function
function toggleFullScreen() {
    var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
    }
    else {
        cancelFullScreen.call(doc);
    }
}

