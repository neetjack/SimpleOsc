//ALL ABOUT ENVELOPE

let vca = audioCtx.createGain();
let atk = 0;
let dec = rel = 0.1
let sus = 1;
vca.gain.value = 0


vca.connect(masterGain)

let activeKeys = {};

let Attack = document.querySelector('.egsAtk');
let Decay = document.querySelector('.egsDec');
let Sustain = document.querySelector('.egsSus');
let Release = document.querySelector('.egsRel');

let atkDisplay = document.querySelector('.atkDisplay');
let decDisplay = document.querySelector('.decDisplay');
let susDisplay = document.querySelector('.susDisplay');
let relDisplay = document.querySelector('.relDisplay');

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
    let now = audioCtx.currentTime;
    vcaGain.cancelScheduledValues(0);
    vcaGain.setValueAtTime(0, now);
    vcaGain.linearRampToValueAtTime(1, now + atk);
    vcaGain.linearRampToValueAtTime(sus, now + atk + dec);
}

function createVCA(node1, node2, vcaGain, atk, dec, sus){

    

}