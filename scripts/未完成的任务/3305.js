/*
	名字:	再次取得蒙特鳩的披風
	地圖:	蒙特鳩協會
	描述:	261000010
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
		qm.sendNext("什麼？你的#b#z1102135##k弄丟了，你怎麼能這樣大意呢。");
		break;
	case 1:
		qm.sendNextPrev("你知道嗎，要重新製作蒙特鳩的披風可不是件容易的事，需要花費大量的材料與手工才能完成。");
		break;
	case 2:
		qm.sendAcceptDecline("事到如今也沒有其它的辦法，如果你有足夠的材料，#b#z4000021##k10張，以及#b10000#k楓幣，可以重新為你製作一件披風。");
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(3305).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.dispose();
}
}