/*
	名字:	菇菇王國
	地圖:	瑪天路3
	描述:	106021000
*/

var map = 106021001; //安全室
var num = 10;

function enter(pi) {
	if (!pi.getPlayer().itemQuantity(4032405)) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The room seems to be locked tight. You can acquire the Secret Key by rescuing Princess Violetta."));
		return false;
		}
		for (var i = 0; i < num; i++)
	if (pi.getMap(map + i).getCharacters().size() < 1) {
		Packages.server.quest.MapleQuest.getInstance(2347).forceStart(pi.getPlayer(), 0, 1);
		pi.getPlayer().changeMap(pi.getMap(map + i), pi.getMap(map + i).getPortal(1));
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You are using the Secret Kay to enter."));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "All of the Mini-Dungeons are in use right now, please try again later."));
		return false;
}