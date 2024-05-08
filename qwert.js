//Neet Jack 2021

//keyMapping
var map = {};

map[81] = 72; // q C5
map[87] = 74; // w D5
map[69] = 76; // e E5
map[82] = 77; // r F5
map[84] = 79; // t G5
map[89] = 81; // y A5
map[85] = 83; // u B5
map[73] = 84; // i C6
map[79] = 86; // o D6
map[80] = 88; // p E6
map[219] = 89; // [ F6
map[221] = 91; // ] G6

map[50] = 73; // 2 C#5
map[51] = 75; // 3 D#5
map[53] = 78; // 5 F#5
map[54] = 80; // 6 G#5
map[55] = 82; // 7 L#5
map[57] = 85; // 9 C#6
map[48] = 87; // 0 D#6
map[187] = 90; // + F#6

map[83] = 61; // s C#4
map[68] = 63; // d D#4
map[71] = 66; // g F#4
map[72] = 68; // h G#4
map[74] = 70; // j A#4
map[76] = 73; // l C#5
map[186] = 75; // ; D#5

map[90] = 60; // z C4
map[88] = 62; // x D4
map[67] = 64; // c E4
map[86] = 65; // v F4
map[66] = 67; // b G4
map[78] = 69; // n A4
map[77] = 71; // m B4
map[188] = 72; // , C5
map[190] = 74; // . D5
map[191] = 76; // / E5

//keypress
const qwertInput = document.querySelector('#allIn');
const log = document.getElementById('log');


function logKey(e) {
    //log.textContent += ` ${e.code} `;
    console.log(e.keyCode);
}

//trigger

var checker = {};

function handelKeyinput(k, command) {
    var note = map[(typeof k.which === "number") ? k.which : k.keyCode];
    if (note === undefined || (checker[note] && command === 144)) {
        return false;
    }

    var data = new Uint8Array(3);
    data[0] = command;
    data[1] = note;
    data[2] = 127;

    console.log('data' , data);

    if (command === 144) {
        checker[note] = true;
    } else {
        checker[note] = false;
    }

    switch (command) {
        case 144:
            noteOn(note, 127);
            break;
        case 128: //noteOff
            noteOff(note);
            break;

    }
}
//execute
window.onload = function() {
    qwertInput.onkeydown = logKey;
    qwertInput.onkeyup = logKey;
}
document.addEventListener("keydown", function(k) {
    handelKeyinput(k, 144);
});
document.addEventListener("keyup", function(k) {
    handelKeyinput(k, 128);
});