var filter1 = audioCtx.createBiquadFilter();

const [filter1Setting, setFilter1Settings] = useState({
    frequency: filter1.frequency.value,
    detune: filter1.detune.value,
    type: filter1.type,
    Q: filter1.Q.value,
    Gain: filter1.gain.value
})

const changeFilter1 = e =>{
    let {value, id} = e.target;
    setFilter1Settings({...filter1Setting, [id]:value});
    filter1[id].value = value;
}