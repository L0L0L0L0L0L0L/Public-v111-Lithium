/*
	名字:	騎士的品味
	地圖:	耶雷弗
	描述:	130000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 0) {
		qm.sendNext("It's alright if you don't wish to learn more about it. Just don't tell anyone that you're a Cygnus Knight. I don't want anything to do with an unsophisticated knight like you.");
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
		qm.sendNext("Wow, you have already reached Level 50, yet why are you still walking around like that? I mean, you've reached Level 50, but you are still walking around with your own feet. That's an unusual behavior for a Knight like you.");
		break;
	case 1:
		qm.sendAcceptDecline("Well, I suppose it's up to you, but by doing that, you also risk marring the pride and honor of the Empress. This is why I am here to give you a helpful pointer. It's called #bMonster Riding#k. Of course you're interested in this, right?");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(20520).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(20520));
		qm.sendOk("There's a special mount that only the Cygnus Knights can enjoy. If you are interested, visit #bEreve#k. I will give you more information on it.");
		break;
	case 3:
		qm.dispose();
}
}