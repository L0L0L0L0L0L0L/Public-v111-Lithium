/*
	名字:	相當可疑的洞。
	地圖:	人煙稀少的石山
	描述:	931000001
*/

function start() {
	cm.sendYesNo("#b(What a suspicious hole. Maybe Von is hiding inside. Peek inside?)");
}

function action(mode, type, selection) {
	switch (mode) {
	case 0:
		cm.sendNext("#b(Even Von wouldn't hide here, right?)");
		break;
	case 1:
		cm.gainExp(35);
		cm.getPlayer().changeMap(cm.getMap(931000010), cm.getMap(931000010).getPortal(0));
		}
		cm.dispose();
}