/*
	名字:	裝有道具的箱子
	地圖:	開始之森林5
	描述:	130030004
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 3) {
		qm.sendNext("Hmm, was that too much to ask? Is it because you don't know how to break Boxes? I'll tell you how if you accept my Quest. Let me know if you change your mind.");
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
		qm.sendNext("#b(*clang clang*)");
		break;
	case 1:
		qm.sendNextPrev("Whoa! Hey! You scared me. I didn't know I had a visitor. You must be the Noblesse Kinu was talking about. Welcome! I'm Kia, and my hobby is making #bChairs#k. I'm thinking about making you one as a welcome present.");
		break;
	case 2:
		qm.sendNextPrev("But wait, I can't make you one because I don't have enough materials. Could you find me the materials I need? Around this area, you will find a lot of Boxes with items inside. Could you bring me back a #t4032267# and a #t4032268# found inside those Boxes?");
		break;
	case 3:
		qm.sendNextPrev("Do you know how to get items from boxes? All you have to do is break the Boxes like you're attacking a monster. The difference is that you can attack monsters using your Skills, but you can #bonly use Regular Attacks to break Boxes#k.");
		break;
	case 4:
		qm.sendAcceptDecline("Please bring me 1 #b#t4032267##k and 1 #b#t4032268##k found inside those Boxes. I'll make you an awesome Chair as soon as I have what I need. I'll wait here!");
		break;
	case 5:
		if (!qm.getPlayer().hasSummon())
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.summonHelper(true));
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.summonMessage(9));
		Packages.server.quest.MapleQuest.getInstance(20013).forceStart(qm.getPlayer(), qm.getNpc(), null);
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
		qm.sendNext("Did you bring me a Building Stone and a Drape? Let's see. Ah, these are just what I need! They indeed are a #t4032267# and a #t4032268#! I'll make you a Chair right away.");
		break;
	case 1:
		qm.sendNextPrev("Here it is, a #t3010060#. What do you think? Nifty, huh? You can #bquickly recover your HP by sitting in this Chair#k. It will be stored in the #bSet-up#k window in your Inventory, so confirm that you've received the chair and head over to #bKisha#k. You'll see him if you keep following the arrow to the left. \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#v3010060# 1 #t3010060# \r\n#fUI/UIWindow.img/QuestIcon/8/0# 95 exp");
		break;
	case 2:
		if (!qm.getPlayer().hasSummon())
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.summonHelper(true));
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.summonMessage(10));
		Packages.server.quest.MapleQuest.getInstance(20013).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.gainItem(4032267, -1);
		qm.gainItem(4032268, -1);
		qm.gainItem(3010060, 1);
		qm.gainExp(95);
		qm.dispose();
}
}