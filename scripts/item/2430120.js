/*
	名字:	一角獸使用券(1年)
	地圖:	一角獸使用券(1年)
	描述:	騎乘技能
*/

function start() {
	if (im.getPlayer().getSkillLevel(80001046) > 0) {
		im.sendOkS("You already learned the #fSkill/8000.img/skill/80001046/iconMouseOver# #b#q80001046##k skill. You can relearn it once the skill expires.", 4);
		im.dispose();
		return;
		}
		im.gainItem(2430120, -1);
		im.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(80001046), 1, 1, im.getCurrentTime() + (365 * 24 * 60 * 60 * 1000));
		im.sendNextS("You learned the #fSkill/8000.img/skill/80001046/iconMouseOver# #b#q80001046##k skill!", 4);
		im.dispose();
}