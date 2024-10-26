/*
	名字:	詭異的約翰
	地圖:	維多利亞港
	描述:	104000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 5) {
		qm.sendNext("#p20000# is acting really strange lately!");
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
		qm.sendNextS("Hey! Can you do me a favor? #p20000# seems a bit strange these days...", 8);
		break;
	case 1:
		qm.sendNextPrevS("What's wrong with #b#p20000##k?", 2);
		break;
	case 2:
		qm.sendNextPrevS("He used to scowl and whine about his arthritis until just recently, but he's suddenly become all happy and smiley!!", 8);
		break;
	case 3:
		qm.sendNextPrevS("#bWhat's wrong with that?? Maybe his arthritis has gotten better...", 2);
		break;
	case 4:
		qm.sendNextPrevS("That's exactly what I'm talking about. How is it possible that he's gotten better all of a sudden? On top of that, he carries around a wooden box and chuckles to himself nonstop!", 8);
		break;
	case 5:
		qm.sendAcceptDecline("I have a feeling there is a secret behind that wooden box. Could you stealthily look into the wooden box next to #p20000#?");
		break;
	case 6:
		Packages.server.quest.MapleQuest.getInstance(21766).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.sendNextS("#bFine, I'll look into the wooden box and see what I can find.", 3);
		break;
	case 7:
		qm.sendNextPrevS("Okay. This should answer the mystery of why #p20000# has been acting strange. Inspect the wooden box located next to #p20000# and let me know what you find.", 9);
		break;
	case 8:
		qm.sendPrevS("You know where #p20000# is, right? It's to the right of here. The box will be somewhere near John.", 9);
		break;
	case 9:
		qm.dispose();
}
}

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendNext("I guess you don't know yet... That Wooden Box is... strange.");
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
		qm.sendAcceptDecline("Did you find out what was in the wooden box? Tell me, tell me, tell me! \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 200 exp");
		break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21766)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(21766).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainExp(200);
			}
			qm.sendNextS("#bThere really wasn't anything inside. All it had were some snail shells and ingredients to treat arthritis.", 3);
			break;
	case 2:
		qm.sendNextPrevS("Oh? Then why has #p20000# started acting so strange? I'm so curious, I can't stand it! Anyway, thanks for your help.", 9);
		break;
	case 3:
		qm.sendPrevS("#b(You feel bad for #b#p1002001##k, but sometimes, ignorance is bliss.)", 3);
		break;
	case 4:
		qm.dispose();
}
}