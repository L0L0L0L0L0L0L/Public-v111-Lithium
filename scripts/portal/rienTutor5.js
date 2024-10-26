/*
	名字:	瑞恩島
	地圖:	寒冷的森林５
	描述:	140090500
*/

function enter(pi) {
	if (pi.getPlayer().getInfoQuest(21019).indexOf("miss=o") != -1) {
		return false;
		}
		pi.getPlayer().updateInfoQuest(21019, pi.getPlayer().getInfoQuest(21019) + ";miss=o");
		pi.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.summonMessage("Just a little bit more, and you'll reach the town. I'll head over there first, since I also have some things to take care of. There's no need to rush, Aran. I'll see you there."));
		return true;
}