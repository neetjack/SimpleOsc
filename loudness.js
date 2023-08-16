//let dbfs = 20 *Math.log10(gain);
//let gain = Math.pow( 10 , dbfs / 20);

//Convert dB to Gain
function dBfsToGain(dbfs){
    return Math.pow(10, dbfs/20);

}

