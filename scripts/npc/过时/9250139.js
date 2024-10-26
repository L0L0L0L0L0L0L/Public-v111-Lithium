/*
	名字:	外星基地
	地圖:	502040000
	描述:	502040000
*/

function start() {
	var num = cm.getMap().getNumPlayersInArea(0);
	if (num == cm.getMap().getCharactersThreadsafe().size()) {
		cm.playerMessage(5, "門已經打開了。");
	if (cm.getPlayer().getEventInstance() != null) {
		cm.getPlayer().getEventInstance().setProperty("stage8", "0");
		}
	} else {
		cm.playerMessage(5, "開關上的重量不够。");
		}
	cm.dispose();
}