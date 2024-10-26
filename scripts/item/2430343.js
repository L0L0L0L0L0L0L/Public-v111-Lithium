/*
	名字:	黑鱷魚使用券
	地圖:	黑鱷魚使用券
	描述:	騎乘技能
*/

function start() {
	if (im.getPlayer().getSkillLevel(80001004) > 0) {
		im.sendOkS("You already learned the #fSkill/8000.img/skill/80001004/iconMouseOver# #b#q80001004##k skill. You can relearn it once the skill expires.", 4);
		im.dispose();
		return;
		}
		im.gainItem(2430343, -1);
		im.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(80001004), 1, 1, -1);
		im.sendNextS("You learned the #fSkill/8000.img/skill/80001004/iconMouseOver# #b#q80001004##k skill!", 4);
		im.dispose();
}