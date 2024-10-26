/*
	名字:	雅莉達
	地圖:	王的房間
	描述:	980010010
*/

importPackage(Packages.client);

var arena;

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
		if (status == 0) {
		cm.dispose();
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
		arena = cm.getPlayer().getAriantColiseum();
		if (arena == null) {
			cm.sendOk("嘿，在納希競技大會的戰鬥中，我沒有在競技場上看到你，你在這裡幹什麼。");
			cm.dispose();
			return;
			}
		copns = arena.getAriantScore(cm.getPlayer());
		if (copns < 1 && !cm.getPlayer().isGM()) {
			cm.sendOk("太差勁了，你沒有得到任何寶石。");
			cm.dispose();
		} else {
			cm.sendNext("哦，讓我看看，你帶來了#b" + copns + "#k顆我喜歡的寶石，獲得納希競技點#b" + arena.getAriantRewardTier(cm.getPlayer()) + "分#k，如果你想知道你的總分數，去找#b#p2101015##k問問。");
			}
			break;
	case 1:
		copns = arena.getAriantRewardTier(cm.getPlayer());
		arena.clearAriantRewardTier(cm.getPlayer());
		arena.clearAriantScore(cm.getPlayer());
		cm.removeAll(4031868);

		cm.getPlayer().gainExp(92.7 * cm.getPlayer().getExpRate() * copns, true, true);
		cm.getPlayer().gainAriantPoints(copns);
		cm.sendOk("太棒了，下次請給我更多寶石，哈…哈…哈哈。"); 
		cm.dispose();
}
}