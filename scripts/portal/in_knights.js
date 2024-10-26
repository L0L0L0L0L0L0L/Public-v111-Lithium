/*
	名字:	騎士團要塞
	地圖:	要塞入口
	描述:	271030000
*/

function enter(pi) {
	if (pi.getPlayer().itemQuantity(4032922)) {
		pi.getPlayer().changeMap(pi.getMap(271030100), pi.getMap(271030100).getPortal(4)); //騎士團第1區域
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Security in the Stronghold has been increased. Getting in won't be easy."));
		return false;
}