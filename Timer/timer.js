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
    img.style.backgroundImage = "url(../images/" + changedUrl + ")";
}

// Timer Mechanism

var timer = 0;
var remaningHours = 0;
var remaningMinutes = 0;
var remaningSeconds = 0;
var startContinueChecker = 0;
var isRunning = false;
var limit = 60;
var limitInString = limit.toString(10);
var timerRing =0;
var ringInterval = 0;
var audio = new Audio("../images/audio.wav");
// audio.play();
var hr = document.getElementById("hour").value;
var min = document.getElementById("minute").value;
var sec = document.getElementById("second").value;

const setTiming = () => {
    remaningHours = document.getElementById("hour").value;
    remaningMinutes = document.getElementById("minute").value;
    remaningSeconds = document.getElementById("second").value;
}

const start = () => {
    if (document.getElementById("hour").value == "" && document.getElementById("minute").value == "" && document.getElementById("second").value == "") {
        console.log("Enter Valid Time.");
        alert("Enter Valid Time.");
    } else if (document.getElementById("hour").value > 24 || document.getElementById("minute").value > 60 || document.getElementById("second").value > 60) {
        console.log("limit Exceeded");
        document.getElementById("hour").value = "";
        document.getElementById("minute").value = "";
        document.getElementById("second").value = "";
        alert("Hours cannot be greater than 24 And Minutes, Seconds cannot be greater than 60.")
    } else {
        if (startContinueChecker == 0 && remaningHours == 0 && remaningMinutes == 0 && remaningSeconds == 0) {
            console.log("Started");
            setTiming();
            document.getElementById("displayHr").textContent = (remaningHours >= 10) ? remaningHours : ((remaningHours == 0) ? "00" : "0" + remaningHours);
            document.getElementById("displayMin").textContent = (remaningMinutes >= 10) ? remaningMinutes : ((remaningMinutes == 0) ? "00" : "0" + remaningMinutes);
            document.getElementById("displaySec").textContent = (remaningSeconds >= 10) ? remaningSeconds : ((remaningSeconds == 0) ? "00" : "0" + remaningSeconds);
            isRunning = true;
            timer = setInterval(() => {
                if (isRunning) {
                    if (remaningHours == 0 && remaningMinutes == 0 && remaningSeconds == 0) {
                        // buzzer functionality
                        timerRing = 1;
                        startContinueChecker = 0;
                        isRunning = false;
                        ringInterval = setInterval(()=>{
                            audio.play();
                            clearInterval(timer);
                        },10);
                    }
                    else {
                        if(remaningMinutes == 0 && remaningHours > 0) {
                            remaningHours--;
                            remaningMinutes = 59;
                            remaningMinutes = 60;
                        }
                        else if (remaningSeconds == 0 && remaningMinutes > 0) {
                            remaningMinutes--;
                            remaningSeconds = 60;
                        }
                        remaningSeconds--;
                    }
                    var hrString = remaningHours;
                    var minString = remaningMinutes;
                    var secString = remaningSeconds;
                    hrString = (remaningHours >= 10) ? hrString : ((remaningHours == 0) ? "00" : "0" + hrString);
                    minString = (remaningMinutes >= 10) ? minString : ((remaningMinutes == 0) ? "00" : "0" + minString);
                    secString = (remaningSeconds >= 10) ? secString : ((remaningSeconds == 0) ? "00" : "0" + secString);
                    document.getElementById("displayHr").textContent = hrString;
                    document.getElementById("displayMin").textContent = minString;
                    document.getElementById("displaySec").textContent = secString;
                }
            }, 1000);
            startContinueChecker = 1;
        } else if (startContinueChecker == 0 && (remaningHours > 0 || remaningMinutes > 0 || remaningSeconds > 0)) {
            isRunning = true;
            console.log("Continued");
            timer = setInterval(() => {
                if (isRunning) {
                    if (remaningHours == 0 && remaningMinutes == 0 && remaningSeconds == 0) {
                        // buzzer functionality
                        timerRing = 1;
                        startContinueChecker = 0;
                        isRunning = false;
                        ringInterval = setInterval(()=>{
                            audio.play();
                            clearInterval(timer);
                        },2);
                    }
                    else {
                        if(remaningMinutes == 0 && remaningHours > 0) {
                            remaningHours--;
                            remaningMinutes = 59;
                            remaningMinutes = 60;
                        }
                        else if (remaningSeconds == 0 && remaningMinutes > 0) {
                            remaningMinutes--;
                            remaningSeconds = 60;
                        }
                        remaningSeconds--;
                    }
                    var hrString = remaningHours;
                    var minString = remaningMinutes;
                    var secString = remaningSeconds;
                    hrString = (remaningHours >= 10) ? hrString : ((remaningHours == 0) ? "00" : "0" + hrString);
                    minString = (remaningMinutes >= 10) ? minString : ((remaningMinutes == 0) ? "00" : "0" + minString);
                    secString = (remaningSeconds >= 10) ? secString : ((remaningSeconds == 0) ? "00" : "0" + secString);
                    document.getElementById("displayHr").textContent = hrString;
                    document.getElementById("displayMin").textContent = minString;
                    document.getElementById("displaySec").textContent = secString;
                }
            }, 1000);
            document.getElementById("stopReset").textContent = "Stop";
            startContinueChecker = 1;
        }
    }
}
const stopReset = () => {
    if(timerRing==1 && startContinueChecker == 0){
        console.log("buzzeer")
        audio.pause();
        clearInterval(ringInterval);
        document.getElementById("stopReset").textContent = "Reset";
        timerRing = 0;
        return;
    }
    if (startContinueChecker == 1) {
        console.log("Stoped");
        clearInterval(timer);
        isRunning = false;
        document.getElementById("stopReset").textContent = "Reset";
        document.getElementById("start").textContent = "Continue";
        document.getElementById("start").style.fontSize = "4rem";
        startContinueChecker = 0;
    } else if (startContinueChecker == 0 && timerRing!=1) {
        // resetFunctionality
        console.log("Reset");
        document.getElementById("start").textContent = "Start";
        document.getElementById("start").style.fontSize = "5.8rem";
        document.getElementById("stopReset").textContent = "Stop";
        remaningHours = 0;
        remaningMinutes = 0;
        remaningSeconds = 0;
        document.getElementById("displayHr").textContent = "00";
        document.getElementById("displayMin").textContent = "00";
        document.getElementById("displaySec").textContent = "00";
        document.getElementById("hour").value = "";
        document.getElementById("minute").value = "";
        document.getElementById("second").value = "";

    }
}
// full Screen Keypress

document.addEventListener("keydown", function (event) {
    fullscreenKey(event.key);
});

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
