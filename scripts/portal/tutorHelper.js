/*
	名字:	皇后之路
	地圖:	開始之森林1
	描述:	130030000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20022)).getStatus() != 1) {
		Packages.server.quest.MapleQuest.getInstance(20022).forceStart(pi.getPlayer(), 0, 1);
		pi.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.summonHelper(true));
		pi.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.summonMessage("Welcome to Maple World! I'm Mimo. I'm in charge of guiding you until you reach Lv.10 and become a Knight-in-Training. Double-click for further information!"));
		}
		return true;
}