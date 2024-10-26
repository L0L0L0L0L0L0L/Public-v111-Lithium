/*
	名字:	新功能：找尋隊伍
	地圖:	104000000
	描述:	維多利亞港
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
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		qm.sendYesNo("Hello, #h0#!! I'd like to tell you about a new game function Interested?");
		break;
	case 1:
		qm.sendNext("The new #bParty Search#k function, which you can access by pressing the #bhotkey O#k or clicking the Search button in the Party Window (hotkey P), lets you easily find a party anytime.");
		break;
	case 2:
		qm.sendNextPrev("Right now, you can create a party listing for free, so I hope you try it. In fact, let me just go ahead an open the Party Search window for you right now...");
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(10579).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(10579));
		qm.sendPartyWindow();
		qm.dispose();
}
}