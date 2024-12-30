let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn"); // Fix to select a single button

let turnO = true;
let gameOver = false; // Variable to track if the game is over

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (gameOver || box.innerText !== "") return; // Prevent clicks after game over or if already marked
        
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        
        checkWinner();
    });
});

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val && pos2Val && pos3Val && pos1Val === pos2Val && pos2Val === pos3Val) {
            alert(`${pos1Val} wins!`); // Display a winner message
            gameOver = true;
            return; // Exit the function once a winner is found
        }
    }
    // Check for a draw
    if ([...boxes].every(box => box.innerText !== "")) {
        alert("It's a draw!");
        gameOver = true;
    }
};

resetBtn.addEventListener("click", () => {
    boxes.forEach(box => {
        box.innerText = ""; // Clear all box contents
        box.classList.remove("disabled"); // Remove disabled class (if added for styling)
    });
    turnO = true; // Start with O
    gameOver = false; // Reset game over status
});
