/*
	名字:	接受秘密團體的第三個秘密之前
	地圖:	黑色影子
	描述:	黑色影子
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 3) {
		qm.sendNext("Are you otherwise occupied? That's fine. I'll wait for you.");
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
		qm.sendNext("Nice to see you again, Evan. Things have been running so smoothly for us lately, all thanks to you. In fact, I have another mission for you...");
		break;
	case 1:
		qm.sendNextPrevS("#bWait. Before you give me my next mission, I have a question.", 2);
		break;
	case 2:
		qm.sendNextPrev("Sure. Ask away! I'll answer.");
		break;
	case 3:
		qm.sendNextPrev("#bAs a temporary member of the organization, I'm told so little... I want to know more about the organization.", 2);
		break;
	case 4:
		qm.sendAcceptDecline("Oh, I see. Of course! That makes complete sense. It's quite complex, and I want to be sure I answer your question thoroughly, so I will tell you all about this organization when we meet in person to discuss the third mission. ls that acceptable?");
		break;
	case 5:
		Packages.server.quest.MapleQuest.getInstance(22581).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.sendOk("All right. Come to #b#m220000300##k then. We have a base office there that is being used by our organization. I'll meet you there. Just come to #b#m922030000##k.");
		break;
	case 6:
		qm.dispose();
}
}