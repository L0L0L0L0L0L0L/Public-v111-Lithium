/*
	名字:	消失的能力
	地圖:	寒冷的森林３
	描述:	140090300
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 2) {
		qm.sendNext("Hm... You don't think that would help? Think about it. It could help, you know...");
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
		qm.sendNext("Welcome, hero! What's that? You want to know how I knew who you were? That's easy. I eavesdropped on some people talking loudly next to me. I'm sure the rumor has spread through the entire island already. Everyone knows that you've returned!")
		break;
	case 1:
		qm.sendNextPrev("Anyway, what's with the long face? ls something wrong? Hm? You're not sure whether you're really a hero or not? You lost your memory?! No way ...It must be because you were trapped inside the ice for hundreds and hundreds of years.")
		break;
	case 2:
		qm.sendAcceptDecline("Hm, how about trying out that sword? Wouldn't that bring back some memories? How about #bfighthing some monsters#k?");
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(21012).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.sendNextS("It just so happens that there are a lot of #rTutorial Murus #knear here. How about defeating just #r3 #kof them? It could help you remember a thing or two.", 1);
		break;
	case 4:
		qm.sendNextPrevS("Ah, you've also forgotten how to use your skills? #bPlace skills in the quick slots for easy access. #kYou can also place consumable items in the slots, so use the slots to your advantage.", 1);
		break;
	case 5:
		if (!qm.getPlayer().hasSummon())
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.summonHelper(true));
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.summonMessage(17));
		qm.dispose();
}
}

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendNext("What? You don't want the potion?");
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
		qm.sendYesNo("Hm... Your expression tells me that the exercise didn't jog any memories. But don't you worry. They'll come back, eventually. Here, drink this potion and power up! \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#v2000022# 10 #t2000022# \r\n#v2000023# 10 #t2000023# \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 57 exp");
		break;
	case 1:
		qm.gainExp(57);
		qm.gainItem(2000022, 10);
		qm.gainItem(2000023, 10);
		Packages.server.quest.MapleQuest.getInstance(21012).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.sendOkS("#b(Even if you're really the hero everyone says you are... What good are you without any skills?)", 2);
		break;
	case 2:
		qm.dispose();
}
}