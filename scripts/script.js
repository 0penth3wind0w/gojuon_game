 var spelling = ["a","i","u","e","o",
			"ka","ki","ku","ke","ko",
			"sa","shi","su","se","so",
			"ta","chi","tsu","te","to",
			"na","ni","nu","ne","no",
			"ha","hi","fu","he","ho",
			"ma","mi","mu","me","mo",
			"ya","yu","yo",
			"ra","ri","ru","re","ro",
			"wa","(w)o",
			"n"];

var spelling_ext = ["ga","gi","gu","ge","go",
			"za","zi","zu","ze","zo",
			"da","di","du","de","do",
			"ba","bi","bu","be","bo",
			"pa","pi","pu","pe","po"]

var hira = ["あ","い","う","え","お",
			"か","き","く","け","こ",
			"さ","し","す","せ","そ",
			"た","ち","つ","て","と",
			"な","に","ぬ","ね","の",
			"は","ひ","ふ","へ","ほ",
			"ま","み","む","め","も",
			"や","ゆ","よ",
			"ら","り","る","れ","ろ",
			"わ","を",
			"ん"];

var hira_ext = ["が","ぎ","ぐ","げ","ご",
			"ざ","じ","ず","ぜ","ぞ",
			"だ","ぢ","づ","で","ど",
			"ば","び","ぶ","べ","ぼ",
			"ぱ","ぴ","ぷ","ぺ","ぽ",];

var kana = ["ア","イ","ウ","エ","オ",
			"カ","キ","ク","ケ","コ",
			"サ","シ","ス","セ","ソ",
			"タ","チ","ツ","テ","ト",
			"ナ","ニ","ヌ","ネ","ノ",
			"ハ","ヒ","フ","ヘ","ホ",
			"マ","ミ","ム","メ","モ",
			"ヤ","ユ","ヨ",
			"ラ","リ","ル","レ","ロ",
			"ワ","ヲ",
			"ン"];

var kana_ext = ["ガ","ギ","グ","ゲ","ゴ",
			"ザ","ジ","ズ","ゼ","ゾ",
			"ダ","ヂ","ヅ","デ","ド",
			"バ","ビ","ブ","ベ","ボ",
			"パ","ピ","プ","ペ","ポ"];

var game_mode;

function mode_1(){
  document.getElementById("mode_selector").style.display = "none";
  game_mode = 1;
  game(game_mode);
}

function mode_2(){
  document.getElementById("mode_selector").style.display = "none";
  game_mode = 2;
  game(game_mode);
}

function mode_3(){
  document.getElementById("mode_selector").style.display = "none";
  game_mode = 3;
  game(game_mode);
}

function mode_4(){
  document.getElementById("mode_selector").style.display = "none";
  game_mode = 4;
  game(game_mode);
}

function mode_5(){
  document.getElementById("mode_selector").style.display = "none";
  game_mode = 5;
  game(game_mode);
}

function mode_6(){
  document.getElementById("mode_selector").style.display = "none";
  game_mode = 6;
  game(game_mode);
}

function mode_7(){
  document.getElementById("mode_selector").style.display = "none";
  game_mode = 7;
  game(game_mode);
}

function mode_8(){
  document.getElementById("mode_selector").style.display = "none";
  game_mode = 8;
  game(game_mode);
}

function game(mode){
  console.log("game activated");
  switch(mode){
    case 1:
      random_pick(spelling, hira);
      break;
    case 2:
      random_pick(spelling, kana);
      break;
    case 3:
      random_pick(hira, spelling);
      break;
    case 4:
      random_pick(kana, spelling);
      break;
    case 5:
      random_pick(spelling.concat(spelling_ext), hira.concat(hira_ext));
      break;
    case 6:
      random_pick(spelling.concat(spelling_ext), kana.concat(kana_ext));
      break;
    case 7:
      random_pick(hira.concat(hira_ext), spelling.concat(spelling_ext));
      break;
    case 8:
      random_pick(kana.concat(kana_ext), spelling.concat(spelling_ext));
      break;
  }
  document.getElementById("main_content").style.display = "block";
  document.getElementById("q_cont").style.display = "block";
  document.getElementById("show_ans").style.display = "inline-block";
  document.getElementById("ans_cont").style.display = "none";
}

function show_selector(){
  document.getElementById("mode_selector").style.display = "block";
  document.getElementById("hide_s").style.display = "inline-block";
  document.getElementById("main_content").style.display = "none";
}

function hide_selector(){
  document.getElementById("mode_selector").style.display = "none";
  document.getElementById("main_content").style.display = "block";
}

function random_pick(q_array, ans_array){
  var rand_num = Math.floor(Math.random() * q_array.length);
  var picked_q = q_array[rand_num];
  var picked_ans = ans_array[rand_num];
  document.getElementById("q_cont").innerHTML = picked_q;
  document.getElementById("ans_cont").innerHTML = picked_ans;
}

function show(){
  document.getElementById("q_cont").style.display = "none";
  document.getElementById("ans_cont").style.display = "block";
  document.getElementById("show_ans").style.display = "none";
}

function next(){
  game(game_mode);
}
