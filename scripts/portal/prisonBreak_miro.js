/*
	名字:	隱藏地圖
	地圖:	黑暗之塔1
	描述:	921160300
*/

var map = [921160300, 921160310, 921160320, 921160330, 921160340, 921160350];

function enter(pi) {
	eim = pi.getPlayer().getEventInstance();
	if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Due to the monster's obstruction, the exit has been closed."));
		return false;
		}
	for (var i = 0; i < map.length; i++)
	if (eim.getProperty(i + "st") == null) {
		eim.setProperty(i + "st", (Math.random() < 0.2) ? "miro0" : (Math.random() < 0.3) ? "miro1" : (Math.random() < 0.5) ? "miro2" : "miro3");
		}
	for (var i = 0; i < map.length; i++)
	if (pi.getPlayer().getMap().getId() == map[i])
	if (eim.getProperty(i + "st") == pi.getPortal().getName()) {
		map0 = pi.getPlayer().getMap().getId() + (pi.getPlayer().getMap().getId() == 921160350 ? 50 : 10);
		pi.getPlayer().changeMap(pi.getMap(map0), pi.getMap(map0).getPortal("out00"));
		return true;
		}
		pi.getPlayer().changeMap(pi.getMap(921160300), pi.getMap(921160300).getPortal("out00"));
		return false;
}