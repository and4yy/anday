function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const lowerBound = 1
const upperBound =  42
var currentHadith;

function _decrementButtons(){
    currentHadith = Math.max(currentHadith -1, lowerBound);
    setupPageContent()
}

function _incrementButtons(){
    currentHadith = Math.min(currentHadith +1, upperBound);
    setupPageContent()
}


function setupPageContent(){
    console.log(currentHadith)

    var rootDestination = "http://sunnah.com/nawawi40/"
    var destination =rootDestination + currentHadith
    document.getElementById('hadith-iframe').src = destination;

}

document.addEventListener("DOMContentLoaded", function(event) {

	currentHadith = getRandomInt(lowerBound,upperBound);
    setupPageContent()

});
