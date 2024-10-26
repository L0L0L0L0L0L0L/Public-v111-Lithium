/*
	名字:	秘密團體第一個任務
	地圖:	天空之塔&amp;lt;隱密的房間&gt;
	描述:	200080601
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22567)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(22567).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("#b(You place the Growth Accelerant you got from #p2012034#.)");
			break;
	case 1:
		qm.sendNextPrev("#b(You place the #p2012034# back into the hole and restore the brick wall to its original form.) \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 7500 exp \r\n#fUI/UIWindow.img/QuestIcon/10/0# 2 sp");
		break;
	case 2:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22567)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(22567).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainItem(4032468, -10);
			qm.getPlayer().gainSP(2, 3);
			qm.gainExp(7500);
			}
			qm.sendNextPrevS("#bPhew... I thought the mission would be easy, since I'm a temporary member and all, but it was tough! It's so exciting, being part of this secret organization.", 2);
			break;
	case 3:
		qm.sendNextPrev("Pretty thrilling, right, master? I wonder what this Growth Accelerant is for. Do you think I would grow like crazy if I ate some?", 1013000);
		break;
	case 4:
		qm.sendNextPrevS("#bI don't know. #p2030012# says there could be side effects if consumed by an animal, so I don't think you should try...", 2);
		break;
	case 5:
		qm.sendNextPrev("Master! Are you calling me an animal?", 1013000);
		break;
	case 6:
		qm.sendNextPrevS("#bWell, humans are animals too! Hahaha.", 2);
		break;
	case 7:
		qm.sendNextPrev("I don't know about that... Fine. I'll let that one go.", 1013000);
		break;
	case 8:
		qm.sendNextPrevS("#bDon't you think this Growth Accelerant must be to help crops grow? Some kind of fertilizer or something?", 2);
		break;
	case 9:
		qm.sendNextPrev("That makes sense. Faster-growing, bigger crops means more food for more people. Less people will go hungry. This organization is all about doing good deeds to improve people's lives, right?", 1013000);
		break;
	case 10:
		qm.sendPrevS("#bYeah. I think that makes sense!", 2);
		break;
	case 11:
		qm.dispose();
}
}