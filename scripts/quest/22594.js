/*
	名字:	第二個任務的結果
	地圖:	長老公館
	描述:	211000001
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 5) {
		qm.sendNext("Don't ask any more questions. I won't give you any more answers.");
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
		qm.sendNext("What is it? You don't look like you need my teachings... Hmm? Is it a good thing to kill monsters? Well, of course! If it weren't for the zombies, #m211000000# could develop a lot further. If you have the energy, keep getting rid of those zombies.");
		break;
	case 1:
		qm.sendNextPrevS("#b(Perhaps this mission was indeed for a good cause.)", 2);
		break;
	case 2:
		qm.sendNextPrev("But you'd better take care of the teeth after you've killed the zombies, because Zombie's Lost Tooths have a dark force inside. If you're not careful, you may end up getting corrupted, just like #p2022003#. He wishes to be redeemed from his wrongdoings, but he just keeps becoming more evil...");
		break;
	case 3:
		qm.sendNextPrevS("#bHas #p2022003# done something wrong?", 2);
		break;
	case 4:
		qm.sendNextPrev("#p2022003# was caught with a copy of the basement key to the #m211000001# some time ago. The key was taken away, but he most likely made copies. We'll have to keep a closer lookout on the basement for the time being.");
		break;
	case 5:
		qm.sendNextPrevS("#bWhat's in the basement?", 2);
		break;
	case 6:
		qm.sendAcceptDecline("There is an old treasure that's been stored in the #m211000000# for a long time. I can't tell you anything more. It is something that must not get lost. Don't ask me any more questions about it. \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 23000 exp");
		break;
	case 7:
		qm.gainExp(5300);
		Packages.server.quest.MapleQuest.getInstance(22594).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(22594));
		qm.sendOk("No need to look so gloomy. It's not like you stole the treasure or even helped steal the treasure. #rIt's true our security has become weaker lately#k but we just need to be more watchful, that's all.");
		break;
	case 8:
		qm.dispose();
}
}