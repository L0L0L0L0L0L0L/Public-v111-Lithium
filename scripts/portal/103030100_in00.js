/*
	名字:	沼地
	地圖:	野生鱷魚沼地
	描述:	103030100
*/

function enter(pi) {
	if (pi.getMap(103030101).getCharacters().size() < 1) {
		pi.getMap(103030101).resetFully();
		pi.getPlayer().changeMap(pi.getMap(103030101), pi.getMap(103030101).getPortal(1)); //沼地小屋
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2878)).getStatus() == 1) {
		for (var i = 0; i < 7; i++)
		pi.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(3110100), new java.awt.Point(-100 + (Math.random() * 350), 155));
		pi.getPlayer().startMapTimeLimitTask(300, pi.getMap(103030100));
		return true;
		}
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Looks like someone's inside the Hut in the Swamp. Try entering later."));
		return false;
}