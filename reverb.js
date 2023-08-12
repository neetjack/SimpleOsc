//reverb
function impulseResponse(duration,decay){
    let length = audioCtx.sampleRate * duration;
    let impulse = audioCtx.createBuffer(2,length,audioCtx.sampleRate);
    let myImpulse = impulse.getChannelData(0)
    for (let i=0;i<length;i++){
        myImpulse[i] = (2*Math.random()-1)*Math.pow(1-i/length,decay);
    }
    return impulse;
}

function STreverb(nodeL,nodeR,output,ratio){
 
    let im = impulseResponse(2,1);

    let m1 = audioCtx.createChannelMerger(2);
    let m2 = audioCtx.createChannelMerger(2);
    let m3 = audioCtx.createChannelMerger(2);
    let s1 = audioCtx.createChannelSplitter(2);
    let s2 = audioCtx.createChannelSplitter(2)

    let ReverbL = audioCtx.createConvolver();
    ReverbL.buffer = im;
    let ReverbR = audioCtx.createConvolver();
    ReverbR.buffer = im;
    //ratio
    let G1 = audioCtx.createGain();
    let G2 = audioCtx.createGain();

    G1.value = ratio;
    G2.value = ratio;

    //connection
    //L
    nodeL.connect(s1);
    s1.connect(m1);
    s1.connect(ReverbL);
    ReverbL.connect(G1);
    G1.connect(m1);

    //R
    nodeR.connect(s1);
    s2.connect(m2);
    s2.connect(ReverbR);
    ReverbR.connect(G2);
    G2.connect(m2);

    //out
    m1.connect(m3);
    m2.connect(m3);
    m3.connect(output);
}








