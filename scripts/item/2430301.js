/*
	名字:	雲朵使用券
	地圖:	雲朵使用券
	描述:	騎乘技能
*/

function start() {
	if (im.getPlayer().getSkillLevel(80001070) > 0) {
		im.sendOkS("You already learned the #fSkill/8000.img/skill/80001070/iconMouseOver# #b#q80001070##k skill. You can relearn it once the skill expires.", 4);
		im.dispose();
		return;
		}
		im.gainItem(2430301, -1);
		im.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(80001070), 1, 1, -1);
		im.sendNextS("You learned the #fSkill/8000.img/skill/80001070/iconMouseOver# #b#q80001070##k skill!", 4);
		im.dispose();
}