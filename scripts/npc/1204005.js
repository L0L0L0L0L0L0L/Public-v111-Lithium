/*
	名字:	特魯
	地圖:	危險的資料商店
	描述:	910400000
*/

function start() {
	if (cm.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		cm.sendNext("They ambushed me... *Sniff sniff* Don't worry about me. Just destroy him!");
		cm.dispose();
		return;
		}
		cm.sendNext("Whoa, were you able to defeat them? I wouldn't expect anything less from a hero. Ugh, let's clean this place up.");
}

function action(mode, type, selection) {
	if (mode > 0) {
		cm.getPlayer().changeMap(cm.getMap(104000004), cm.getMap(104000004).getPortal(0));
		Packages.server.quest.MapleQuest.getInstance(21762).forceStart(cm.getPlayer(), 0, 2);
		}
		cm.dispose();
}