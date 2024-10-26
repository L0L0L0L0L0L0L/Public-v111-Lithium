/*
	名字:	雷克斯的土狼使用券
	地圖:	雷克斯的土狼使用券
	描述:	騎乘技能
*/

function start() {
	if (im.getPlayer().getSkillLevel(1027) > 0) {
		im.sendOkS("You already learned the #fSkill/8000.img/skill/1027/iconMouseOver# #b#q1027##k skill. You can relearn it once the skill expires.", 4);
		im.dispose();
		return;
		}
		im.gainItem(2430335, -1);
		im.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(1027), 1, 1, -1);
		im.sendNextS("You learned the #fSkill/8000.img/skill/1027/iconMouseOver# #b#q1027##k skill!", 4);
		im.dispose();
}