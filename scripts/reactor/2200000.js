/*
	名字:	隱藏地圖
	地圖:	玩偶之家
	描述:	922000010
*/

function act() {
	rm.getPlayer().changeMap(rm.getMap(221023200), rm.getMap(221023200).getPortal(0));
	rm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You will be expelled from this map by an unknown force."));
}