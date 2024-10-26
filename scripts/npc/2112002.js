/*
	名字:	猶利塔
	地圖:	羅密歐和茱麗葉
	描述:	926100600
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
		cm.sendNext("回想起當初所做的一切，我沒有能為瑪迦提亞煉金術做出什麼正確的榜樣，卻變成了一個反面的教材，這也許就是我為煉金術所做的貢獻吧！");
		break;
	case 1:
		cm.sendPrev("事到如今，能看到羅密歐和茱麗葉幸福的在一起，我很欣慰。\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#v4001159# #t4001159# 1 \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 30000 exp");
		break;
	case 2:
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "其它道具視窗的欄位不足"));
			cm.dispose();
			return;
			}
			cm.gainExp(30000);
			cm.gainItem(4001159, 1);
			cm.getPlayer().changeMap(cm.getMap(926100700), cm.getMap(926100700).getPortal(0));
			cm.dispose();
}
}