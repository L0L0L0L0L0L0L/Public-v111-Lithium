/*
	名字:	隱藏地圖
	地圖:	時間監控室
	描述:	222020400
*/

function enter(pi) {
	pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Now moving past Gate of Time."));
	pi.getPlayer().changeMap(pi.getMap(300000100), pi.getMap(300000100).getPortal(1)); //小森林
	return true;
}