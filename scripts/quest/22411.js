/*
	名字:	又變得不合身的馬鞍
	地圖:	動物園
	描述:	230000003
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 5) {
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
		qm.sendNext("Master. Does seeing me all grown up remind you of anything?");
		break;
	case 1:
		qm.sendNextPrevS("#bAre you talking about your saddle?", 2);
		break;
	case 2:
		qm.sendNextPrev("The old saddle was so small, I couldn't even fly in that thing, never mind trying to fly with you on my back. I'm telling you, we need to get a new saddle.");
		break;
	case 3:
		qm.sendNextPrevS("#bUgh, I know...", 2);
		break;
	case 4:
		qm.sendNextPrev("What is it? Is something wrong?");
		break;
	case 5:
		qm.sendNextPrevS("#bI'm just scared to find out how much it's going to cost me.", 2);
		break;
	case 6:
		qm.sendAcceptDecline("So... Kenta in the Aquarium is the one that makes the saddles, right?");
		break;
	case 7:
		Packages.server.quest.MapleQuest.getInstance(22411).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(22411));
		qm.sendOkS("#bHmm. Well, I guess we don't have a choice. It's expensive, but I can't not get you one. I'll go get another saddle for you.", 2);
		break;
	case 8:
		qm.dispose();
}
}