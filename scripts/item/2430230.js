/*
	名字:	瘋狂成長秘藥
	地圖:	瘋狂成長秘藥
	描述:	特殊消耗品
*/

function start() {
	if (im.getPlayer().getLevel() > 199) {
		im.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You may not use this item."));
		im.dispose();
		return;
		}
		im.gainItem(2430230, -1);
		im.getPlayer().levelUp();//給予一個等級
		im.dispose();
}