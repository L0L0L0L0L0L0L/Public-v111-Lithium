/*
	名字:	空牆
	地圖:	廢棄的工地
	描述:	103010100
*/

function start(){
	if (cm.getQuestStatus(2358) == 1) { //too lazy
		cm.forceCompleteQuest(2358);
	}
	cm.dispose();
}
