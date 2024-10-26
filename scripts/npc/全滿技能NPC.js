/*
	名字:	楓之島
	地圖:	楓之島
	描述:	楓之島
*/

function start() {
	cm.sendSimple ("Hi, trouble with skills?.\r\n\#L1#Max All Skills\r\n\#L2#Max Skills By Job\r\n\#L3#Clear All Skills\r\n");
}

function action(mode, type, selection) {
	if (mode > 0) {
		if (selection < 1) {
        			cm.maxAllSkills();
			cm.sendOk("I have maxed your stats. Happy Mapling !");
			cm.dispose();
			return;
			}
		if (selection < 2) {
			cm.maxSkillsByJob();
			cm.sendOk("I have maxed your stats by job. Happy Mapling !");
			cm.dispose();
			return;
			}
			cm.clearSkills();
			cm.sendOk("I have cleared your stats. Happy Mapling !");
			}
			cm.dispose();
}