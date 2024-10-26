/*
	名字:	雷本礦山
	地圖:	發電廠大廳
	描述:	310050000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23957)).getStatus() == 1) {
	if (pi.getMap(931020011).getCharacters().size() < 1) {
		pi.getMap(931020011).resetFully();
		pi.getPlayer().changeMap(pi.getMap(931020011), pi.getMap(931020011).getPortal(1)); //艾雷諾爾的房間
		pi.getPlayer().startMapTimeLimitTask(600, pi.getMap(310050000));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "This field has already been taken by someone. Please try again later, or try a different channel."));
		}
		return false;
}