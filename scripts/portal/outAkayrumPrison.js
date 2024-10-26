/*
	名字:	次元的縫隙
	地圖:	邪惡內面的空地
	描述:	272020300
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() != 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Due to the monster's obstruction, the exit has been closed."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(272020200), pi.getMap(272020200).getPortal(1)); //阿卡伊農的祭壇
		return true;
}