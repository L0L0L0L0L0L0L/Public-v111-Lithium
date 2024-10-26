/*
	名字:	獅子王城
	地圖:	空中監獄
	描述:	211070101
*/

function enter(pi) {
	if (pi.getPlayer().itemQuantity(4032860)) {
		pi.getPlayer().changeMap(pi.getMap(211070100), pi.getMap(211070100).getPortal(1)); //見面室
		pi.getPlayer().removeAll(4032860);
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "The channel has been closed, need to find the key to the prison to open it."));
		return false;
}