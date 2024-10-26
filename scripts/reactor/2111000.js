/*
	名字:	阿杜比斯的任務Ⅰ
	地圖:	3-2區域
	描述:	280010031
*/

function act() {
	for (var i = 0; i < 3; i++)
	rm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300004), new java.awt.Point(rm.getReactor().getPosition()));
	rm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Oh noes! Monsters in the chest!"));
}