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