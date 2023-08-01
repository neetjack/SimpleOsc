//demo play
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
var bpm = 120;
var beat = ((120 / bpm) / 4) * 1000;
async function playDemo() {
    console.log("Demo On");
    //Song Command
    //bar 1
    noteOn(72, 70);
    await sleep(beat);
    noteOff(72);
    await sleep(beat);

    //bar 2
    noteOn(72, 100);
    await sleep(beat);
    noteOff(72);
    await sleep(beat);

    noteOn(76, 70);
    await sleep(beat);
    noteOff(76);
    await sleep(beat);

    noteOn(79, 70);
    await sleep(beat);
    noteOff(79);
    await sleep(beat);

    //bar 3
    noteOn(79, 100);
    await sleep(beat * 1.5);
    noteOff(79);
    await sleep(beat);

    await sleep(beat);
    await sleep(beat);

    noteOn(91, 70);
    noteOn(88, 70);
    await sleep(beat);
    noteOff(91);
    noteOff(88);
    await sleep(beat);

    //bar 4
    noteOn(91, 110);
    noteOn(88, 110);
    await sleep(beat * 1.5);
    noteOff(91);
    noteOff(88);
    await sleep(beat);

    await sleep(beat);
    await sleep(beat);

    noteOn(88, 80);
    noteOn(84, 80);
    await sleep(beat);
    noteOff(88);
    noteOff(84);
    await sleep(beat);

    //bar 5
    noteOn(88, 80);
    noteOn(84, 80);
    await sleep(beat * 1.5);
    noteOff(88);
    noteOff(84);
    await sleep(beat);

    await sleep(beat);
    await sleep(beat);

    noteOn(72, 70);
    await sleep(beat);
    noteOff(72);
    await sleep(beat);

    //bar 6
    noteOn(72, 100);
    await sleep(beat);
    noteOff(72);
    await sleep(beat);

    noteOn(76, 70);
    await sleep(beat);
    noteOff(76);
    await sleep(beat);

    noteOn(79, 70);
    await sleep(beat);
    noteOff(79);
    await sleep(beat);

    //bar 7
    noteOn(79, 100);
    await sleep(beat * 1.5);
    noteOff(79);
    await sleep(beat);

    await sleep(beat);
    await sleep(beat);

    noteOn(91, 100);
    noteOn(86, 100);
    await sleep(beat);
    noteOff(91);
    noteOff(86);
    await sleep(beat);

    //bar 8
    noteOn(91, 110);
    noteOn(86, 110);
    await sleep(beat * 1.5);
    noteOff(91);
    noteOff(86);
    await sleep(beat);

    await sleep(beat);
    await sleep(beat);

    noteOn(89, 70);
    noteOn(83, 70);
    await sleep(beat);
    noteOff(89);
    noteOff(83);
    await sleep(beat);

    //bar 9
    noteOn(89, 70);
    noteOn(83, 70);
    await sleep(beat * 1.5);
    noteOff(89);
    noteOff(83);
    await sleep(beat);
}