/*
	名字:	工作人员喵喵
	地圖:	工作人员强化特别训练场
	描述:	970030000
*/

function start() {
    //if (cm.getMapId() == 970030000) {
	//cm.start_DojoAgent(false, false);
	//cm.dispose();
    //} else if (cm.getMapId() == 910000000) {
	//cm.sendYesNo("Do you want to go to Special Training Camp for Agent?")
	//type = 1;
    //} else {
	cm.sendYesNo("Do you want to get out now?");
	//type = 2;
    //}
}

function action(mode, type, selection) {
    if (mode == 1) {
	cm.warp(970030000, 0);
    }
    cm.dispose();
}