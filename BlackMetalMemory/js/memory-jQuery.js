/*Memory game by Tommy Forsberg (C) 2017*/

$(document).ready(function() {
    printAllCards();

    var clicks = 0;
    var card1;
    var card2;
    var card1Class;
    var card2Class;


//Mechanics for marking cards as turned if matching pairs
    $('.card').click(function () {
        clicks++;
        var cardid = $(this).attr("id");
        var cardclass = $(this).attr("class");
        var cardNumber = findCardInArray(cardid);
        $(this).css('background-image', 'url("img/'+ cards[cardNumber].motif+'")');
        switch(clicks){
            case 1: card1 = cardid;
                card1Class = cardclass;
                break;
            case 2: card2 = cardid;
                card2Class = cardclass;
                //Check if cards match
                if(card1Class==card2Class && card1 != card2){
                    cards[findCardInArray(card1)].turned=true;
                    clicks=0;
                }
                break;
            case 3: clicks = 0;
                card1 = "";
                card2="";
                controlGameFieldStatus();
                break;
        }

        //Indents gamefield and changes images according to bool turned
        function controlGameFieldStatus(){
            for(i = 0; i < cards.length; i++){
                if(cards[i].turned == false){
                    var selectedCards = document.getElementsByClassName(cards[i].motif);
                    selectedCards[0].style.removeProperty("background-image");
                    selectedCards[1].style.removeProperty("background-image");
                }
            }
        }
    });
//Resize card
    $('.card').mouseenter(function () {
        $(this).animate({
            width: '+=5px', height: '+=5px',
            "margin-left": '-=5px',
            "margin-top": '-=5px'
        });
    });
    //Resize card
    $('.card').mouseleave(function () {
        $(this).animate({
            width: '-=5px', height: '-=5px',
            "margin-left": '+=5px',
            "margin-top": '+=5px'
        });
    });

    //Finds index of single card in array
    function findCardInArray(titel){
        var sliceNumber = titel.slice(0,-1);
        for(i = 0; i <= cards.length; i++){
            if(cards[i].motif==sliceNumber){
                return i;
            }
        }
    }
});

var cards = [
    {
        turned: false,
        motif: 'mayhem.jpg'
    },{
        turned: false,
        motif: 'satyricon.jpg'
    },{
        turned: false,
        motif: 'ashdautas.jpg'
    },{
        turned: false,
        motif: 'denouncementpyre.png'
    },{
        turned: false,
        motif: 'drowningthelight.jpg'
    },{
        turned: false,
        motif: 'gorgoroth.png'
    },{
        turned: false,
        motif: 'marduk.jpg'
    },{
        turned: false,
        motif: 'b-m1.jpg'
    }
];



function randomizeArray(){
    for(i = 0; i < cards.length; i++) {
        var firstRandom = Math.floor((Math.random() * cards.length));
        var secondRandom = Math.floor((Math.random() * cards.length));
        var selectedElement = cards[firstRandom];
        var selectedElement2 = cards[secondRandom];
        cards[firstRandom] = selectedElement2;
        cards[secondRandom] = selectedElement;
    }
}
//Initializes gamefield with all cards in the card-array.
function printAllCards() {
    for(x=0;x < 2; x++){
        randomizeArray();
        for (i = 0; i < cards.length; i++) {
            var newDiv = document.createElement("div");
            newDiv.id = cards[i].motif+x; //Generates ID according to for-loop.
            newDiv.className = 'card ' + cards[i].motif;
            $("#gameField").append(newDiv);
        }
    }
}
