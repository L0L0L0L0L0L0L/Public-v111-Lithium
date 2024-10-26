/*
	名字:	武器會給主人添麻煩
	地圖:	瑞恩村
	描述:	140000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 0) {
		qm.sendNext("Did you know that you can use even more powerful skills if you undergo job advancement when you've reached Lv.70? Don't save your SP, though, because you can't apply the to your 3rd job skills. Well, it doesn't necessarily mean that #p1201001# will allow job advancement, but you should still keep that in mind.");
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
		qm.sendNext("How is training going? Hm, Lv. 70? You still have a long way to go, but it's definitely praiseworthy compared to the first time I met you. Continue to train diligently, and I'm sure you'll regain your strength soon!");
		break;
	case 1:
		qm.sendAcceptDecline("But first, you must head to #b#m140000000##k. Your #b#p1201001##k is acting weird again. I think it has something to tell you. It might be able to restore your abilities, so please hurry.");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(21300).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.dispose();
}
}