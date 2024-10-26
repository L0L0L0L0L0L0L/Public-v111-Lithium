/*
	名字:	跟隨騎士的腳步
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
		if (status > 1) {
		qm.sendNext("Hmmm... You seem way too at ease. It's a waste of talent and firepower for an accomplished individual like you to just sit around, being content with the way things are...");
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
		qm.sendNext("It's been a while since I last saw you. I can't even recognize you now, seeing how powerful you have become since our last encounter. I can honestly say that you just might be one of the most powerful Knights in all of Cygnus Knights. Chief Knights included. Okay, enough pleasantries. Let's get down to business.");
		break;
	case 1:
		qm.sendNextPrev("It's a new mission. According to the information we've acquired, a member of the #rBlack Wings#k is after the Empress. In order to prevent anything from happening to the Empress, the Advanced Knight #bDunamis#k has been secretly tracing that individual, but it doesn't look too good from here.");
		break;
	case 2:
		qm.sendAcceptDecline("If it's Victoria Island, at least we know everything that goes on there. This one's Ossyria, where not even the intelligence officials here know everything inside out. This means the Advanced Knight will need help. Please provide help to Dunamis. The last place she contacted was at #bEI Nath#k, so try looking for Dunamis.");
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(20400).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(20400));
		qm.sendOk("Well, I may have said it in a joking manner, but it is true that you are one of the most talented knights in all of Cygnus Knights. That's why an important mission like this is given to a talented individual in Cygnus Knights. I believe in you. Good Luck.");
		break;
	case 4:
		qm.dispose();
}
}