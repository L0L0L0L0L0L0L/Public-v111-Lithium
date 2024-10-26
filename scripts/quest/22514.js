/*
	名字:	那就加強修練吧
	地圖:	寶貝龍
	描述:	寶貝龍
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 4) {
		qm.sendNext("Let's train, master.");
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
		qm.sendNext("Let's train and get stronger, then! Let's train until we can beat a #o2220100# with ease, then go back and help that woman! All you have to do is train! Train! Traaaaaaaaaaiiiiiiiiiinnnn!!");
		break;
	case 1:
		qm.sendNextPrevS("#b(Geez, this dragon isn't going to let up, is he? You hear that there's a training center around #m100000000# #p1012003# might know something about that.)", 2);
		break;
	case 2:
		qm.sendNextPrev("Let's train, master. Let's go!");
		break;
	case 3:
		qm.sendNextPrevS("#bOkay, okay! Fine, geez. I'll go talk to Chief Stan.", 2);
		break;
	case 4:
		qm.sendAcceptDecline("Really? We're really going to train?");
		break;
	case 5:
		Packages.server.quest.MapleQuest.getInstance(22514).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.sendNext("Yippee! That's why I love you!");
		break;
	case 6:
		qm.sendPrevS("#b(You finally calmed him a bit. Now go talk to Chief Stan about the training center.)", 2);
		break;
	case 7:
		qm.dispose();
}
}