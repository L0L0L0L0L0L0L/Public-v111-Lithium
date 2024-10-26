/*
	名字:	勇士之村
	地圖:	勇士之村
	描述:	102000000
*/

var map = Array(101020300, 102000000, 103000000, 120000000, 200080100);

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(29004)).getStatus() < 1) {
		Packages.server.quest.MapleQuest.getInstance(27018).forceStart(pi.getPlayer(), 0, 0);
		Packages.server.quest.MapleQuest.getInstance(29004).forceStart(pi.getPlayer(), 0, null);
		pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(29004)).setCustomData("00000");
		}
	for (var i = 0; i < map.length; i++)
	if (pi.getPlayer().getMap().getId() == map[i]) {
		var slot = i;
		}
		var x = pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(29004)).getCustomData();
		var y = pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(27018)).getCustomData();
		var ch = x[slot];
	if (ch == '0') {
		var next = x.substr(0, slot) + '1' + x.substr(slot + 1);

		pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(29004)).setCustomData(next);
		pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(27018)).setCustomData(parseInt(y) + 1);
		pi.getPlayer().updateQuest(pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(27018)), true);

		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("" + (parseInt(y) + 1) + "/5 Regions Completed"));
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("The One Who's Touched the Sky title in progress."));
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The One Who's Touched the Sky title in progress. " + (parseInt(y) + 1) + "/5 Regions Completed"));
		}
		return true;
}