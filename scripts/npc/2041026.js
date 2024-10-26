/*
	名字:	幽靈獵人 巴柏
	地圖:	遺忘的時間之路&amp;lt;1&gt;
	描述:	220070000
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
		if (cm.getPlayer().itemQuantity(4220046) < 1) {
			cm.sendOk("So you want to give up on raising the Timer? Hmmm...it doesn't seem like you have the Timer. What are you trying to raise?");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3250)).getStatus() == 1) {
			cm.sendNext("Huh? Raising a Timer is too hard? Well, I thought you'd be able to handle it. Oh well, make your forfeit official before you return the Timer egg. You can do so by opening the Quest window and pressing the [Forfeit] button.");
			cm.dispose();
			return;
			}
			cm.gainItem(4220046, -1);
			cm.sendNext("Huh? Raising a Timer is too hard? Of course it's hard! You thought it'd be child's play? Hmph...I guess you weren't ready for it. Alright, then. I take it you're giving up on the #bcute baby bird#k quest? Will you return the Timer's egg?");
			break;
	case 1:		
		cm.sendOk("I have the Timer again. If you ever change your mind about raising a Timer, forfeit the quest and retry.");
		break;
	case 2:
		cm.dispose();
}
}