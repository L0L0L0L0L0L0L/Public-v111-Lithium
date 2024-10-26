/*
	名字:	雅典娜女神
	地圖:	雅典娜禁地&amp;lt;女神之祝福&gt;
	描述:	920011300
*/

var item = new Array(2000004, 2022113, 2040019, 2040020, 1072238, 1040081, 1382002, 1442021, 1072239, 1002096, 1322010, 1472005, 1002021, 1422007, 1082148, 1102081, 1040043, 1002117, 1302013, 1462024, 1382003, 1051001, 1472000, 1002088, 1472003, 1002048, 1002178, 1040007, 1002131, 1002288, 1002183, 1372006, 1442004, 1040082, 1322003, 2022195, 1412001, 1472009, 1060088, 1002035, 1322009, 1472016, 1332011, 1032027, 1002214, 1312014, 1002120, 1322023, 1452010, 1002034, 1060025, 1082147, 1002055, 1060019, 1002180, 1002154, 1060068, 1462013);

function start() {
	if (cm.getPlayer().getMap().getId() == 920010100)
		cm.sendYesNo("大人，謝謝你把我拯救出來，我已經解除了阻止進入塔樓監獄倉庫的咒語，你可能會在下面找到一些好的東西，或者我們換個地方在談談？");
	else
		cm.sendYesNo("大人，感謝你不僅修復了雕像，還把我救了出來，為了表示感謝，請收下這張紀念你勇敢的紀念物。\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n\r\n#fUI/UIWindow.img/QuestIcon/5/0#");
}

function action(mode, type, selection) {
	if (mode > 0) {
		if (cm.getPlayer().getMap().getId() != 920011300) {
		cm.getPlayer().changeMap(cm.getMap(920011300), cm.getMap(920011300).getPortal(0));
		cm.dispose();
		return;
		}
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "其它道具視窗的欄位不足"));
		cm.dispose();
		return;
		}
		cm.gainNX(3000);
		cm.addTrait("will", 50);
		cm.addTrait("charm", 10);
		cm.gainItem(4001158, 1);
		cm.gainItem(item[Math.floor(Math.random() * item.length)], 1);
		cm.getPlayer().changeMap(cm.getMap(920011200), cm.getMap(920011200).getPortal(0));
		}
		cm.dispose();
}