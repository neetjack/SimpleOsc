
let Filter1_type = "lowpass";
Filter1.type = Filter1_type;

// Get Filter Freq Value From HTML
let filter1value = document.querySelector('.Filter1_Fader');
filter1value.oninput = function(){
    changeFilter1Value(filter1value.value);
}

// get filter type from HTML
function setF1LP(){
    Filter1_type = "lowpass";
    Filter1.type = Filter1_type;
    console.log("filter1 is " + Filter1.type);
}
function setF1HP(){
    Filter1_type = "highpass";
    Filter1.type = Filter1_type;
    console.log("filter1 is " + Filter1.type);
}
function setF1Bell(){
    Filter1_type = "peaking";
    Filter1.type = Filter1_type;
    console.log("filter1 is " + Filter1.type);
}

// Change Freq Value
function changeFilter1Value(vol){
    Filter1.frequency.value = vol;
    filter1value.value = vol;
    document.getElementById("filter1Display").innerHTML = vol;
    console.log("Filter1 freq is set to " + Filter1.frequency.value);
}

