function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement;
}

var ul = document.getElementById('keyboard');

function handelMouseinput(k, command) {
    var note = k;
    var data = new Uint8Array(3);
    data[0] = command;
    data[1] = note;
    data[2] = 127;

    if (command === 144) {
        checker[note] = true;
    } else {
        checker[note] = false;
    }

    switch (command) {
        case 144:
            noteOn(note, 127);

            setTimeout(() => {
                noteOff(note);
            }, 1000)

            break;
        case 128: //noteOff
            noteOff(note);
            break;

    }
}



ul.onmousedown = function(event) {
    var target = getEventTarget(event);
    console.log("mouse down target.value is",target.value);
    mem = target.value;
    handelMouseinput(target.value, 144);
};
ul.onmouseup = function(event) {
    var target = getEventTarget(event);
    console.log("mouse up target.value is",target.value);
    handelMouseinput(target.value, 128);
};

//mouse move