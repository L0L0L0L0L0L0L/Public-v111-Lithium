/*
	名字:	紅色卡車使用券(1年)
	地圖:	紅色卡車使用券(1年)
	描述:	騎乘技能
*/

function start() {
	if (im.getPlayer().getSkillLevel(80001048) > 0) {
		im.sendOkS("You already learned the #fSkill/8000.img/skill/80001048/iconMouseOver# #b#q80001048##k skill. You can relearn it once the skill expires.", 4);
		im.dispose();
		return;
		}
		im.gainItem(2430118, -1);
		im.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(80001048), 1, 1, im.getCurrentTime() + (365 * 24 * 60 * 60 * 1000));
		im.sendNextS("You learned the #fSkill/8000.img/skill/80001048/iconMouseOver# #b#q80001048##k skill!", 4);
		im.dispose();
}