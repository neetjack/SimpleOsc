//Create AUDIO CTX

var AudioContext = window.AudioContext || window.webkittAudioContext;
var audioCtx = new AudioContext({
    latencyHint: 'balanced',
    sampleRate: 48000,
});
var ST = audioCtx.destination;

//DETUNE
var detuneAmont = 0.01;
var detune = document.querySelector('.Detune_Fader');
detune.oninput = function(){
    changeDetune(detune.value);
}
function changeDetune(val){
    detuneAmont = val;
    detuneDisplay.innerHTML = val;
}

//Channel mixer
function mix(node1,node2,node3,ratio){
    let m = audioCtx.createChannelMerger(2);
    let s = audioCtx.createChannelSplitter(2);
    let r = audioCtx.createGain();
    node1.connect(s);
    s.connect(m);
    s.connect(node2);
    node2.connect(r);
    r.value = ratio;
    r.connect(m);
    m.connect(node3);
}

//Neet Jack 2023

const OSC1 = {};
const OSC2 = {};
const OSC3 = {};
const LFO  = {};

var Osc1_Type = 'sine';
var Osc2_Type = 'sine';
var Osc3_Type = 'sine';
var LFO_Type  = 'sine';

//LOW PASS FILTER

//Master
var masterGain = audioCtx.createGain();
masterGain.gain.value = 0.2;

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
masterGain.connect(ST);

/*

var Osc1_Gain  = audioCtx.createGain();
Osc1_Gain.gain.value  = 0.4;
var Osc2_Gain  = audioCtx.createGain();
Osc2_Gain.gain.value  = 0.4;
var Osc3_Gain  = audioCtx.createGain();
Osc3_Gain.gain.value  = 0.4;

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
masterGain.connect(ST);
*/

//NOTE STATE
function playNote(note, velocity) {
  
    var now = audioCtx.currentTime;
    let nt = Number(note);
    let dt = Number(detuneAmont);

    // OSC1
    const osc1 = audioCtx.createOscillator();
    const osc1Gain = audioCtx.createGain();
    osc1Gain.gain.value = 0.5;
    osc1.type = Osc1_Type;
    osc1.frequency.value = midiToFreq(nt);
    

    // OSC2
    const osc2 = audioCtx.createOscillator();
    const osc2Gain = audioCtx.createGain();
    osc2Gain.gain.value = 0.5;
    osc2.type = Osc2_Type;
    osc2.frequency.value = midiToFreq(nt);
    osc2.detune.value = dt*100;
    console.log("detune " + osc2.detune.value);
    

    // OSC3
    const osc3 = audioCtx.createOscillator();
    const osc3Gain = audioCtx.createGain();
    osc3Gain.gain.value = 0.5;
    osc3.type = Osc3_Type;
    osc3.frequency.value = midiToFreq(nt);
    osc3.detune.value = -dt*100;

    // LFO
    const lfo = audioCtx.createOscillator();
    const lfoGain = audioCtx.createGain();
    lfoGain.gain.exponentialRampToValueAtTime(0.1,now+0.01);
    lfo.type = "sine";
    lfo.frequency.value = midiToFreq(nt-24);

    // Velocity
    const vGainAmount = (1 / 127) * velocity;
    const vGain = audioCtx.createGain();
    vGain.gain.value = vGainAmount;

    // Connection
    osc1.connect(osc1Gain);
    osc2.connect(osc2Gain);
    osc3.connect(osc3Gain);
    lfo.connect(lfoGain);

    const mixer = audioCtx.createChannelMerger();
    
    const mixerGain = audioCtx.createGain();
    mixerGain.gain.value = 0.5;

    osc1Gain.connect(mixer,0,2);
    osc2Gain.connect(mixer,0,0);
    osc3Gain.connect(mixer,0,1);
    lfoGain.connect(mixer,0,2);

    mixer.connect(mixerGain);
    mixerGain.connect(vGain,1,0);
    vGain.connect(vca);
    egOn(vca.gain, atk, dec, sus);

    osc1.gain = osc1Gain;
    osc2.gain = osc2Gain;
    osc3.gain = osc3Gain;
    lfo.gain = lfoGain;

    OSC1[note.toString()] = osc1;
    OSC2[note.toString()] = osc2;
    OSC3[note.toString()] = osc3;
    LFO[note.toString()] = lfo;

    console.log("play note",OSC1,OSC2,OSC3,LFO);

    osc1.start();
    osc2.start();
    osc3.start();
    lfo.start();
}

function isEmptyObj(obj) {
    return Object.keys(obj).length === 0;
}

function stopNote(note,velocity) {

    var now = audioCtx.currentTime;

    const osc1 = OSC1[note.toString()];
    const osc1Gain = osc1.gain;

    const osc2 = OSC2[note.toString()];
    const osc2Gain = osc2.gain;

    const osc3 = OSC3[note.toString()];
    const osc3Gain = osc3.gain;

    const lfo = LFO[note.toString()];
    const lfoGain = lfo.gain;

    var a = parseFloat(Release.value) + now;
    
    console.log("a is",a);

    osc1Gain.gain.setValueAtTime(osc1Gain.gain.value, now);
    osc1Gain.gain.exponentialRampToValueAtTime(0.0001, a);

    osc2Gain.gain.setValueAtTime(osc2Gain.gain.value, now);
    osc2Gain.gain.exponentialRampToValueAtTime(0.0001, a);

    osc3Gain.gain.setValueAtTime(osc3Gain.gain.value, now);
    osc3Gain.gain.exponentialRampToValueAtTime(0.0001, a);

    lfoGain.gain.setValueAtTime(lfoGain.gain.value, now);
    lfoGain.gain.exponentialRampToValueAtTime(0.0001, a);


    setTimeout(() => {
        osc1.stop();
        osc1.disconnect();
        osc2.stop();
        osc2.disconnect();
        osc3.stop();
        osc3.disconnect();
        lfo.stop();
        lfo.disconnect();
    }, 1000)

    delete OSC1[note.toString()];
    delete OSC2[note.toString()];
    delete OSC3[note.toString()];
    delete LFO[note.toString()];
    console.log("Stop Note",OSC1,OSC2,OSC3,LFO);
    
}


//Pitch control


//LOG