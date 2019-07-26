//執行遊戲
function startGame(){
    //spades黑桃 hearts紅桃 diamonds方塊 clubs梅花
    let suit = ["spades", "hearts", "diamonds", "clubs"];
    //撲克牌數字
    let number = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    //存放52張牌
    let poker = [];
    //拖曳的8欄
    let tablecard = [[], [], [], [], [], [], [], []];
    //左邊暫存區
    let temporarilyArea = [[], [], [], []];
    //右邊完成區
    let finishArea = [[], [], [], []];

    //原始牌組
    for (let i = 0; i < suit.length; i++) {
        for (let j = 0; j < number.length; j++) {
            if (suit[i] == 'spades' || suit[i] == 'clubs') {
                let item = [suit[i] + " " + number[j] + " black"];
                poker.push(item);
            } else {
                let item = [suit[i] + " " + number[j] + " red"];
                poker.push(item);
            }
        }
    }
    //洗牌
    function shuffle() {
        let num = Math.random() > 0.5 ? -1 : 1;
        return num;
    }

    poker.sort(shuffle);

    //畫面渲染
    for (let j = 0; j < poker.length; j++) {
        if (j < 7) {
            tablecard[0].push(poker[j]);
        } else if (j < 14) {
            tablecard[1].push(poker[j]);
        } else if (j < 21) {
            tablecard[2].push(poker[j]);
        } else if (j < 28) {
            tablecard[3].push(poker[j]);
        } else if (j < 34) {
            tablecard[4].push(poker[j]);
        } else if (j < 40) {
            tablecard[5].push(poker[j]);
        } else if (j < 46) {
            tablecard[6].push(poker[j]);
        } else {
            tablecard[7].push(poker[j]);
        }
    }
    console.log(tablecard);
    let gameFace = document.getElementById('face');
    //將八欄陣列渲染到畫面
    function putCard(){
        for (let i = 0; i < tablecard.length; i++) {
            let item = '<div class="item item' + (i + 1) + '"></div>';
            $('#face').append(item);
            for (let j = 0; j < tablecard[i].length; j++) {
                let cardtxt = tablecard[i][j].toString();
                let cardinfo = cardtxt.split(' ', 3);
                let cardsuit = cardinfo[0];
                let cardnumber = cardinfo[1];
                let cardcolor = cardinfo[2];
                let cardimg = 'background-image:url(../img/card/'+ cardsuit + '/' + cardsuit.substr(0, 1) + '_' + cardnumber + '.svg)';
                let card = '<div class="card" draggable="true" style='+ cardimg + '></div>';
                $('.item' + [i + 1]).append(card);
            }
        }
    };
    putCard();

    function finishColor(areaNumber){
        if(areaNumber==0){
            return 'spades';
        }else if(areaNumber==1){
            return 'hearts';
        }else if(areaNumber==2){
            return 'diamonds';
        }else if(areaNumber==3){
            return 'club';
        }
    };


    let dragCard = document.querySelectorAll('.card');
    for(let i=0; i<52;i++){
        dragCard[i].addEventListener('dragstart', startDrag);
        // dragCard[i].addEventListener('drop', endDrag, false);
    }


    let ltable = document.querySelectorAll('.lefttable');
    for (let i = 0; i < ltable.length; i++) {
        
        ltable[i].addEventListener('drop', endDrag);
        ltable[i].addEventListener('dragover', overDrag);
    }
    
    
    function startDrag(e){
        e.dataTransfer.setData("text", e.target.className   );
    };
    function overDrag(e) {
        e.preventDefault();
    };
    function endDrag(e){
        e.preventDefault();
        var data = e.dataTransfer.getData("text");

    };
   


};

window.addEventListener('load', startGame, false);
