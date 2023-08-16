//make midi in browser
//Neet Jack 2023
//midi check

if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess().then(success, failure);
}

function success(midiAccess) {
    midiAccess.addEventListener('statechange', updateDevices);

    const inputs = midiAccess.inputs;

    inputs.forEach((input) => {
        input.addEventListener('midimessage', handlemidiInput);
    })
}


function handlemidiInput(input) {
    const command = input.data[0];
    const note = input.data[1];
    const velocity = input.data[2];
    console.log("command is",command);
    switch (command) {
        case 144: //noteOn
            if (velocity > 0) {
                noteOn(note, velocity);
            } else {
                noteOff(note);
            }
            break;
        case 128: //noteOff
            noteOff(note);
            break;

    }

}



function midiToFreq(number) {
    const a = 440;
    return (a / 32) * (2 ** ((number - 9) / 12));
}


function noteOn(note, velocity) {
    console.log("note ON",note, velocity);
    playNote(note, velocity);
}

function noteOff(note, velocity) {
    console.log("note OFF",note, velocity);
    stopNote(note, velocity);
}

function updateDevices(event) {
    console.log(`Name:${event.port.name},Brand:${ event.port.manufacturer},State:${event.port.state},Type:${event.port.type}`);
}

function failure() {
    console.log('Please use Firefox for maximum experience');
}