/*
	名字:	達米
	地圖:	燃燒的神木村6
	描述:	272000600
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31177)).getStatus() < 2) {
		cm.dispose();
		return;
		}
		cm.sendSimple("Well, l promised. If you really choose, I will transform you into a #rDragon#k. It's your choice. \r\n#L1##bTransform me into a Dragon!#l");
}

function action(mode, type, selection) {
	if (mode > 0) {
		cm.getPlayer().changeMap(cm.getMap(200090520), cm.getMap(200090520).getPortal(5));
		cm.useItem(2210083); //變龍
		}
		cm.dispose();
}