//challenge 1: Your Age is Days
function ageInDays(){

}
function ageInDays(){
    var birthYear = prompt("What year were you born...Buddy!!");
    var ageInDays = (2021 - birthYear ) * 365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are '+ ageInDays + 'days old');
    h1.setAttribute('id','ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}
function reset(){
    document.getElementById('ageInDays').remove();
}

//challenge 2 : Cat Generator

const catGenerator = document.getElementById('cat-generator');
catGenerator.addEventListener('click',() =>{
    let image = document.createElement('img');
    image.setAttribute('id','newCat');
    let div = document.getElementById('flex-cat-gen');
    image.src = "https://upload.wikimedia.org/wikipedia/commons/2/2c/Rotating_earth_%28large%29.gif";
    div.appendChild(image);
});

const catRemover = document.getElementById('cat-remover');
catRemover.addEventListener('click',() => {
    document.getElementById('newCat').remove();
})

//challenger 3 : Stone Paper Scissors

function rps(yourChoice){

    
    array = ["stone", "paper", "scissor"];
    humanChoice = array[yourChoice];
    botChoice = array[Math.floor(Math.random()*array.length)];
    results = decideWinner(humanChoice, botChoice); // to check the winner
    // print result {message:'winner', 'color':'green'}
    rpsfrontEnd(humanChoice, botChoice, results, array);

}

function decideWinner(humanChoice, botChoice){
    if(humanChoice == botChoice)
    {
        return {message:"Match Drawn!!" , humanColor:"blue" , botColor:"blue"};
    }
    else if(humanChoice == "stone") // stone - human
    {
        if(botChoice == "paper") // paper - bot
        {
            return {message:"You lose!!", humanColor:"red", botColor:"green"};
        }
        else if(botChoice =="scissor") // scissor - bot
        {
            return {message:"You won!!", humanColor:"green", botColor:"red"};
        }
        else{
            alert("Wrong input");
        }
    }
    else if(humanChoice == "paper") // paper - human
    {
        if(botChoice == "stone")// stone - bot
        {
            return {message:"You won!!", humanColor:"green", botColor:"red"};
        }
        else if(botChoice == "scissor") // scissor - bot
        {
            return {message:"You lose!!", humanColor:"red", botColor:"green"};
        }
        else{
            alert("Wrong input");
        }
    }
    else if(humanChoice == "scissor") // scissor - human
    {
        if(botChoice == "stone") // stone - bot
        {
            return {message:"You lose!!", humanColor:"red", botColor:"green"};
        }
        else if(botChoice == "paper") //paper - bot
        {
            return {message:"You won!!", humanColor:"green", botColor:"red"};
        }
        else{
            alert("Wrong input");
        }
    }
    else{
        alert("Wrong input");
    }
}

function rpsfrontEnd(yourChoice, botChoice, results, array)
{
    realSrcArray = ["download (1).png", "109-1094319_rock-paper-scissors-png.png", "536-5360227_scissors-hand-rock-paper-scissors-png-clipart.png"] ;

    indexOfHuman = array.indexOf(yourChoice);
    indexOfBot = array.indexOf(botChoice);

    document.getElementById('human').src = realSrcArray[indexOfHuman];
    document.getElementById('human').style.background = results["humanColor"];

    document.getElementById('bot').src = realSrcArray[indexOfBot];
    document.getElementById('bot').style.background = results["botColor"];

    document.getElementById('result').innerHTML = results["message"];
    document.getElementById('result').style.color = results["humanColor"];
}

//challenge 4: change the color of all buttons!
const allButton = document.getElementsByTagName('button');

const copyButton = []
for(let i=0 ; i<allButton.length ; i++){
    copyButton.push(allButton[i].classList[1]);
}

function buttonColorChange(select){

    if(select.value == "red"){
        buttonRed();
    }
    else if(select.value == "green"){
        buttonGreen();
    }
    else if(select.value == "random"){
        buttonRandom();
    }
    else if(select.value == "reset"){
        buttonReset();
    }
}

function buttonRed(){
    for(let i=0; i<allButton.length ;i++){
        allButton[i].classList.remove(allButton[i].classList[1]);
        allButton[i].classList.add('btn-danger');
    }
}

function buttonGreen(){
    for(let i=0; i<allButton.length ;i++){
        allButton[i].classList.remove(allButton[i].classList[1]);
        allButton[i].classList.add('btn-success');
    }
}

function buttonReset(){
    for(let i=0; i<allButton.length ;i++){
        allButton[i].classList.remove(allButton[i].classList[1]);
        allButton[i].classList.add(copyButton[i]);
    }
}
function buttonRandom(){
    for(let i=0; i<allButton.length ;i++){
        allButton[i].classList.remove(allButton[i].classList[1]);
        allButton[i].classList.add(copyButton[Math.floor(Math.random()*copyButton.length)]);
    }
}

//challenge 5 : BlackJack

const  blackJackGame = {
    'you':{'scoreSpan':'your-blackjack-result' , 'div':'your-box', 'score':0},
    'dealer':{'scoreSpan':'dealer-blackjack-result' , 'div':'dealer-box', 'score':0},
    'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11]},
    'wins':0,'losses':0,'draws':0,
    'isStand': false,
    'turnOver': false,
    'resultCame' : false
};

const YOU = blackJackGame['you'];
const DEALER = blackJackGame['dealer']
const CARDS = blackJackGame['cards']

const hitSound = new Audio('sounds/swish.m4a');
const winSound = new Audio('sounds/cash.mp3');
const lossSound = new Audio('sounds/aww.mp3');
const hitButton = document.querySelector('#hit');
const dealButton = document.querySelector('#deal');
const standButton = document.querySelector('#stand');

hitButton.addEventListener("click",blackJackHit);
dealButton.addEventListener("click",blackJackDeal);
standButton.addEventListener("click", dealerLogic);


function blackJackHit(){
    if(blackJackGame['isStand'] === false){
        let card = randomCard();
        showCard(YOU,card);
        updateScore(YOU,card);
        showScore(YOU);
    }
}

function randomCard(){
    let randomIndex = Math.floor(Math.random()*13);
    return blackJackGame['cards'][randomIndex];
}

function showCard(activePlayer,selectedCard)
{
    if(activePlayer['score'] <= 21){
        let cardImage = document.createElement('img');
        cardImage.src = `images/${selectedCard}.png`;
        document.querySelector(`.${activePlayer['div']}`).appendChild(cardImage);
        hitSound.play();
    }
 }

 function blackJackDeal(){
     if(blackJackGame['turnOver'] === true){
        let yourImage = document.querySelector('.your-box').querySelectorAll('img');

        let dealerImage = document.querySelector('.dealer-box').querySelectorAll('img');

        for(let i=0 ; i<yourImage.length ; i++){
            yourImage[i].remove();
        }
        for(let i=0 ; i<dealerImage.length ; i++){
            dealerImage[i].remove();
        }

        YOU['score'] = 0;
        DEALER['score'] = 0;
        document.querySelector('#your-blackjack-result').innerHTML = 0;
        document.querySelector('#dealer-blackjack-result').innerHTML = 0;
        document.querySelector('#your-blackjack-result').style.color = 'white';
        document.querySelector('#dealer-blackjack-result').style.color = 'white';
        document.querySelector('#blackjack-result').innerHTML = "Let's play";
        document.querySelector('#blackjack-result').style.color = 'black';
        blackJackGame['isStand'] = false;
        blackJackGame['turnOver'] = false;
        blackJackGame['resultCame'] = false;
     }
 }

 function updateScore(activePlayer,card){
     if(card === 'A')
     {
        //If adding 11 keeps me below 21, and add 11
     //else add 1
        if((activePlayer['score'] + blackJackGame['cardsMap'][card][1]) <= 21)
        {
            activePlayer['score'] += blackJackGame['cardsMap'][card][0];
        }
        else
        {
            activePlayer['score'] += blackJackGame['cardsMap'][card][1];
        }
     }
     else
     {
        activePlayer['score'] += blackJackGame['cardsMap'][card];
     }  
 }

 function showScore(activePlayer){
     if(activePlayer['score'] > 21){
        document.querySelector(`#${activePlayer['scoreSpan']}`).textContent = 'BUST!';
        document.querySelector(`#${activePlayer['scoreSpan']}`).style.color ='red';
     }
     else{
        document.querySelector(`#${activePlayer['scoreSpan']}`).innerHTML = activePlayer['score'];
     }
 }
 function sleep(ms){
     return new Promise(resolve => setTimeout(resolve,ms));
 }
 async function dealerLogic(){
     while(DEALER['score'] < 16 ){
        if(blackJackGame['resultCame'] === false)
        {
            let card = randomCard();
            showCard(DEALER,card);
            updateScore(DEALER,card);
            showScore(DEALER);
            blackJackGame['isStand'] = true;
            await sleep(500);
        }
    }
    while(DEALER['score'] < YOU['score'] && YOU['score']<=21){
        let card = randomCard();
        showCard(DEALER,card);
        updateScore(DEALER,card);
        showScore(DEALER);
        blackJackGame['isStand'] = true;
        await sleep(500);
    }
    blackJackGame['turnOver'] = true;
    let winner = computeWinner();
    showResult(winner);
    document.querySelector('#wins').innerHTML = blackJackGame['wins'];
    document.querySelector('#losses').innerHTML = blackJackGame['losses'];
    document.querySelector('#draws').innerHTML = blackJackGame['draws'];
    blackJackGame['resultCame'] = true;

 }

 // compute winner and return who won
 // update win , draws and losses
 function computeWinner(){
     let winner ;
    
     if(YOU['score'] <= 21){
         // condition : higher score than dealer or when dealer busts
         if(YOU['score'] > DEALER['score'] || DEALER['score'] >21 ){
            // console.log("You won");
            blackJackGame['wins']++;
            winner = YOU;
         }
         else if (YOU['score'] < DEALER['score']){
            //  console.log("You loss");
            blackJackGame['losses']++;
             winner = DEALER;
         }
         else if(YOU['score'] == DEALER['score']){
            blackJackGame['draws']++;
            //  console.log("DRAW");
         }
     }
     //I bust
     else if(YOU['score'] >21 && DEALER['score']<=21){
         console.log("You Lost");
         blackJackGame['losses']++;
         winner = DEALER ;
     }
     // both bust
     else if(YOU['score'] >21 && DEALER['score'] >21){
        //  console.log("You draw");
        blackJackGame['draws']++;
     }
     return winner;
 }

 function showResult(winner){
    let message , messageColor;
    if(blackJackGame['turnOver'] === true){
        if(winner === YOU){
            message = 'You Won';
            messageColor = 'green';
            winSound.play();
        }
        else if(winner === DEALER){
            message = 'You Loss';
            messageColor = 'red';
            lossSound.play();
        }
        else{
            message = 'You Drew!';
            messageColor = 'black';
        }
        document.querySelector('#blackjack-result').innerHTML = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }
 }