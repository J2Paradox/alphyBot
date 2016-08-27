// Kappa
if(message.includes("Kappa")){
    console.log("KAPPA DETECTED")
    // Kappa to overlay
    // io.emit('showemote', "Kappa");
    // Kappa counter
    var oldkappa = fs.readFileSync("counter/kappacount");
    var readkappa = parseInt(oldkappa);
    var newkappa = (readkappa + 1);
    fs.writeFileSync("counter/kappacount", newkappa);
}

// Get amount of send Kappas in chat
if(message == "!kappa"){
    var kappanumber = fs.readFileSync("counter/kappacount");
    client.say(config.broadname, "Total Kappa messages: " + kappanumber);
}
