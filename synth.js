//Create AUDIO CTX
//Neet Jack 2023
let AudioContext = window.AudioContext || window.webkittAudioContext;
let audioCtx = new AudioContext({
    latencyHint: 'balanced',
    sampleRate: 48000,
});
let ST = audioCtx.destination;

// Reverb Switch
let ReverbState = false;
function flip(){
    ReverbState = !ReverbState;
    
    if (ReverbState == false){
        let text = document.getElementById("btnREV").innerHTML = "REVERB ON";
    } else{
        let text = document.getElementById("btnREV").innerHTML = "REVERB OFF";
    }
    console.log("reverb "+ReverbState);
}

//Create OSC
const OSC1 = {};
const OSC2 = {};
const OSC3 = {};
const LFO  = {};

let Osc1_Type = 'sawtooth';
let Osc2_Type = 'sawtooth';
let Osc3_Type = 'sawtooth';
let LFO_Type  = 'triangle';
        
//DETUNE
let detuneAmont = 0.1;
let detune = document.querySelector('.Detune_Fader');
    detune.oninput = function(){
    changeDetune(detune.value);
    }
function changeDetune(val){
     detuneAmont = val;
    detuneDisplay.innerHTML = val;
}

//Master
let masterGain = audioCtx.createGain();
masterGain.gain.value = 0.2;

let master = document.querySelector('.masterGain');
master.oninput = function() {
    changeMaster(master.value);
}
function changeMaster(vol) {
    masterGain.gain.value = vol;
    master.value = vol;
    document.getElementById("mgDisplay").innerHTML = vol;
    console.log('MasterGain is' + ' ' + masterGain.gain.value);
}

// create filter1
let Filter1 = audioCtx.createBiquadFilter();
Filter1.frequency.value = 10000;
Filter1.Q.value = 10;
Filter1.gain.value = 0;

// Analyzer
// Get HTML
const visualizer = document.getElementById('visualizer');
const canvas = document.getElementById('canvas1');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight; 

const ctx = canvas.getContext('2d');

let analyzer = audioCtx.createAnalyser();
analyzer.fftSize = 128;
// analyzer.frequencyBinCount half fft
const bufferLength = analyzer.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

// Canvas
const barWidth = canvas.width/bufferLength;
let barHeight;
let xbar;

function animateBar(){
    xbar = 0;
    ctx.clearRect(0,0, canvas.width, canvas.height);
    analyzer.getByteFrequencyData(dataArray);
    for (let i = 0; i< bufferLength; i++){
        barHeight = dataArray[i] * 4;
        ctx.fillStyle = "red";
        ctx.fillRect(xbar, canvas.height - barHeight, barWidth, barHeight);
        xbar += barWidth;
    }
    requestAnimationFrame(animateBar);
}
animateBar();

// Connect
masterGain.connect(Filter1);
Filter1.connect(analyzer);
analyzer.connect(ST);

/*

let Osc1_Gain  = audioCtx.createGain();
Osc1_Gain.gain.value  = 0.4;
let Osc2_Gain  = audioCtx.createGain();
Osc2_Gain.gain.value  = 0.4;
let Osc3_Gain  = audioCtx.createGain();
Osc3_Gain.gain.value  = 0.4;

let Gain_1 = document.querySelector('.Gain_1')
Gain_1.oninput = function(){
    changeMaster(Gain_1.value);
}
function change_Gain_1(vol){
    Osc1_Gain.gain.value = vol;
    Gain_1.value = vol;
    document.getElementById("g1Display").innerHTML = vol;
    console.log('Gain_1 is' + ' ' + Osc1_Gain.gain.value);
}

let Gain_2 = document.querySelector('.Gain_2')
Gain_2.oninput = function(){
    changeMaster(Gain_2.value);
}
function change_Gain_2(vol){
    Osc2_Gain.gain.value = vol;
    Gain_2.value = vol;
    document.getElementById("g2Display").innerHTML = vol;
    console.log('Gain_2 is' + ' ' + Osc2_Gain.gain.value);
}

let Gain_3 = document.querySelector('.Gain_3')
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
  
    let now = audioCtx.currentTime;
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
    mixerGain.connect(vGain);

    if (ReverbState == false){
        vGain.connect(vca);
    } else{
        reverb(vGain,vca,-0.5);
    }  
    
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

//STOP NOTE
function stopNote(note,velocity) {

    let now = audioCtx.currentTime;

    const osc1 = OSC1[note.toString()];
    const osc1Gain = osc1.gain;

    const osc2 = OSC2[note.toString()];
    const osc2Gain = osc2.gain;

    const osc3 = OSC3[note.toString()];
    const osc3Gain = osc3.gain;

    const lfo = LFO[note.toString()];
    const lfoGain = lfo.gain;

    let a = parseFloat(Release.value) + now;
    
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



//LOG