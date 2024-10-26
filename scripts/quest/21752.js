/*
	名字:	尋找鑰匙
	地圖:	亞泰爾營地
	描述:	300000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 3) {
		qm.dispose();
		return;
		}
		if (status > 5) {
		qm.sendNext("I'm not confident enough to teach them a lesson. I'm scared to tell Athena Pierce. What should I do?");
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
		qm.sendSimple("Aren't you... Aran?! You're alive? Well, look at you, of course you're alive! You're the master of the polearm. No way you'd let the Black Mage stop you! \r\n#L0##b(I was stopped...)#l");
		break;
	case 1:
		qm.sendSimple("So, what brings you here? Are you looking for a new town? You really should let someone else do a trivial task like that. You should be doing things that require your strength! \r\n#L0##bl came to get the Storage Key.#l");
		break;
	case 2:
		qm.sendYesNo("Oh, the Storage Key! Of course! Give me a second... Where did I put that?");
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(21752).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.sendNext("Aran, I'm so sorry, I don't know what to say. I know it's around here somewhere, but I must have lost all of my kays... It's all my fault! You reminded me so many times to be careful, but I became weak and vulnerable!");
		break;
	case 4:
		qm.sendNextPrev("But, don't you worry! I'm sure the #r#o9001024#s#k have the keys! You'll just need to teach them a lesson and find the lost key! Since I lost #b10 #t4032326#s#k, there's no way to tell which key is yours... Please find all 10 of them!");
		break;
	case 5:
		qm.sendNextPrev("You think I should do it myself? I suppose you have a point... but, no! I can't! I have a very important job to do here. I need to tend to the injured soldiers. Please, show us your strength once more, oh mighty hero!");
		break;
	case 6:
		qm.sendYesNo("I can send you right to the monsters. Would you like to go now?");
		break;
	case 7:
		qm.getPlayer().changeMap(qm.getMap(930010001), qm.getMap(930010001).getPortal(1));
		qm.dispose();
}
}