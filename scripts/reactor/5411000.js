/*
	名字:	新加坡
	地圖:	引擎室
	描述:	541010100
*/

function act() {
	rm.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("Bgm09/TimeAttack", 6));
	rm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9420513), new java.awt.Point(-146, 225));
	rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "As you wish, here comes Capt Latanica."));
}


//4000381		白色精油