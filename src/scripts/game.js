var table = document.getElementById("gameTable");
var scoreElement = document.getElementById("score");
var score = 0;

var gameArray = [
    [,,,,],
    [,,,,],
    [,,,,],
    [,,,,],
    [,,,,]
];

// Setup cards
if (table != null) {
    for (let i = 0; i < table.rows.length - 1; i++) {
        let bombsInRow = 0; // There'll can be no more than 3 bombs per row
        for (let j = 0; j < table.rows[i].cells.length - 1; j++) { // Not including the last cell of the row, because that's the info column
            var row = table.rows[i];
            var cell = row.cells[j];

            var cardType = Math.floor(Math.random() * 4); // 0 = bomb, 1, 2, and 3 point values
            if (cardType === 0) { // Card is a Bomb
                if (bombsInRow <= 3) {
                    bombsInRow++;
                    gameArray[i][j] = 0;
                    row.cells[j].addEventListener("click", function() {
                        bombOnClick(this);
                });
                } else { // Just default it to One
                gameArray[i][j] = 1;
                row.cells[j].addEventListener("click", function() {
                    oneOnClick(this);
                    });
                }
            } else if (cardType === 1) { // Card is a One
                gameArray[i][j] = 1;
                row.cells[j].addEventListener("click", function() {
                    oneOnClick(this);
                });
            }  else if (cardType === 2) { // Card is a Two
                gameArray[i][j] = 2;
                row.cells[j].addEventListener("click", function() {
                    twoOnClick(this);
                });
            } else if (cardType === 3) { // Card is a Three
                gameArray[i][j] = 3;
                row.cells[j].addEventListener("click", function() {
                    threeOnClick(this);
                });
            }
        }
    }
}

// Set up right info column
if (table != null) {
    for (let i = 0; i < gameArray.length; i++) {
        let pointSum = 0;
        let bombs = 0;
        for (let j = 0; j < gameArray[i].length; j++) {
            if (gameArray[i][j] != 0) {
                pointSum += gameArray[i][j];
            } else {
                bombs++
            }
        }
        var row = table.rows[i];
        var cell = row.cells[row.cells.length - 1];
        modifyInfoCell(cell, pointSum, bombs);
    }   
}

// Setup bottom info row
if (table != null) {
    var bottomRow = table.rows[table.rows.length - 1];
    for (let i = 0; i < gameArray.length; i++) { // Loop through the rows
        let pointSum = 0; 
        let bombs = 0;

        for (let j = 0; j < gameArray[i].length ; j++) { // Loop through the columns
            console.log(gameArray[j][i]);
            if (gameArray[j][i] != 0) {
                pointSum += gameArray[j][i];
            } else {
                bombs++;
            }
        }

        modifyInfoCell(bottomRow.cells[i], pointSum, bombs);
    }
}

function bombOnClick(cell) {
    cell.firstElementChild.src = "img/bomb.png";
    alert("You hit a bomb! Game over!");
    window.location.reload();
    console.log("bomb");
}

function oneOnClick(cell) {
    cell.firstElementChild.src = "img/one.png";
    score++;
    scoreElement.innerHTML = "Score: " + score;
    console.log("one");
}

function twoOnClick(cell) {
    cell.firstElementChild.src = "img/two.png";
    if (score === 0) {
        score += 2;
    } else {
        score *= 2;
    }
    scoreElement.innerHTML = "Score: " + score;
    console.log("two");
}

function threeOnClick(cell) {
    cell.firstElementChild.src = "img/three.png";
    if (score === 0) {
        score += 3;
    } else {
        score *= 3;
    }
    scoreElement.innerHTML = "Score: " + score;
    console.log("three");
}

function modifyInfoCell(cell, points, bombs) {
    cell.innerHTML = "<p>" + points + "</p>" + "<hr />" + "<img src=\"img/bomb.png\" alt=\"Bomb icon\" /><p>" + bombs + "</p>";
}