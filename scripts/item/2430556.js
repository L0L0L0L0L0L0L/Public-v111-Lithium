/*
	名字:	Maximus Mount 15 day coupon 
	地圖:	Maximus Mount 15 day coupon 
	描述:	騎乘技能
*/

function start() {
	if (im.getPlayer().getSkillLevel(80001195) > 0) {
		im.sendOkS("You already learned the #fSkill/8000.img/skill/80001195/iconMouseOver# #b#q80001195##k skill. You can relearn it once the skill expires.", 4);
		im.dispose();
		return;
		}
		im.gainItem(2430556, -1);
		im.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(80001195), 1, 1, im.getCurrentTime() + (15 * 24 * 60 * 60 * 1000));
		im.sendNextS("You learned the #fSkill/8000.img/skill/80001195/iconMouseOver# #b#q80001195##k skill!", 4);
		im.dispose();
}