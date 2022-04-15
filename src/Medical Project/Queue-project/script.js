var intervalId = null;
var varCounter = 0;
var varName = () => {
    if (varCounter < 9) {
        varCounter++;
        document.getElementById('current-no').innerHTML = 'A' + varCounter;
    } else {
        clearInterval(intervalId);
    }
};

intervalId = setInterval(varName, 3000);