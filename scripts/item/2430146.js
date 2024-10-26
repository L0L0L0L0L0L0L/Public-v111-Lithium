/*
	名字:	Mothership 1-Year Coupon
	地圖:	Mothership 1-Year Coupon
	描述:	騎乘技能
*/

function start() {
	if (im.getPlayer().getSkillLevel(80001052) > 0) {
		im.sendOkS("You already learned the #fSkill/8000.img/skill/80001052/iconMouseOver# #b#q80001052##k skill. You can relearn it once the skill expires.", 4);
		im.dispose();
		return;
		}
		im.gainItem(2430146, -1);
		im.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(80001052), 1, 1, im.getCurrentTime() + (365 * 24 * 60 * 60 * 1000));
		im.sendNextS("You learned the #fSkill/8000.img/skill/80001052/iconMouseOver# #b#q80001052##k skill!", 4);
		im.dispose();
}