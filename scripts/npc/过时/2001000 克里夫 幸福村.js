/*
	名字:	克裡夫
	地圖:	幸福村
	描述:	209000000
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case -1:
		cm.dispose();
		return;
	case 0:
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		cm.sendNext("歡迎來到#m209000000#，你在這裡找不到樂趣嗎？讓我給你推薦一下。");
		break;
	case 0:
		cm.sendNext("你看見那邊有幾個雪人嗎？去找它們其中一個談談，會帶你去有聖誕樹的特殊地圖，這些聖誕樹可以用各種裝飾品裝飾，聽起來很有趣，對嗎？");
		break;
	case 1:
		cm.sendNextPrev("最多同時只能容納6個人進入聖誕樹所在的地圖，地圖內限制#b交易或開店#k，扔下來的飾品只能自己撿回來，所以不要擔心在這裡丟了什麼。");
		break;
	case 2:
		cm.sendNextPrev("當然，扔在裡面的東西永遠不會消失，即便是你從地圖裡出來，未能撿起的物品也會回到你身邊，所以你不必在離開之前把所有的東西都撿起來。");
		break;
	case 3:
		cm.sendPrev("那麼，去看看#p2002001#，在那裡買些聖誕裝飾品，然後用裝飾品裝飾聖誕樹，最大、最漂亮的裝飾品是買不到的，可能是，被怪物帶走了...huh huh..");
		break;
	case 4:
		cm.dispose();
}
}