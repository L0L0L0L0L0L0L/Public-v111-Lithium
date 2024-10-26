/*
	名字:	5個岔路
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
		if (status == 2) {
		qm.dispose();
		return;
		}
		if (status == 3) {
		qm.sendNext("Please talk to me after you've given this some more thought. Don't think too hard. Whichever you choose will become your destiny.");
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
		qm.sendNext("You must have worked diligently, seeing how you've already reached Lv. 10. Very well, then. I think you're ready to progress. You have what it takes to become a Knight-in-Training. But before anything, I'd like to ask you a question. Have you thought about what kind of Knight you would like to become?");
		break;
	case 1:
		qm.sendNextPrev("There are 5 different paths of Cygnus Knights to choose from. The choice is completely yours, but you can't change your mind after you've made your decision, so spend some time considering your options. Let me show you what you would look like if you were to become a Knight.");
		break;
	case 2:
		qm.sendSimple("What do you think? Would you like to see yourself as a Knight first? It's pointless if you've already made up your mind. \r\n\r\n#b#L0#I want to see what I would look like as a Chief Knight.#l\r\n#L1#No, thanks. I don't need to see what I'd look like as a Chief Knight.");
		break;
	case 3:
		if (selection == 0)
			qm.sendYesNo("Would you like to see what you would look like as a Chief Knight? You will be able to select your Job after. Please talk to the Chief Knights once you decide on a path. The choice is completely yours.");
		if (selection == 1) {
			qm.sendYesNo("You don't want to see a preview of yourself as a Chief Knight? Fine, then I will allow you to select the path you wish to pursue.");
			}
			select = selection;
			break;
	case 4:
		if (select == 0) {
			qm.warp(130000000);
			Packages.server.quest.MapleQuest.getInstance(20020).forceComplete(qm.getPlayer(), qm.getNpc());
			Packages.server.quest.MapleQuest.getInstance(20100).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.dispose();
			return;
			}
		if (select == 1) {
			if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20020)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(20020).forceComplete(qm.getPlayer(), qm.getNpc());
			Packages.server.quest.MapleQuest.getInstance(20100).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(20020));
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(20100));
			}
			qm.sendNext("You seem to know exactly which path you want to select. The only step remaining now is your final decision.");
			}
			break;
	case 5:
		qm.sendPrev("The Chief Knigh"); //缺失
		break;
	case 6:
		qm.dispose();
}
}