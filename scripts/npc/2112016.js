/*
	名字:	隱藏的文件
	地圖:	猶利塔的實驗室2
	描述:	926130102
*/

var x = [-295, -509, -487, -401, -884, -776, -660, -996, -1641, -1455, -1273, -1837, -1671, -2000, -1869, 170, 230, 393, 371, 369, 668, 852, 863, 710, 596, 988, 1182, 1405, 974, -1860];

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3367)).getStatus() != 1) {
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Insufficient slots in other item windows"));
		cm.dispose();
		return;
		}
		for (var i = 0; i < x.length; i++)
	if (cm.getNpcob().getPosition().x == x[i]) {
		y = i;
		}
		var progress = cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3367)).getCustomData();
	if ((progress >> y) % 2 == 0) {
		progress |= (1 << y);
		cm.gainItem(4031797, 1);
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3367)).setCustomData(progress);
		}
		cm.dispose();
}