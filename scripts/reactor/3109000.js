/*
	名字:	埃德爾斯坦
	地圖:	修亞勒的水倉庫
	描述:	931000410
*/

function act() {
	if (rm.getReactor().getState() == 10) {
		Packages.server.quest.MapleQuest.getInstance(23130).forceStart(rm.getPlayer(), 0, 1);
}
}