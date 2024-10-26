/*
	名字:	隱藏地圖
	地圖:	艾德斯塔公園噴水台附近2
	描述:	931050110
*/

function start() {
	Packages.server.quest.MapleQuest.getInstance(23206).forceStart(ms.getPlayer(), 0, ms.getPlayer().getGender() + 1);//給予3轉性別任務條件
	ms.dispose();
}