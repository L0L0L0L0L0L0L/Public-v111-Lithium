/*
	名字:	隱藏地圖
	地圖:	傑利麥勒實驗室入口
	描述:	931000640
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() < 5) {
		for (var i = 0; i < 10; i++)
		pi.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300492), new java.awt.Point(-248, -164));
		}
		pi.gainItem(4033095, pi.getPlayer().itemQuantity(4033095) ? 0 : 1);
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "The research log has been found, it's best to leave here as soon as possible."));
		return true;
}