var allFiles;
var poemJSON;

function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    var rawText;
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                rawText = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);

    return rawText;
}

var div = document.getElementById("poem");

function appendPoem(poemArray) {
    poemArray.forEach(line => {
        var z = document.createElement('p');
        z.innerHTML = line;
        div.appendChild(z);
    });
}

allFiles = readTextFile("js/files.txt").split("\n").map(obj => obj.substr(1));
var randomPoemDir = "js/collection" + allFiles[Math.floor(Math.random() * allFiles.length)];
var poemJSON = readTextFile(randomPoemDir);

$.getJSON(randomPoemDir, function(json) {
    poemJSON = json; // this will show the info it in firebug console
    appendPoem(poemJSON.text);
    console.log(poemJSON);
});