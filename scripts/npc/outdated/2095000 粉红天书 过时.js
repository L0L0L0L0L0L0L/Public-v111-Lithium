/*
	名字:	红粉天书
	地圖:	挽救红粉天书之路3
	描述:	925010200
*/

function action(mode, type, selection) {
    if (cm.getQuestStatus(6410) == 1) {
	cm.forceStartQuest(6411, "p2");
	cm.sendNext("謝謝你！");
    } else {
	cm.sendNext("請釋放怪物！");
    }
    cm.dispose();
}