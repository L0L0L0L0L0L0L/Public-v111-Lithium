/*
	名字:	書桌
	地圖:	失蹤煉金術士的家
	描述:	261000001
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3311)).getStatus() != 1) {
		cm.sendNext("A messy desk can be found inside. There are lots of fingerprints all over it... Perhaps others have already investigated this desk.");
		cm.dispose();
		return;
		}
		cm.sendOk("A messy desk can be found inside. There are lots of fingerprints all over it... Perhaps others have already investigated this desk. There seems to be nothing extraordinary about it.");
		cm.dispose();
}