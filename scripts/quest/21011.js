/*
	名字:	消失的武器
	地圖:	寒冷的森林２
	描述:	140090200
*/

var status = -1;

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 3) {
		qm.sendNext("*sniff sniff* Isn't this sword good enough for you, just for now? I'd be so honored...");
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21011)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(21011).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("Wait, are you... No way... Are you the hero that #p1201000# has been talking about all this time?! #p1201000#! Don't just nod... Tell me! Is this the hero you've been waiting for?!");
			break;
	case 1:
		qm.sendNextPrev("#v4001171#");
		break;
	case 2:
		qm.sendNextPrev("I'm sorry. I'm just so overcome with emotions... *Sniff sniff* My goodness, I'm starting to tear up. You must be so happy, #p1201000#.");
		break;
	case 3:
		qm.sendNextPrev("Wait a minute... You're not carrying any weapons. From what I've heard, each of the heroes had a special weapon. Oh, you must have lost it during the battle against the Black Mage.");
		break;
	case 4:
		qm.sendYesNo("This isn't good enough to replace your weapon, but #bcarry this sword with you for now#k. It's my gift to you. A hero can't be walking around empty-handed.  \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#v1302000# 1 #t1302000# \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 35 exp");
		break;
	case 5:
		qm.gainExp(35);
		qm.gainItem(1302000, qm.getPlayer().itemQuantity(1302000) ? 0 : 1);
		Packages.server.quest.MapleQuest.getInstance(21011).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.sendNextS("#b(Your skills are nowhere close to being hero-like... But a sword? Have you ever even held a sword in your lifetime? You can't remember... How do you even equip it?)", 3);
		break;
	case 6:
		if (!qm.getPlayer().hasSummon())
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.summonHelper(true));
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.summonMessage(16));
		qm.dispose();
}
}