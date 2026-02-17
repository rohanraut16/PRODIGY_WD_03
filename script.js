let board = document.getElementById("board");
let message = document.getElementById("message");
let resetBtn = document.getElementById("resetBtn");

let turn = "X";
let gameOver = false;
let positions = ["", "", "", "", "", "", "", "", ""];

let winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// create 9 boxes
function createGrid() {
    board.innerHTML = "";

    for (let i = 0; i < 9; i++) {
        let div = document.createElement("div");
        div.classList.add("box");
        div.setAttribute("data-id", i);
        div.addEventListener("click", handleClick);
        board.appendChild(div);
    }
}

function handleClick(e) {
    let index = e.target.getAttribute("data-id");

    if (positions[index] !== "" || gameOver) {
        return;
    }

    positions[index] = turn;
    e.target.innerText = turn;

    checkWinner();
}

function checkWinner() {
    for (let pattern of winPatterns) {
        let a = pattern[0];
        let b = pattern[1];
        let c = pattern[2];

        if (
            positions[a] !== "" &&
            positions[a] === positions[b] &&
            positions[a] === positions[c]
        ) {
            message.innerText = "Player " + turn + " Wins 🎉";
            gameOver = true;
            return;
        }
    }

    if (!positions.includes("")) {
        message.innerText = "Match Draw";
        gameOver = true;
        return;
    }

    turn = turn === "X" ? "O" : "X";
    message.innerText = "Player " + turn + " Turn";
}

resetBtn.addEventListener("click", function() {
    positions = ["", "", "", "", "", "", "", "", ""];
    turn = "X";
    gameOver = false;
    message.innerText = "Player X Turn";
    createGrid();
});

createGrid();
