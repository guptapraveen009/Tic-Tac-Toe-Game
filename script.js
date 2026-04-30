let boxes = document.querySelectorAll(".game-btn");
let reset = document.getElementById("reset");
let startbtn = document.querySelector(".start");
let frontscreen = document.querySelector(".startscreen");
let mainScreen = document.querySelector(".mainscreen");
let player1 = document.getElementById("firstplayer");
let player2 = document.getElementById("secondplayer");
let turnO = true;

let winOperations = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];
// Start
let p1 = " "
let p2 = " "
let message = document.createElement("div");
message.classList.add("meassge");
document.body.appendChild(message)

startbtn.addEventListener('click', (e) => {
     e.preventDefault()
    if (player1.value === "" || player2.value === "") {
        startbtn.disabled = true;
    }
    else {
        p1 = player1.value;
        p2 = player2.value;
        startbtn.disabled = false;
        frontscreen.classList.remove("active");
        mainScreen.classList.add("active");
        message.innerText = `${p1} It's Your Turn`;
    }
})



boxes.forEach((box) => {


    box.addEventListener("click", () => {
       
        if (turnO) {
            message.innerText = `${p2} It's Your Turn`;
            box.innerText = "O";
            turnO = false;

        }
        else {
            box.innerText = "X";
            turnO = true;
            message.innerText = `${p1} It's Your Turn`;

        }

        box.disabled = true

        winner();
    });

});


let Showwinner = (winner1) => {
    message.innerText = ""
    let Winnertext = document.createElement("div");
    Winnertext.classList.add('winner');
    let winnername = winner1 === "O" ? p1 : p2;
    Winnertext.innerText = `Congratulations ${winnername} Won`;
    document.body.appendChild(Winnertext);

    boxes.forEach((box) => {
        box.disabled = true;
    })
};
let draw = () => {
    message.innerText = ""
    let Draw = document.createElement('div');
    Draw.classList.add("Draw")
    Draw.innerText = "It's A Draw";
    document.body.appendChild(Draw);
    boxes.forEach((box) => {
        box.disabled = true
    })
}
// Winning Patters
let winner = () => {
    for (let postion of winOperations) {
        let postion1 = boxes[postion[0]].innerText;
        let postion2 = boxes[postion[1]].innerText;
        let postion3 = boxes[postion[2]].innerText;

        if (postion1 !== "" && postion2 !== "" && postion3 !== "") {
            if (postion1 === postion2 && postion2 === postion3) {

                Showwinner(postion1);
                return;
            }
         }
    }
    let filled = [...boxes].every(box => box.innerText !== "")
    if (filled === true) {
            draw();
    }
};

//End 
reset.addEventListener('click', () => {
    let confirmation = confirm("Do You Want Reset The Game");
    for (let i = 0; i < boxes.length; i++) {

        if (confirmation) {
            boxes[i].innerText = ""
            boxes[i].disabled = false
        }
    }
    let clear = document.querySelector(".winner")
    if (clear) {
        clear.remove()
    }
})