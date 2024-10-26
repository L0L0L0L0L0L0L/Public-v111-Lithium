/*
	名字:	傑夫
	地圖:	冰雪峽谷Ⅱ
	描述:	211040200
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
		if (status > 0) {
		cm.sendNext("Even if your level's high it's hard to actually go in there, but if you ever change your mind please find me. After all, my job is to protect this place.");
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
		cm.sendNext("Hey, you look like you want to go farther and deeper past this place. Over there, though, you'll find yourself surrounded by aggressive, dangerous monsters, so even if you feel that you're ready to go, please be careful. Long ago, a few brave men from our town went in wanting to eliminate anyone threatening the town, but never came back out...");
		break;
	case 1:
		if (cm.getPlayer().getLevel() < 50) {
			cm.sendPrev("If you are thinking of going in, I suggest you change your mind. But if you really want to go in...I'm only letting in the ones that are strong enough to stay alive in there. I do not wish to see anyone else die. Let's see ... Hmmm ... you haven't reached Level 50 yet. I can't let you in, then, so forget it.");
			cm.dispose();
			return;
			}
			cm.sendYesNo("If you are thinking of going in, I suggest you change your mind. But if you really want to go in...l'm only letting in the ones that are strong enough to stay alive in there. I do not wish to see anyone else die. Let's see ... Hmmm ...! You look pretty strong. All right, do you want go in?");
			break;
	case 2:
		cm.getPlayer().changeMap(cm.getMap(211040300), cm.getMap(211040300).getPortal(5));
		cm.dispose();
}
}