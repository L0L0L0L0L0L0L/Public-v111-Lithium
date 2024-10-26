/*
	名字:	精靈的朋友
	地圖:	櫻花處
	描述:	101050000
*/

var status = -1;

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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(24031)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(24031).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(24031)).getStatus() < 2) {
			qm.gainItem(4032977, -1);
			qm.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(20021160), 1, 1, -1);
			Packages.server.quest.MapleQuest.getInstance(24031).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("Sylvidia Riding Skill obtained"));
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You obtained the <Sylvidia Riding> skill."));
			}
			qm.sendNext("This is... I haven't had this in ages! I missed this so much! We used to have so much fun, didn't we? But then you went off to fight the Black Mage, and left me all alone...");
			break;
	case 1:
		qm.sendNextPrev("I promised you that I'd return.", 2);
		break;
	case 2:
		qm.sendNextPrev("Yes, so I stayed in Maple World and waited for you and the Elves to come back. I knew you would, that someday we would gallop through Victoria Island again.");
		break;
	case 3:
		qm.sendNextPrevS("Not yet. I can't rest until the Black Mage is gone for good. Please wait a little longer, #p1033240#.", 2);
		break;
	case 4:
		qm.sendNextPrev("I don't want to wait any longer. I told you, Mercedes! I promised myself I'd never let you go away again! You don't know how many times I circled the village, looking for a way to get in, waiting for you to come back.");
		break;
	case 5:
		qm.sendNextPrev("I should've gone with you to fight the Black Mage in the first place.");
		break;
	case 6:
		qm.sendPrev("I don't care if you're gonna fight the Black Mage again. You aren't getting rid of me! I'll go with you, no matter what!");
		break;
	case 7:
		qm.dispose();
}
}