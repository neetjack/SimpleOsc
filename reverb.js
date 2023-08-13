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



function reverb(input,output,ratio){
    let im = impulseResponse(1,1);

    let mc = audioCtx.createChannelMerger();
    let ml = audioCtx.createChannelMerger();
    let mr = audioCtx.createChannelMerger();
    let mall = audioCtx.createChannelMerger();

    ml.channelInterpretation = "discrete";
    mr.channelInterpretation = "discrete";
    mc.channelInterpretation = "discrete";

    let s1 = audioCtx.createChannelSplitter(3);
    let sl = audioCtx.createChannelSplitter(2);
    let sr = audioCtx.createChannelSplitter(2);
    let sc = audioCtx.createChannelSplitter(2);
    let slr = audioCtx.createChannelSplitter(2);

    let ReverbL = audioCtx.createConvolver();
    ReverbL.buffer = im;
    let ReverbR = audioCtx.createConvolver();
    ReverbR.buffer = im;
    let ReverbC = audioCtx.createConvolver();
    ReverbC.buffer = im;
    //ratio
   
    let G1 = audioCtx.createGain();
    let G2 = audioCtx.createGain();
    let G3 = audioCtx.createGain();

    G1.gain.value = ratio;
    G2.gain.value = ratio;
    G3.gain.value = ratio;

    //connection

    // 1-LR
    input.connect(s1);
    
    // L
    s1.connect(sl,0,0);

    sl.connect(ml,0,2);
    sl.connect(ReverbL,1,0);
    ReverbL.connect(G1);

    G1.connect(ml,0,2);

    
    // R
    s1.connect(sr,1,0);

    sr.connect(mr,0,2);
    sr.connect(ReverbR,1,0);
    ReverbR.connect(G2);

    G2.connect(mr,0,2);

    
    // C
    s1.connect(sc,2,0);

    sc.connect(mc);
    sc.connect(ReverbC);
    ReverbC.connect(G3);

    G3.connect(slr);
    slr.connect(ml);
    slr.connect(mr);

    // ALL
    ml.connect(mall,0,0);
    mr.connect(mall,0,1);
    mc.connect(mall,0,2);
    mall.connect(output);

}

/*

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

*/








