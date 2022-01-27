//global handle to board div and controls div
// so we dont have to look it up every time
let boardNode;
let controlsNode;

//if AI goes first, need to know what players mark is
let playerMark = "X";

//holds the board buttons in nested arrays
//accessed like board[0][0] (top left button)
const board = [];

//assoc array of the other buttons
//accessed like controls.aiFirst or controls.reload
const controls = {};

const wincons = [    
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
//no return or params
//picks an open button and sets it as the AIs mark
//always sets aiFirst button to disabled
const aiGo = () => {
    
    const avail = []
    for(let i = 0;i<3;i++){
        for(let j=0;j<3;j++){
            if (board[i][j].innerHTML == '-'){
                avail.push([i,j])
            }
        }
    }
    const place = Math.floor(Math.random() * avail.length)
    const a = avail[place]
    const x = a[0]
    const y = a[1]
    //console.log(avail[place])
    //console.log(x)
    board[x][y].innerHTML = playerMark
    board[x][y].disabled = true
    
}


//return X, O, or - if game is over
//returns false if game isnt over
const checkEnd = () => {
    count = 0
    //tie check
    for(let i = 0;i<3;i++){
        for(let j=0;j<3;j++){
            if (board[i][j].innerHTML == "X" || board[i][j].innerHTML == "O"){
                count++
            }
        }
    }

    //make board 1d
    const board2=[]
    k=0;
    for(let i = 0;i<3;i++){
        for(let j=0;j<3;j++){
            board2[k]=board[i][j]
            k++;
        }
    }


    //check for winner
    for(let i=0; i<=7; i++){
        const win = wincons[i]
        a =board2[win[0]].innerHTML
        b =board2[win[1]].innerHTML
        c =board2[win[2]].innerHTML

        if(a == b && b == c && a !='-'){
            return 'a'
        }
    }

    //we found nothing and the board was full
    if(count == 9){
        return "-"
    }
    return false
}

//isnt an arrow function because this way it can use 'this' 
//to reference the button clicked.
//
//always sets aiFirst button to disabled
//sets button state (disabled and inner html)
//checks for end state (and possible ends game)
//calls aiGo
//checks for end state (and possible ends game)
const boardOnClick = function(){
    this.disabled = true
    this.innerHTML = playerMark
    controls.aiButton.disabled = true
   
    let winner = checkEnd()
    if(winner){
        return endGame(winner)
    }
    
    playerMark = playerMark === "X" ? "O" : "X";
    aiGo()
    playerMark = playerMark === "X" ? "O" : "X";

    winner = checkEnd()
    if(winner){
        return endGame(winner)
    }
 
}
//changes playerMark global, calls aiGo
const aiFirstOnClick = () => {
    
    controls.aiButton.disabled = true
    controls.aiButton.innerHTML = playerMark
    //tell player new piece name
    controls.text.innerHTML = "You are O"

    aiGo()
    playerMark = playerMark === "X" ? "O" : "X";
}

//takes in the return of checkEnd (X,O,-) if checkEnd isnt false
//disables all board buttons, shows message of who won (or cat game) in the control node
//using a new div and innerHTML
const endGame = (state)=>{
    if(checkEnd()) {
        won = checkEnd()
        //disable board
        controls.aiButton.disabled = true
        for(let i = 0;i<3;i++){
            for(let j=0;j<3;j++){
                board[i][j].disabled = true
            }
        }
        //display winner
        const win = document.createElement('div')
        if(won != "-"){
            win.innerHTML = "Winner is " + won
        }
        else{
            win.innerHTML = "Draw"
        }
        controlsNode.appendChild(win)
        controls.win = win
        return won
    }
    else{
        return false
    }
}



//called when page finishes loading
//populates the boardNode and controlsNode with getElementById calls
//builds out buttons and saves them in the board global array
//and adds them into the boardNode
//builds out buttons and saves them in control assoc array
//and adds them into controlsNode
//attaches the functions above as button.onclick as appropriate
const load = ()=>{
    boardNode = document.getElementById("board")
    controlsNode= document.getElementById("controls")
    
    for(let i = 0;i<3;i++){
        const row = [];
        board.push(row)
        const rowDiv = document.createElement('div')
        boardNode.appendChild(rowDiv)
        for(let j=0;j<3;j++){
            const button = document.createElement('button')
            button.innerHTML = "-"
            button.onclick = boardOnClick
            rowDiv.appendChild(button)
            row.push(button)
        }
    }
    //ai first
    const aiButton = document.createElement('button')
    aiButton.innerHTML = "Ai First"
    aiButton.onclick = aiFirstOnClick
    controlsNode.appendChild(aiButton)
    controls.aiButton = aiButton
    //refresh button
    const reloadButton = document.createElement('button')
    reloadButton.innerHTML = "Reload"
    reloadButton.onclick = function(){ window.location.reload(); };
    controlsNode.appendChild(reloadButton)
    controls.reloadButton = reloadButton
    //player piece is
    const text = document.createElement('div')
    text.innerHTML = "You are X"
    controlsNode.appendChild(text)
    controls.text = text
    
}

//this says 'when the page finishes loading call my load function'
window.addEventListener("load", load); 
