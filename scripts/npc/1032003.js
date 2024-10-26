/*
	名字:	賽恩
	地圖:	魔法森林
	描述:	101000000
*/

function start() {
	if (cm.getPlayer().getLevel() < 25) {
		cm.sendNext("You want to go in? Must have heard that there's a precious medicinal herb in here, huh? But I can't let some stranger like you who doesn't know that I own this land in. I'm sorry but I'm afraid that's all there is to it.");
		cm.dispose();
		return;
		}
		Meso = cm.getPlayer().getLevel() * 100;
		cm.sendYesNo("You want my herbs, do you? What kind of farmer would just let people trample over his family land? But... I could use the money. I need at least #r" + Meso + "#k mesos to feel good about this.");
}

function action(mode, type, selection) {
	switch (mode) {
	case 0:
		cm.sendNext("Okay, okay. But don't forget. You ain't going anywhere if you don't pay the toll!");
		break;
	case 1:
		if (cm.getPlayer().getMeso() < Meso) {
			cm.sendNext("Lacking mesos by any chance? Make sure you have more than #r" + Meso + "#k mesos on hand. Don't expect me to give you any discounts.");
			cm.dispose();
			return;
			}
			map = cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2050)).getStatus() == 1 ? 910130000 : cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2051)).getStatus() == 1 ? 910130100 : cm.getPlayer().getLevel() < 50 ? 910130000 : 910130100;
			cm.getPlayer().changeMap(cm.getMap(map), cm.getMap(map).getPortal(0));
			cm.gainMeso(-Meso);
			}
			cm.dispose();
}