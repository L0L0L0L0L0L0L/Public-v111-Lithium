/*
	名字:	遺失的馬鞍
	地圖:	動物園
	描述:	230000003
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
		qm.sendNext("啊，是之前來找我的那個騎著和龍一樣的奇怪生物的客人啊。你找我有事嗎……啊哈，難道是把馬鞍弄丟了嗎？");
		break;
	case 1:
		qm.sendNextPrev("你可是真是一點都不小心，製作馬鞍可是要花很多工夫的。依照之前的製作馬鞍的材料，需要50個#b#t4000592##k和1個#b#t4032474##k，至於手續費……");
		break;
	case 2:
		qm.sendAcceptDecline("之前你製作馬鞍的時候，我給你打了折扣，這次可要按照原價收取哦。費用是2000萬楓幣。只要你能給我這些材料和手續費，我就幫你製作馬鞍，你可以從上層的緞帶肥肥之間的菇菇寶貝屋之門進去，就可以找到材料。");
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(22405).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.dispose();
}
}