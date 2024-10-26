/*
	名字:	OS3A Robot 1-Year Coupon
	地圖:	OS3A Robot 1-Year Coupon
	描述:	騎乘技能
*/

function start() {
	if (im.getPlayer().getSkillLevel(80001053) > 0) {
		im.sendOkS("You already learned the #fSkill/8000.img/skill/80001053/iconMouseOver# #b#q80001053##k skill. You can relearn it once the skill expires.", 4);
		im.dispose();
		return;
		}
		im.gainItem(2430148, -1);
		im.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(80001053), 1, 1, im.getCurrentTime() + (365 * 24 * 60 * 60 * 1000));
		im.sendNextS("You learned the #fSkill/8000.img/skill/80001053/iconMouseOver# #b#q80001053##k skill!", 4);
		im.dispose();
}