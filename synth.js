//NEW AUDIO CTX
var AudioContext = window.AudioContext || window.webkittAudioContext;
var audioCtx = new AudioContext({
    latencyHint: 'balanced',
    sampleRate: 48000,
});
//Neet Jack 2021
const OSC1 = {};
var Osc1Type = 'sine';

//OSCTYPE
function setOscSquare() {
    Osc1Type = 'square';
    console.log("now osc set to" + " " + Osc1Type);
};

function setOscTriangle() {
    Osc1Type = 'triangle';
    console.log("now osc set to" + " " + Osc1Type)
};

function setOscSine() {
    Osc1Type = 'sine';
    console.log("now osc set to" + " " + Osc1Type)
};

function setOscSawtooth() {
    Osc1Type = 'sawtooth';
    console.log("now osc set to" + " " + Osc1Type)
};
//LOW PASS FILTER

//MASTER GAIN
var masterGain = audioCtx.createGain();
masterGain.gain.value = 0.4;


var master = document.querySelector('.masterGain');

master.oninput = function() {
    changeMaster(master.value);
}

function changeMaster(vol) {
    masterGain.gain.value = vol;
    master.value = vol;
    document.getElementById("mgDisplay").innerHTML = vol;
    console.log('MasterGain is' + ' ' + masterGain.gain.value);
}
masterGain.connect(audioCtx.destination);

//NOTE STATE
function playNote(note, velocity) {
    const osc1 = audioCtx.createOscillator();
    const osc1Gain = audioCtx.createGain();

    oscGain.gain.value = 0.33;
    osc1.type = Osc1Type;
    osc1.frequency.value = midiToFreq(note);

    const velocityGainAmount = (1 / 127) * velocity;
    const velocityGain = audioCtx.createGain();
    velocityGain.gain.value = velocityGainAmount;

    osc1.connect(oscGain);
    osc1Gain.connect(velocityGain);

    velocityGain.connect(vca);
    egOn(vca.gain, atk, dec, sus);

    osc1.gain = oscGain;

    OSC1[note.toString()] = osc;
    console.log(OSC1);
    osc1.start();
}

function isEmptyObj(obj) {
    return Object.keys(obj).length === 0;
}

function stopNote(note,velocity) {
    const osc = OSC1[note.toString()];
    const oscGain = osc.gain;
    var a = parseFloat(Release.value) + audioCtx.currentTime;
    console.log(a);

    oscGain.gain.setValueAtTime(oscGain.gain.value, audioCtx.currentTime);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, a);

    setTimeout(() => {
        osc.stop();
        osc.disconnect();
    }, 1000)

    delete OSC1[note.toString()];
    console.log(OSC1);
}


//Pitch control


//LOG