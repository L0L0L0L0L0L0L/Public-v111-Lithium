/*
	名字:	末日反抗軍本部
	地圖:	訓練房入口
	描述:	310010010
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23137)).getStatus() > 0 && pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23138)).getStatus() < 2) {
		pi.getPlayer().changeMap(pi.getMap(931000610), pi.getMap(931000610).getPortal(1)); //監獄
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "This is the Resistance's prison. You don't belong in prison, do you?"));
		return false;
}