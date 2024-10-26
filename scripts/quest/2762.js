/*
	名字:	說話的樹的請託
	地圖:	閃爍森林的通路
	描述:	101010000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 1) {
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
		qm.sendNext("I wonder, then, if #p1032102# knew of my troubles? You see, I've been working on improving my debate skills, but I have been interrupted by #r#o9100014#s#k appearing more frequently near #m101000000#. #r#o9100014##k near #m101000000#... Odd, is it not?");
		break;
	case 1:
		qm.sendNextPrev("These foul Axe Stumps have been threatening me with their axes. They even took a little chunk out of me last time! This cannot be allowed to continue.");
		break;
	case 2:
		qm.sendYesNo("I will send you to where those brutish #r#o9100014#s#k are hiding, so could you kindly eliminate #r40#k of them? I am sure they will not bother me anymore after that. Because they will be gone.");
		break;
	case 3:
		qm.sendNext("I'll leave it to you, then!");
		break;
	case 4:
		Packages.server.quest.MapleQuest.getInstance(2762).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().changeMap(qm.getMap(910100100), qm.getMap(910100100).getPortal(0));
		qm.dispose();
}
}