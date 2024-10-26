/*
	名字:	隱藏地圖
	地圖:	突破甲板I
	描述:	925100200
*/

function enter(pi) {
	var eim = pi.getPlayer().getEventInstance();
	if (eim != null && eim.getProperty("stage02") == null) {
		eim.setProperty("stage02", 1);
		pi.getMap(925100202).spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300107), new java.awt.Point(480, 238));
		}
		pi.getPlayer().changeMap(pi.getMap(925100202), pi.getMap(925100202).getPortal(1)); //海盜王的心腹I
		if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0)
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Please defeat the Pirate King patrolling this area."));
		return true;
}