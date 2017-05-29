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
var div2 = document.getElementById("poem-info");


function appendPoem(poemArray) {
    poemArray.forEach(line => {
        var z = document.createElement('p');
        z.innerHTML = line;
        div.appendChild(z);
    });
}

function displayTitle(title, author) {
    var titleHeader = document.createElement('h1');
    var authorHeader = document.createElement('h3');
    titleHeader.innerHTML = Boolean(title) ? title : "Unknown title";
    authorHeader.innerHTML = Boolean(author) ? author : "Unknown author";
    div2.appendChild(titleHeader);
    div2.appendChild(authorHeader);
}


allFiles = readTextFile("js/files.txt").split("\n").map(obj => obj.substr(1));
var randomPoemDir = "js/collection" + allFiles[Math.floor(Math.random() * allFiles.length)];
// var poemJSON = readTextFile(randomPoemDir);

$.getJSON(randomPoemDir, function(json) {
    poemJSON = json; // this will show the info it in firebug console
    appendPoem(poemJSON.text);
    displayTitle(poemJSON.title, poemJSON.author);
    console.log(poemJSON);
});