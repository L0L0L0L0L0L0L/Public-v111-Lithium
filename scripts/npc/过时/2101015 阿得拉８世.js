/*
	名字:	阿都拉八世
	地圖:	王的房間
	描述:	980010010
*/

importPackage(Packages.client);

var arena;

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
		if (status <= 1) {
		cm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		arena = cm.getPlayer().getAriantColiseum();
		if (arena == null) {
		cm.sendOk("嘿，我在競技場沒見過你，你到這裡來做什麼？");
		cm.dispose();
		return;
		}
		menuStr = generateSelectionMenu(["查看我的納希競技點/ 我想要獲得#z3010018#", "我想知道更多納希競技場的事情。"]);
		cm.sendSimple("作為納希競技場的勇士，你想幹什麼？\r\n\r\n" + menuStr);
		break;
	case 1:
		if (selection == 0) {
			apqpoints = cm.getPlayer().getAriantPoints();
			if (apqpoints < 100) {
				cm.sendOk("你的納希競技點: #b" + apqpoints + "#k分，你需要得到#b100分#k就可以獲得#b#z3010018##k，等你的分數夠了再來找我。");
				cm.dispose();
			} else {
				cm.sendNext("哇，你的納希競技點: #b" + apqpoints + "#k分，已經達到領取獎品#z3010018#的要求。\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v3010018:# #t3010018");
				}
				}
		if (selection == 1) {
			cm.sendOk("納希競技場的主要目標是讓玩家積累積分，以便他們可以光榮地交換最高獎品：#z3010018#。在每一場戰鬥中，玩家都有機會根據最後擁有的珠寶數量得分。但要小心！如果你與其他玩家的積分差距太大，這一切都是徒勞的，你只能獲得#b1分#k。");
			cm.dispose();
			}
			break;
	case 2:
		cm.getPlayer().gainAriantPoints(-100);
		cm.gainItem(3010018, 1);
		cm.dispose();
}
}

function generateSelectionMenu(array) {     // nice tool for generating a string for the sendSimple functionality
	var menu = "";
	for (var i = 0; i < array.length; i++) {
	menu += "#L" + i + "##b" + array[i] + "#l#k\r\n";
	}
	return menu;
}