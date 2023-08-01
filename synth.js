//Create AUDIO CTX

var AudioContext = window.AudioContext || window.webkittAudioContext;
var audioCtx = new AudioContext({
    latencyHint: 'balanced',
    sampleRate: 48000,
});

//Neet Jack 2023

const OSC1 = {};
const OSC2 = {};
const OSC3 = {};
const LFO  = {};

var Osc1_Type = 'sine';
var Osc2_Type = 'sine';
var Osc3_Type = 'sine';
var LFO_Type  = 'sine';


//OSCTYPE SELLECTOR

// [SQUARE]
function setOsc1Square() {
    Osc1_Type = 'square';
    console.log("now osc set to" + " " + Osc1_Type);
};
function setOsc2Square() {
    Osc1_Type = 'square';
    console.log("now osc set to" + " " + Osc2_Type);
};
function setOsc3Square() {
    Osc1_Type = 'square';
    console.log("now osc set to" + " " + Osc3_Type);
};


// [TRI]
function setOsc1Triangle() {
    Osc1_Type = 'triangle';
    console.log("now osc set to" + " " + Osc1_Type)
};
function setOsc2Triangle() {
    Osc1_Type = 'triangle';
    console.log("now osc set to" + " " + Osc2_Type)
};
function setOsc3Triangle() {
    Osc1_Type = 'triangle';
    console.log("now osc set to" + " " + Osc3_Type)
};

//[SINE]
function setOsc1Sine() {
    Osc1_Type = 'sine';
    console.log("now osc set to" + " " + Osc1_Type)
};
function setOsc2Sine() {
    Osc1_Type = 'sine';
    console.log("now osc set to" + " " + Osc2_Type)
};
function setOsc3Sine() {
    Osc1_Type = 'sine';
    console.log("now osc set to" + " " + Osc3_Type)
};

//[SAWtooth]
function setOsc1Sawtooth() {
    Osc1_Type = 'sawtooth';
    console.log("now osc set to" + " " + Osc1_Type)
};
function setOsc2Sawtooth() {
    Osc1_Type = 'sawtooth';
    console.log("now osc set to" + " " + Osc2_Type)
};
function setOsc3Sawtooth() {
    Osc1_Type = 'sawtooth';
    console.log("now osc set to" + " " + Osc3_Type)
};

//LOW PASS FILTER

//GAIN STRUCTURE
var masterGain = audioCtx.createGain();
masterGain.gain.value = 0.4;

var Osc1_Gain  = audioCtx.createGain();
Osc1_Gain.gain.value  = 0.4;
var Osc2_Gain  = audioCtx.createGain();
Osc2_Gain.gain.value  = 0.4;
var Osc3_Gain  = audioCtx.createGain();
Osc3_Gain.gain.value  = 0.4;

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

var Gain_1 = document.querySelector('.Gain_1')
Gain_1.oninput = function(){
    changeMaster(Gain_1.value);
}
function change_Gain_1(vol){
    Osc1_Gain.gain.value = vol;
    Gain_1.value = vol;
    document.getElementById("g1Display").innerHTML = vol;
    console.log('Gain_1 is' + ' ' + Osc1_Gain.gain.value);
}

var Gain_2 = document.querySelector('.Gain_2')
Gain_2.oninput = function(){
    changeMaster(Gain_2.value);
}
function change_Gain_2(vol){
    Osc2_Gain.gain.value = vol;
    Gain_2.value = vol;
    document.getElementById("g2Display").innerHTML = vol;
    console.log('Gain_2 is' + ' ' + Osc2_Gain.gain.value);
}

var Gain_3 = document.querySelector('.Gain_3')
Gain_3.oninput = function(){
    changeMaster(Gain_2.value);
}
function change_Gain_2(vol){
    Osc3_Gain.gain.value = vol;
    Gain_3.value = vol;
    document.getElementById("g3Display").innerHTML = vol;
    console.log('Gain_3 is' + ' ' + Osc3_Gain.gain.value);
}

//CONNECTION
const Mixer = audioCtx.createChannelMerger(3);

//connect(destinationNode: AudioNode, output?: number, input?: number): AudioNode;
Osc1_Gain.connect(Mixer,0,0);
Osc2_Gain.connect(Mixer,0,1);
Osc3_Gain.connect(Mixer,0,3);

Mixer.connect(masterGain);
masterGain.connect(audioCtx.destination);

//NOTE STATE
function playNote(note, velocity) {
    const osc1 = audioCtx.createOscillator();
    const osc1Gain = audioCtx.createGain();

    osc1Gain.gain.value = 0.33;
    osc1.type = Osc1_Type;
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