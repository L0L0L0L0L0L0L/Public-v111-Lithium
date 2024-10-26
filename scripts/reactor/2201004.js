/*
	名字:	玩具城
	地圖:	動力室
	描述:	220080001
*/

function act() {
	rm.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("Bgm09/TimeAttack", 6));
	rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The dimensional hole has been filled by the <Piece of Cracked Dimension>."));
	rm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(8500000), new java.awt.Point(-410, -400));
}