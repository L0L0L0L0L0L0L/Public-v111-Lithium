/*
	名字:	普蘭西斯
	地圖:	傀儡師洞窟
	描述:	910510200
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case -1:
		cm.dispose();
		return;
	case 0:
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		cm.sendNextS("I'm Francis, the Puppeteer of the Black Wings. How dare you disturb my puppets... It really upsets me, but I'll let it slide this time. If I catch you doing it again though, I swear in the name of the Black Mage, I will make you pay for it.", 9);
		break;
	case 1:
		cm.sendNextPrevS("#b(The Black Wings? Huh? Who are they? And how is all this related to the Black Mage? Hm, maybe you should report this info to Tru.)", 3);
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(21760).forceStart(cm.getPlayer(), 0, 0);
		cm.getPlayer().changeMap(cm.getMap(102010100), cm.getMap(102010100).getPortal(3));
		cm.dispose();
}
}