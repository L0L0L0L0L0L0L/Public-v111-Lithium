/*
	名字:	隱藏地圖
	地圖:	最後的陷阱
	描述:	921160500
*/

function enter(pi) {
	pi.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "A team member climbed to the top of the tower."));
	return true;
}