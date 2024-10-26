/*
	名字:	隱藏地圖
	地圖:	突破甲板II
	描述:	925100300
*/

function enter(pi) {
	var eim = pi.getPlayer().getEventInstance();
	if (eim != null && eim.getProperty("stage03") == null) {
		eim.setProperty("stage03", 1);
		pi.getMap(925100302).spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300107), new java.awt.Point(480, 238));
		}
		pi.getPlayer().changeMap(pi.getMap(925100302), pi.getMap(925100302).getPortal(1)); //海盜王的心腹II
		if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0)
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Please defeat the Pirate King patrolling this area."));
		return true;
}