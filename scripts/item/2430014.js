/*
	名字:	彩色菇菇芽孢
	地圖:	彩色菇菇芽孢
	描述:	任務消耗品
*/

function start() {
	if (im.getPlayer().getMap().getId() != 106020300 || im.getPlayer().getPosition().x < 1100 || im.getPlayer().getPosition().y > 40) {
		im.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("You are too far away."));
		im.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You are too far away to use item. Come closer to the barrier to use it."));
		im.dispose();
		return;
		}
		im.dispose();
		im.openNpc(1300010);
}