/*
	名字:	被搶走的武陵封印石
	地圖:	特魯的情報商店
	描述:	104000004
*/

var status = -1;

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 6) {
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21748)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(21748).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNextS("Aran, I heard you went to #m250000000# to investigate the Black Wings. You must have been working so hard. Did the Black Wings trick you again?", 8);
			break;
	case 1:
		qm.sendNextPrevS("(You tell her about the Seal Stone of #m250000000#.)", 2);
		break;
	case 2:
		qm.sendNextPrevS("What...? So you are the one that left the Seal Stone behind a long time ago? It's okay that the Seal Stone of #m250000000# has been taken away. We still learned something valuable from this!", 8);
		break;
	case 3:
		qm.sendNextPrevS("Something valuable?", 2);
		break;
	case 4:
		qm.sendNextPrevS("The fact that the heroes had the Seal Stone means that #bwe may be able to find the Seal Stone if we just look for details about the heroes and piece the puzzle together#k, right? Surely, we'll able able to get our hands on the Seal Stone before the Black Wings!", 8);
		break;
	case 5:
		qm.sendNextPrevS("Ah, that's right! That's brilliant!", 2);
		break;
	case 6:
		qm.sendYesNo("Heheh... This is great! I'm feeling really motivated! Aren't you, Aran?");
		break;
	case 7:
		qm.gainExp(1500);
		Packages.server.quest.MapleQuest.getInstance(21748).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.sendOk("I think I need to start researching the heroes again. Mr. Tru will continue to seek information on the Black Wings, so you just concentrate on your training! We'll teach those Black Wings a lesson!");
		break;
	case 8:
		qm.dispose();
}
}