// ---PART.0  マス（square） 100個分の "div" を作る----------------------
// ---class属性を付与、id属性を連番で付与する

for (let i = 0; i < 100; i++) {
    const newDivs = document.createElement("div");

    newDivs.classList.add("square", "inner");
    newDivs.setAttribute("id", "squares" + (i));
    newDivs.textContent = "●";

    document.querySelector("#board").append(newDivs);
}


// ---PART.1  グローバルスコープの定数・配列・関数置き場-------------

// マス<div class="square">が 100個 入ったブラウザ表示用『arraySquare』配列風を作る
const arraySquare = document.querySelectorAll(".square");

// 記録用の配列『arrayRecord』を作る。  
const arrayRecord = new Array(100).fill(0);
// const arrayRecord = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

// 勝敗を決める配列を作る
const ArrayWhiteWin = [];
const ArrayBlackWin = [];

// 変数『plus』『minus』を作る。  
const plus = +1;
const minus = -1;


// ---PART.2  記録用の配列『arrayRecord』にゲーム開始時のスコア（配置）を入力する-------------
// ---真ん中に黒と白。黒は"b"、白は"w"、空白は"0"とする
// ---勝敗の判定のため class="inner" は削除しておく

arrayRecord[44] = "w";
arrayRecord[45] = "b";
arrayRecord[54] = "b";
arrayRecord[55] = "w";

arraySquare[44].classList.remove("inner");
arraySquare[45].classList.remove("inner");
arraySquare[54].classList.remove("inner");
arraySquare[55].classList.remove("inner");


// ---PART.3  全てのはじまり

window.onload = function () {
    outer();   // PART.4  番兵さん。
    drawing(); // PART.5
    ableCheckBlack(); // PART.6-1-1
    putStone();       // PART.7
}


// ---PART.4  番兵さん。-------------
// ---外周の<div>にclass="outer"を付与する。（class="inner"は削除）
// ---石を置くことが可能なことを示す（色が変わる）class="able" はクリックする度に毎回削除する

const arrayOuterIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 19, 29, 39, 49, 59, 69, 79, 89, 99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 80, 70, 60, 50, 40, 30, 20, 10]

function outer() {
    for (let i = 0; i < arrayOuterIndex.length; i++) {
        arraySquare[arrayOuterIndex[i]].classList.remove("inner");
        arraySquare[arrayOuterIndex[i]].classList.add("outer");

        arraySquare[arrayOuterIndex[i]].classList.remove("able");
        // arraySquare[arrayOuterIndex[i]].classList.add("darkgreen");
    }
}


// ---PART.5---記録用の配列『arrayRecord』のスコアに合わせてブラウザ上の盤面を表示する----------

function drawing() {
    for (let i = 0; i < 100; i++) {

        // arraySquare[i].classList.remove("darkgreen");
        arraySquare[i].classList.remove("black");
        arraySquare[i].classList.remove("white");

        if (arrayRecord[i] == "b") {
            arraySquare[i].classList.add("black");
        } else if (arrayRecord[i] == "w") {
            arraySquare[i].classList.add("white");
        } else if (arrayRecord[i] == 0) {
            // arraySquare[i].classList.add("darkgreen");
        } else {
        }
    }
}


// ---PART.6---ルール上、石が置けるか置けないかを確認する----------

// ---PART.6-1-1 黒石が置けるか置けないかを判定する
function ableCheckBlack() {

    for (let i = 0; i < 100; i++) {

        // まず前回付与したclass="able"を削除する
        arraySquare[i].classList.remove("able");


        // 引数  (i, count, direction, sign, ownColor, opponentColor)
        // i はindex どこをクリックしたか
        // count は再起を何回繰り返したか
        // direction は「等差数列」におけるindexの「公差」を表す。
        //             水平方向なら公差は「1」、垂直方向なら「10」、斜め\ は「11」、斜め/ は「9」。
        // sign は進行方向。順走ならplus（+1）を、逆走ならminus（-1）を。
        // ownColor は自軍を, opponentColor 敵軍を表す。"b"は黒, "w"は白


        // （水平方向のチェック）
        checkLine(i, 1, 1, plus, "b", "w"); // 右方向へ
        checkLine(i, 1, 1, minus, "b", "w"); // 左方向
        // （垂直方向のチェック）
        checkLine(i, 1, 10, plus, "b", "w"); // 下方向        
        checkLine(i, 1, 10, minus, "b", "w"); // 上方向
        // （斜め方向のチェック）
        checkLine(i, 1, 11, plus, "b", "w"); // 右下方向        
        checkLine(i, 1, 11, minus, "b", "w"); // 左上方向
        // （斜め方向のチェック）
        checkLine(i, 1, 9, plus, "b", "w"); // 左下方向        
        checkLine(i, 1, 9, minus, "b", "w"); // 右上方向
    }

    outer();
    document.querySelector("#noticeBlack1").style.border = "15px dashed black"
    document.querySelector("#noticeBlack4").style.border = "0px dashed black"
}

// ---PART.6-1-2 白石が置けるか置けないか

function ableCheckWhite() {
    for (let i = 0; i < 100; i++) {

        arraySquare[i].classList.remove("able");

        checkLine(i, 1, 1, plus, "w", "b"); // 右方向へ
        checkLine(i, 1, 1, minus, "w", "b"); // 左方向
        checkLine(i, 1, 10, plus, "w", "b"); // 下方向        
        checkLine(i, 1, 10, minus, "w", "b"); // 上方向
        checkLine(i, 1, 11, plus, "w", "b"); // 右下方向        
        checkLine(i, 1, 11, minus, "w", "b"); // 左上方向
        checkLine(i, 1, 9, plus, "w", "b"); // 左下方向        
        checkLine(i, 1, 9, minus, "w", "b"); // 右上方向
    }
    outer();
    document.querySelector("#noticeBlack1").style.border = "0px dashed white"
    document.querySelector("#noticeBlack4").style.border = "15px dashed white"
}


// ---PART.6-2
// 各方向（8方向をチェックする）
function checkLine(i, count, direction, sign, ownColor, opponentColor) {
    // console.log((i + 1) + "回目のcheckLine関数に来た");
    // console.log("チェックするindexは" + i);

    if (arrayRecord[i] != 0) {
        // console.log("0でない。既に石が置かれている");
        // console.log("などの理由でルール上、石を置けない。クリックできないままにする");

    } else if (arrayRecord[i + (direction * sign)] != opponentColor) {
        // console.log("隣は敵色でない");
        // // 敵軍以外、つまり
        // console.log("隣接は石が置かれていないか、あるいは、自軍の石が置かれている");
        // console.log("などの理由でルール上、石を置けない。クリックできないままにする");

    } else {
        if (arrayRecord[i + ((count * direction) * sign)] == opponentColor) {
            // 隣は敵軍の石である前提だけれども、１つ隣から検索していく
            // console.log("隣接は敵色だ");
            // console.log("その隣も検索する);
            // console.log("再起する");
            count = count + 1;
            checkLine(i, count, direction, sign, ownColor, opponentColor);
        } else {
            if (arrayRecord[i + ((count * direction) * sign)] == ownColor) {
                // 最後の石の"Color"が"ownColor"ならば
                // console.log("挟めるのでクリックできるようにする");
                // クリック出来るようにするために。("inner")と("darkgreen")クラスを削除し。
                // クリック出来るように("able")クラスを付与する（ついでに背景色も変える）
                arraySquare[i].classList.add("able");
            }
        }
        // console.log("などの理由でルール上、石を置けない。クリックできないままにする");
    }

}


// ---PART.7---石を置く（クリックする）----------
// クリックすると〇が黒色⇔白色と交互にでる。ルール上石を置けない所はクリックできない。
// 同じ場所には２度クリックできない。

function putStone() {
    let count = 0;
    const passCount = 0;
    for (let i = 0; i < 100; i++) {

        arraySquare[i].addEventListener('click', function () {
            // お知らせを消す
            document.querySelector("#noticeBlack2").textContent = "";
            document.querySelector("#noticeBlack3").textContent = "";

            if (count % 2 === 0) {
                // console.log("黒でクリックしたのはindexの" + i);
                // console.log("黒でクリックしたときの配列は" + arrayRecord);

                // class="able" を削除  class="black" を付与
                arraySquare[i].classList.remove("able");
                arraySquare[i].classList.add("black");

                // 記録用配列上で、挟んだ白石（w）を黒色（b）に書き換える
                flipStoneBlack(i);

                // ブラウザ上の表示を書き換える（記録用配列に沿って）
                drawing();

                // 後手（白軍）が置くことが可能なマスを調べる
                ableCheckWhite();

                // もし後手（白軍）の置くところがなければパスする
                // カウントを『+1』する
                const passCount = checkPass(count);
                // console.log(passCount)
                // console.log(count + "に" + passCount + "を加える");
                count = count + passCount;
                // console.log("カウントは" + count + "になった");

                // 勝敗を判定する
                checkWin()

            } else {
                arraySquare[i].classList.remove("able");
                arraySquare[i].classList.add("white");

                // 
                flipStoneWhite(i)
                drawing();
                ableCheckBlack();
                const passCount = checkPass(count);
                count = count + passCount;

                checkWin()
            }

            count = count + 1;
            // console.log("passCount" + passCount)
            // console.log("クリックの回数　" + count);
            // console.log("ゲームの経過　" + arrayRecord);
        })
    }
}


// ---PART.8---挟まれた石をひっくり返す----------
// ---PART.8.1.1 黒石で挟んで白石をひっくり返す

function flipStoneBlack(i) {
    // どの方向の白石が黒色挟まれてひっくり返せるか確認する
    //     (i, count, direction, sign, ownColor, opponentColor)
    // （水平方向のチェック）
    flipStone(i, 1, 1, plus, "b", "w"); // 右方向
    flipStone(i, 1, 1, minus, "b", "w"); // 左方向
    // （垂直方向のチェック）
    flipStone(i, 1, 10, plus, "b", "w"); // 下方向        
    flipStone(i, 1, 10, minus, "b", "w"); // 上方向
    // （斜め方向のチェック）
    flipStone(i, 1, 11, plus, "b", "w"); // 右下方向        
    flipStone(i, 1, 11, minus, "b", "w"); // 左上方向
    // （斜め方向のチェック）
    flipStone(i, 1, 9, plus, "b", "w"); // 左下方向        
    flipStone(i, 1, 9, minus, "b", "w"); // 右上方向

    // 記録用配列に、"自軍の色を" を記入する
    arrayRecord[i] = "b";
    // 表示用配列から、class=""inner"を削除する
    arraySquare[i].classList.remove("inner");

}


// ---PART.8.1.2 白石で挟んでに黒石をひっくり返す
function flipStoneWhite(i) {
    flipStone(i, 1, 1, plus, "w", "b"); // 右方向
    flipStone(i, 1, 1, minus, "w", "b"); // 左方向
    flipStone(i, 1, 10, plus, "w", "b"); // 下方向        
    flipStone(i, 1, 10, minus, "w", "b"); // 上方向
    flipStone(i, 1, 11, plus, "w", "b"); // 右下方向        
    flipStone(i, 1, 11, minus, "w", "b"); // 左上方向
    flipStone(i, 1, 9, plus, "w", "b"); // 左下方向        
    flipStone(i, 1, 9, minus, "w", "b"); // 右上方向

    arrayRecord[i] = "w";
    arraySquare[i].classList.remove("inner");
}



// 各方向（8方向をチェックし、ひっくり返す）

function flipStone(i, count, direction, sign, ownColor, opponentColor) {
    // console.log("インデックス" + (i) + "でflipStone関数に来た");
    // console.log("記録用配列" + arrayRecord);
    // console.log("チェックするindexは" + i);

    if (arrayRecord[i] != 0) {
        // console.log("『すでに石が置かれていた』までは来た");
    } else if (arrayRecord[i + (direction * sign)] != opponentColor) {
        // console.log("隣接に『石がない か 自軍の石がある』までは来た");

    } else {
        if (arrayRecord[i + ((count * direction) * sign)] == opponentColor) {
            count = count + 1;
            // console.log("再起する");
            flipStone(i, count, direction, sign, ownColor, opponentColor);
        } else {
            // console.log("とうとう『== opponentColor』に来た");
            console.log("ひっくり返す作業に入る");
            console.log("ひっくり返す石は" + (count - 1) + "つ");
            // 石を打ったところ隣は敵軍の石である前提だけれども、１つ隣から検索していく            
            // console.log("最後の石" + (i + ((count * direction) * sign)) + "は" + ownColor + "なので")
            console.log("最後の石" + (i + ((count * direction) * sign)) + "の" + arrayRecord[(i + ((count * direction) * sign))] + "は ＝ " + ownColor + "になるはずなので")

            if (arrayRecord[i + ((count * direction) * sign)] == ownColor) {
                // 再起した数だけ石をひっくり返す
                for (let k = 1; k < count; k++) {
                    arrayRecord[i + ((k * direction) * sign)] = ownColor;
                    console.log("隣接する石" + (i + ((k * direction) * sign)) + "の" + opponentColor + "を" + ownColor + "にひっくり返す")
                }
            }
        }
    }
}


// ---PART.9---パスする----------
// 石を置く場所がない場合はパスになる

function checkPass(count) {

    const ArrayPass = document.querySelectorAll(".able");

    if (ArrayPass.length == 0) {
        // console.log("置くところがありません。パスしてください。");

        // 自軍の石が置ける場所を探す
        if (count % 2 === 0) {
            document.querySelector("#noticeBlack3").textContent = "白の置くところがありません。パスになります。";
            // console.log("黒が置ける場所を探す")
            ableCheckBlack();
        } else {
            document.querySelector("#noticeBlack2").textContent = "黒の置くところがありません。パスになります。";
            // console.log("白が置ける場所を探す")
            ableCheckWhite();
        }

        console.log("『+1』をリターンする");
        return 1;
    } else {
        return 0;
    }
}

console.log(arrayRecord);


// ---PART.10---勝敗を確かめる----------

function checkWin() {
    const arrayAble = document.querySelectorAll(".able");
    const arrayInner = document.querySelectorAll(".inner");
    const arrayBlack = document.querySelectorAll(".black");
    const arrayWhite = document.querySelectorAll(".white");

    // 現在の石の数を表示
    document.querySelector("#noticeBlack1").textContent = "黒 " + arrayBlack.length;
    document.querySelector("#noticeBlack1").style.fontSize = "60px";
    document.querySelector("#noticeBlack4").textContent = "白 " + arrayWhite.length;
    document.querySelector("#noticeBlack4").style.fontSize = "60px";



    // (石が置けるマスが０ 且つ 空白のマスが０) または (黒石が０ または 白石が０)のとき
    if ((arrayAble.length == 0 && arrayInner.length == 0) || (arrayBlack.length == 0 || arrayWhite.length == 0)) {
        if (arrayBlack.length > arrayWhite.length) {
            // console.log("黒の勝ち");
            document.querySelector("#noticeBlack2").textContent = "黒の勝ち";
            // youwin();
        } else if (arrayBlack.length < arrayWhite.length) {
            // console.log("白の勝ち");
            document.querySelector("#noticeBlack3").textContent = "白の勝ち";
            // youlose();

        } else if (arrayBlack.length == arrayWhite.length) {
            // console.log("引き分け");
            document.querySelector("#noticeBlack2").textContent = "引き分け";
            document.querySelector("#noticeBlack3").textContent = "引き分け";
            // draw();
        } else {
        }
    } else {
    }
}


// ---PART.11---演出----------

// ---PART.11.1---youwin()
// youwin();
function youwin() {
    squaresOpacity();

    setTimeout(function () {
        document.querySelector("#main").innertxte = "勝";
    }, 9000);

    setTimeout(youwin2, 10000);

    function youwin2() {
        headLine1(["あ", "な", "た", "の", "か", "ち", ""]);
        console.log("headLine1が実行されるはず");
    }

}

// ---PART.11.2---youlose()
// youlose();
function youlose() {
    squaresOpacity();

    setTimeout(youlose2, 10000);

    function youlose2() {
        headLine2(["あ", "な", "た", "の", "ま", "け", ""]);
    }

}

// ---PART.11.3---draw()
// draw();
function draw() {
    squaresOpacity();
    document.querySelector("#main").textContent = "引き分け";
}



// ---PART.12---演出(arraySquare[i] を透明にしていく)----------

// squaresOpacity();
function squaresOpacity() {
    // ここから↓が100回（i < 100）forループ    
    for (let i = 0; i < 100; i++) {
        let counter = 0;

        //          ここから↓が99回（counter > 99）100m秒毎に繰り返される        
        const timerId = setInterval(
            function () {
                arraySquare[i].style.opacity = 1.0 - (0.01 * counter);
                counter++;
                console.log("カウンター" + counter);
                if (counter > 99) {
                    clearInterval(timerId)
                    console.log("clearIntervalが実行されました")
                }
            }
            , 100)
        //           ここまで↑が99回（counter > 99）100m秒毎に繰り返される
    }
    // ここまで↑が100回（i < 100）forループ
}




//---PART.13---演出----------
// 『headLine1』関数↓　　　.outerを["せ", "ん", "て", "ん", "す", "が"]ぐるぐる廻る;

function headLine2(sentence) {

    const array = sentence;
    let counter = 0

    const timerId = setInterval(
        function () {
            // for (let i = 0; i < 5 * 36; i++) {
            const k = counter % 36;
            const m = counter % 7;
            const r = counter % 5;

            const arrayBackColor = ["red", "pink", "aquamarine", "yellow", "powderblue"];
            const arrayColor = ["yellow", "powderblue", "red", "pink", "aquamarine"];

            arraySquare[arrayOuterIndex[k]].style.opacity = 0.0 + (0.006 * counter);
            arraySquare[arrayOuterIndex[k]].textContent = array[m];
            arraySquare[arrayOuterIndex[k]].style.backgroundColor = arrayBackColor[r];
            arraySquare[arrayOuterIndex[k]].style.color = arrayColor[r];

            // console.log("カウンター" + counter);
            counter++;

            if (counter > 180) {
                clearInterval(timerId)
            }
            // }
        }, 150)
}










// headLine1();
function headLine1() {


    document.querySelector("#contents").style.height = "0px";
    document.querySelector("#contents").style.width = "0px";



    const targetElement = document.querySelector("#main");

    // 文字の飛び出し具合の調整
    targetElement.style.height = 0;
    targetElement.style.width = "0px";
    targetElement.style.textContent = "";
    targetElement.style.lineHeight = "1.2";

    let count = 0;

    for (let i = 0; i < 116; i++) {
        const m = count % 18;

        setTimeout(function () {
            const array = ["あ", "あ", "な", "な", "た", "た", "の", "の", "勝", "勝", "ち", "ち"];



            targetElement.textContent = array[m];

            // document.querySelector("#main").style.backgroundColor = "deepskyblue";
            targetElement.style.color = "lightskyblue";
            targetElement.style.textAlign = "center";
            // document.querySelector(area).style.fontWeight = "bolder";

            targetElement.style.fontSize = ((i * i) / 2) + "%";
        }, (2500 + (i * 170)))

        count = count + 1;
    }
}





// // // ---PART.555---斜め（右上がり）方向をチェックする----だめ、やり直し---------

// // const upperRight = [0, 8, 16, 24, 32, 40, 48, 56, 57, 58, 59, 60, 61, 62, 63];
// // for (let i = 0; i < 15; i = i + 1) {

// //     for (let j = 0; j < 7; j = j + 1) {
// //         checkArray = array555[upperRight[i]] - (j * 7);
// //     }
// // }

// // // ---PART.555---斜め（右上がり）方向をチェックする----やり直した？---------

// const upperRight0 = [0];
// const upperRight1 = [8, 1];
// const upperRight2 = [16, 9, 2];
// const upperRight3 = [24, 17, 10, 3];
// const upperRight4 = [32, 25, 18, 11, 4];
// const upperRight5 = [40, 33, 26, 19, 12, 5];
// const upperRight6 = [48, 41, 34, 27, 20, 13, 6];
// const upperRight7 = [56, 49, 42, 35, 28, 21, 14, 7];
// const upperRight8 = [57, 50, 43, 36, 29, 22, 15];
// const upperRight9 = [58, 51, 44, 37, 30, 23];
// const upperRight10 = [59, 52, 45, 38, 31];
// const upperRight11 = [60, 53, 46, 39];
// const upperRight12 = [61, 54, 47];
// const upperRight13 = [62, 55];
// const upperRight14 = [63];

// const arrayUpperRight = [upperRight0, upperRight1, upperRight2, upperRight3, upperRight4, upperRight5, upperRight6, upperRight7, upperRight8, upperRight9, upperRight10, upperRight11, upperRight12, upperRight13, upperRight14];
// console.log("列目の" + arrayUpperRight);
// for (let i = 0; i < 15; i++) {
//     console.log("列目の" + arrayUpperRight[i]);
// }






