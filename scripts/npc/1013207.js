/*
	名字:	坤
	地圖:	臨時港口
	描述:	914100000
*/

function start() {
	if (cm.getPlayer().getMap().getId() == 200090080) {
		cm.sendNext("It'll take some time to get to the island in John's Map. It's a dangerous place, so we might get lost and end up back in Lith Harbor.");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getMap().getId() == 200090090) {
		cm.sendOk("It'll take some time to get to Lith Harbor. It's a dangerous place, so we might get lost and end up back on the island.");
		cm.dispose();
		return;
		}
		cm.sendYesNo("These are dangerous seas, but l suppose that could spice things up once in a while. You want to return to Lith Harbor?");
}

function action(mode, type, selection) {
	switch (mode) {
	case 0:
		cm.sendNext("You still have business on the island? I'll be here when you need me.");
		break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(200090090), cm.getMap(200090090).getPortal(0));
		cm.getPlayer().startMapTimeLimitTask(30, cm.getMap(104000000));
		}
		cm.dispose();
}