/*
	名字:	為英雄準備的禮物
	地圖:	寒冷的森林４
	描述:	140090400
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.dispose();
		return;
		}
		if (status < 2) {
		qm.sendNext("I'm sure it will come in handy during your journey. Please, don't decline my offer.");
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
		qm.sendSimple("Ah, you're the hero. I've been dying to meet you. \r\n#b#L0#(Seems a bit shy...)#l");
		break;
	case 1:
		qm.sendAcceptDecline("I have something I've been wanting to give you as a gift for a very long time... I know you're busy, especially since you're on your way to town, but will you accept my gift?");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(21013).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.sendNextS("The parts of the gift have been packed inside a box nearby. Sorry to trouble you, but could you break the box and bring me a #b#t4032309##k and some #b#t4032310##k? I'll assemble them for you right away.", 1);
		break;
	case 3:
		if (!qm.getPlayer().hasSummon())
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.summonHelper(true));
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.summonMessage(18));
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
		qm.sendNext("Ah, you've brought all the components. Give me a few seconds to assemble them... Like this... And like that... and... \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#v3010062# 1 #t3010062# \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 95 exp");
		break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21013)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(21013).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainItem(4032309, -1);
			qm.gainItem(4032310, -1);
			qm.gainItem(3010062, 1);
			qm.gainExp(95);
			}
			qm.sendNextPrevS("Here, a fully-assembled chair, just for you! I've always wanted to give you a chair as a gift, because I know a hero can occasionally use some good rest. Tee hee.", 1);
			break;
	case 2:
		qm.sendNextPrevS("A hero is not invincible. A hero is human. I'm sure you will face challenges and even falter at times. But you are a hero because you have what it takes to overcome any obstacles you may encounter.", 1);
		break;
	case 3:
		if (!qm.getPlayer().hasSummon())
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.summonHelper(true));
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.summonMessage(19));
		qm.dispose();
}
}