/*
	名字:	瓦尼
	地圖:	埃德爾斯坦
	描述:	310000000
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23938)).getStatus() != 1) {
		cm.sendNext("Don't do anything suspicious...");
		cm.dispose();
		return;
		}
	cal = java.util.Calendar.getInstance();
	hour = cal.get(java.util.Calendar.HOUR_OF_DAY);
	if (hour > 20 && hour < 23) {
		Packages.server.quest.MapleQuest.getInstance(23984).forceStart(cm.getPlayer(), 0, 1);
		cm.sendNext("What are you looking at? I'm not standing here because I miss Gabrielle. l just...want to make sure that no thieves get in. Yeah.");
		cm.dispose();
		return;
		}
		cm.sendNext("Now is not the time for conversation.");
		cm.dispose();
}