/*
	名字:	泰拉森林
	地圖:	泰拉森林時空之門
	描述:	240070000
*/

var map = [240070010, 240070020, 240070030, 240070040, 240070050, 240070060]
var mob = [7120100, 7120101, 7120102, 8120100, 8120101, 8140510];
var quest = [3719, 3724, 3730, 3736, 3742, 3748];

function enter(pi) {
	for (var i = 0; i < quest.length; i++)
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(quest[i])).getStatus() == 1) {
	if (pi.getMap(map[i]).getCharacters().size() < 1) {
		pi.getMap(map[i]).resetFully();
		pi.getPlayer().changeMap(pi.getMap(map[i]), pi.getMap(map[i]).getPortal(1));
		pi.getPlayer().startMapTimeLimitTask(600, pi.getMap(240070000));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Someone is already in this map, Better come back later."));
		}
		return false;
}