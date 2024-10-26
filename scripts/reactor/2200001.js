/*
	名字:	玩具城
	地圖:	玩具工廠&amp;lt;B工程4&gt;
	描述:	220030400
*/

function act() {
	var map = Math.random() < 0.5 ? 922000020 : 922000021;
	rm.getPlayer().changeMap(rm.getMap(map), rm.getMap(map).getPortal(0));
	rm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You have found a secret factory!"));
}