/*
	名字:	可疑的女子
	地圖:	發電廠大廳
	描述:	931050701
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
		case -1:
			cm.dispose();
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
			cm.sendNext("…! How could there be someone here…?! Black wings?!");
			break;
		case 1:
			cm.sendNextPrevS("Hmm? Who are you!? Where is Ipeiho!?");
			break;
		case 2:
			cm.sendNextPrev("(Not black wings? Who is that?);");
			break;
		case 3:
			cm.sendNextPrev("Quickly, tell me who you are!");
			break;
		case 4:
			cm.sendNextPrevS("I am a Dragon Mage… I came here because I heard Ipeiho was here…");
			break;
		case 5:
			cm.sendPrev("(Not black wings? Just an ordinary person? Forget him, let's go!");
			break;
		case 6:
			cm.removeNpc(cm.getPlayer().getMap().getId(), cm.getNpc());
			Packages.server.quest.MapleQuest.getInstance(22615).forceStart(cm.getPlayer(), 0, 1);
			cm.dispose();
			break;
	}
}
