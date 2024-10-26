/*
	名字:	機動巡察車90日使用券 (4名乘客)
	地圖:	機動巡察車90日使用券 (4名乘客)
	描述:	騎乘技能
*/

function start() {
	if (im.getPlayer().getSkillLevel(80001078) > 0) {
		im.sendOkS("You already learned the #fSkill/8000.img/skill/80001078/iconMouseOver# #b#q80001078##k skill. You can relearn it once the skill expires.", 4);
		im.dispose();
		return;
		}
		im.gainItem(2430324, -1);
		im.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(80001078), 1, 1, im.getCurrentTime() + (365 * 24 * 60 * 60 * 1000));
		im.sendNextS("You learned the #fSkill/8000.img/skill/80001078/iconMouseOver# #b#q80001078##k skill!", 4);
		im.dispose();
}