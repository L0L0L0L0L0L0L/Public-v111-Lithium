/*
	名字:	從容逃逸
	地圖:	被破坏的新叶城
	描述:	600000000
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
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		qm.sendNext("Where have you been?! I thought those aliens had turned you into a mindless mining slave! I'm glad you got outta their base alive!");
		break;
	case 1:
		qm.sendNextPrev("Oh, by the way, do you think you could go back to their base?");
		break;
	case 2:
		qm.sendYesNo("Why are you looking at me like that? I need you to in filtrate and eliminate!");
		break;
	case 3:
		qm.sendNext("That is what I'm talking about! I want you to get in those alien faces and be all 'welcome to Maple World!'");
		break;
	case 4:
		qm.sendNextPrev("Let's talk missions! I want you to get back inside that alien base and take out the #r#o9400802##k. That walking, monstrosity acts like the alien mainframe. You're going to have to be careful. I'm guessing it's pretty well-equipped to handle hand-to-hand combat, being a walking computer server and all.");
		break;
	case 5:
		qm.sendNextPrev("I'll leave it in your capable hands. The future of Masteria is in your hands! The fate of the world is in your hands! YOUR HANDS! \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 200000 exp");
		break;
	case 6:
		Packages.server.quest.MapleQuest.getInstance(28752).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.gainExp(200000);
		qm.dispose();
}
}