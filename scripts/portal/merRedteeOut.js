/*
	名字:	隱藏地圖
	地圖:	瑞德弟的陷阱
	描述:	922030100
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You cannot leave before defeating the Giant."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(220040100), pi.getMap(220040100).getPortal(6)); //時間之路&amp;lt;2&gt;
		return true;
}