/*
	名字:	未甦醒的他們
	地圖:	櫻花處
	描述:	101050000
*/

var status = -1;

function start(mode, type, selection) {
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
		qm.sendNext("There's only one possibility, Your Highness. #rThe seal on the Black Mage is getting weak. Either that, or he's already broken free.");
		break;
	case 1:
		qm.sendNextPrev("When you think about it, it's quite simple. When you woke up, you made a crack in the curse. And now that you're training to get your strength back...");
		break;
	case 2:
		qm.sendNextPrev("...the rest of the Elves are getting their strength back, too. However, the rest of Maple World is suffering more and more each day.");
		break;
	case 3:
		qm.sendNextPrev("This means #rthe Black Mage himself is getting stronger, even though we are breaking the curse.");
		break;
	case 4:
		qm.sendNextPrev("The only way this could be is if the seal on the Black Mage is breaking...");
		break;
	case 5:
		qm.sendNextPrev("In short, Maple World has not yet seen the end of the Black Mage. \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 1000 exp");
		break;
	case 6:
		Packages.server.quest.MapleQuest.getInstance(24066).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(24066));
		qm.gainExp(1000);
		qm.dispose();
}
}