/*
	名字:	教你打獵方法
	地圖:	開始之森林3
	描述:	130030002
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 1) {
		qm.sendNext("You don't want to? It's not even that hard, and you'll receive special equipment as a reward! Well, give it some thought and let me know if you change your mind.");
		qm.dispose();
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
		qm.sendNext("There are a number of ways to hunt, but the most basic way is with your #bRegular Attack#k. All you need is a weapon in your hand, since it's a simple matter of just swinging your weapon at monsters.");
		break;
	case 1:
		qm.sendNextPrev("Press the #bCtrl key#k to use your Regular Attack. Usually the Ctrl key is located #bat the bottom left of the keyboard#k, but you don't need me to tell you that, right? Find the Ctrl key and try it out!");
		break;
	case 2:
		qm.sendAcceptDecline("Now that you've tried it, we've got to test it out. In this area, you can find the weakest #rTinos#k in Ereve, which is perfect for you. Try hunting #r1#k. I'll give you a reward when you get back.");
		break;
	case 3:
		if (!qm.getPlayer().hasSummon())
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.summonHelper(true));
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.summonMessage(4));
		Packages.server.quest.MapleQuest.getInstance(20011).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.dispose();
}
}

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
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
		qm.sendNext("Ah, it seems like you've successfully hunted a Tino. Pretty simple, right? Regular Attacks may be easy to use, but they are pretty weak. Don't worry, though. Kinu will teach you how to use more powerful skills. Wait, let me give you a well-deserved quest reward before you go.");
		break;
	case 1:
		qm.sendNextPrev("This equipment is for Noblesses. It's much cooler than what you're wearing right now, isn't it? Follow the arrows to your left to meet my younger brother #bKinu#k. How about you change into your new Noblesse outfit before you go? \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#v1002869# #t1002869# - 1 \r\n#v1052177# #t1052177# - 1 \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 31 exp");
		break;
	case 2:
		if (!qm.getPlayer().hasSummon())
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.summonHelper(true));
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.summonMessage(6));
		Packages.server.quest.MapleQuest.getInstance(20011).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.gainItem(1002869, 1);
		qm.gainItem(1052177, 1);
		qm.gainExp(31);
		qm.dispose();
}
}