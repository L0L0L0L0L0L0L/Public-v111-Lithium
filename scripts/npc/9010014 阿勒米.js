/*
	名字:	阿勒米
	地圖:	邱比特公園
	描述:	100000200
*/

var status = -1;

function action(mode, type, selection) {
	switch (mode) {
	case 0:
		status--;
		break;
	case 1:
		status++;
		break;
		}
	if (cm.getClient().getChannel() == 2) {
		cm.sendNext("不能在通道中尝试该事件 1.");
		cm.dispose();
		return;
		}
	switch (status) {
	case 0:
		cm.sendNext("你好~我是阿拉米娅。我知道怎么做鞭炮！如果你能聚集起来给我#v4001128#，我们就可以放烟花了！请把你从怪物那里得到的所有火药桶都拿来.");
		break;
	case 1:
		cm.sendSimple("每次用户收集所需的火药桶时，我们都可以放烟花! \n\r #b#L0# 我把火药桶带来了.#l#k \n\r #b#L1# 请告诉我收集火药桶的当前状态.#l#k");
		break;
	case 2:
		if (selection == 1) {
			cm.sendNext("火药桶收集状况 \n\r #B"+cm.getKegs()+"# \n\r 如果我们把它们都收集起来，就可以开始放烟火了...");
			cm.safeDispose();
		} else if (selection == 0) {
			cm.sendGetNumber("你带火药桶了吗？那么，请把你的#火药桶#k给我。我要做一个漂亮的鞭炮。你愿意给我多少? \n\r #b< Number of Powder Keg in inventory : 0 >#k", 0, 0, 10000);
			}
			break;
	case 3:
		var num = selection;
		if (num == 0) {
			cm.sendOk("T.T 我需要火药桶来燃放烟花....\r\n 请再想想，跟我谈谈.");
		} else if (cm.itemQuantity(4001128) > num) {
			cm.gainItem(4001128, -num);
			cm.giveKegs(num);
			cm.sendOk("拿到火药桶时别忘了给我.");
			}
			cm.safeDispose();
}
}