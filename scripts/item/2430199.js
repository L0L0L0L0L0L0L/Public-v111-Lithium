/*
	名字:	聖誕雪橇12小時使用券
	地圖:	聖誕雪橇12小時使用券
	描述:	騎乘技能
*/

function start() {
	if (im.getPlayer().getSkillLevel(80001022) > 0) {
		im.sendOkS("You already learned the #fSkill/8000.img/skill/80001022/iconMouseOver# #b#q80001022##k skill. You can relearn it once the skill expires.", 4);
		im.dispose();
		return;
		}
		im.gainItem(2430199, -1);
		im.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(80001022), 1, 1, im.getCurrentTime() + (1 * 12 * 60 * 60 * 1000));
		im.sendNextS("You learned the #fSkill/8000.img/skill/80001022/iconMouseOver# #b#q80001022##k skill!", 4);
		im.dispose();
}