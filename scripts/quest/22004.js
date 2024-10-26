/*
	名字:	修理籬笆
	地圖:	農場中心地
	描述:	100030300
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 2) {
		qm.sendNext("Hm, #p1013101# would have done it at the drop of a hat.");
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
		qm.sendNext("The #o1210100#s at the farm have been acting strange these past couple days. They've been angry and irritable for no reason. I was worried so I came out to the farm early this morning and sure enough, it seems like a few of these #o1210100#s got past the fence.");
		break;
	case 1:
		qm.sendAcceptDecline("Before I go and find the #o1210100#s, I should mend the broken fence. Luckily, it wasn't damaged too badly. I just need a few Thick Branches to fix it right up. Will you bring me #b3 #t4032498#es#k, Evan?");
		break;
	case 2:
		qm.sendNextS("Oh, that's very nice of you. You'll be able to find #b#t4032498#es#k from the nearby #r#o0130100#s#k. They're not too strong, but use your skills and items when you find yourself in danger.", 1);
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(22004).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.getEvanTutorial("UI/tutorial/evan/6/0"));
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
		qm.sendNext("Ah, did you bring all the Thick Branches? That's my kid! What shall I give you as a reward... Let's see... Oh, right! \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#v3010097# 1 #t3010097# \r\n#v2022621# 15 #t2022621# \r\n#v2022622# 15 #t2022622# \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 210 exp");
		break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22004)).getStatus() < 2) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 2) {
			qm.sendOk("That's strange... Something isn't quite right. Try again.");
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(22004).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainItem(4032498, -3);
			qm.gainItem(3010097, 1);
			qm.gainItem(2022621, 15);
			qm.gainItem(2022622, 15);
			qm.gainExp(210);
			}
			qm.sendNextPrev("Here. I made this new chair from the wooden boards I had left over after fixing the fence. It may not seem like much, but it's sturdy. I'm sure it'll come in handy.");
			break;
	case 2:
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.getEvanTutorial("UI/tutorial/evan/7/0"));
		qm.dispose();
}
}