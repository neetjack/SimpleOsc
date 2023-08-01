//ALL ABOUT ENVELOPE

var vca = audioCtx.createGain();
var atk = 0;
var dec = rel = 0.1
var sus = 1;
vca.gain.value = 0

vca.connect(masterGain)

var activeKeys = {};

var Attack = document.querySelector('.egsAtk');
var Decay = document.querySelector('.egsDec');
var Sustain = document.querySelector('.egsSus');
var Release = document.querySelector('.egsRel');

var atkDisplay = document.querySelector('.atkDisplay');
var decDisplay = document.querySelector('.decDisplay');
var susDisplay = document.querySelector('.susDisplay');
var relDisplay = document.querySelector('.relDisplay');

//Envelope Generator Input
Attack.oninput = function() {
    changeAttack(Attack.value);
}
Decay.oninput = function() {
    changeDecay(Decay.value);
}
Sustain.oninput = function() {
    changeSustain(Sustain.value);
}
Release.oninput = function() {
    changeRelease(Release.value);
}

function changeAttack(val) {
    atk = +val;
    atkDisplay.innerHTML = val;
}

function changeDecay(val) {
    dec = +val;
    decDisplay.innerHTML = val;
}

function changeSustain(val) {
    sus = +val;
    susDisplay.innerHTML = val;
}

function changeRelease(val) {
    rel = +val;
    relDisplay.innerHTML = val;
}

//Envelope Generator Function

function egOn(vcaGain, atk, dec, sus) {
    var now = audioCtx.currentTime;
    vcaGain.cancelScheduledValues(0);
    vcaGain.setValueAtTime(0, now);
    vcaGain.linearRampToValueAtTime(1, now + atk);
    vcaGain.linearRampToValueAtTime(sus, now + atk + dec);
}