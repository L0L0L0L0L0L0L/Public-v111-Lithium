/*
	名字:	貓熊使用券(1年)
	地圖:	貓熊使用券(1年)
	描述:	騎乘技能
*/

function start() {
	if (im.getPlayer().getSkillLevel(80001112) > 0) {
		im.sendOkS("You already learned the #fSkill/8000.img/skill/80001112/iconMouseOver# #b#q80001112##k skill. You can relearn it once the skill expires.", 4);
		im.dispose();
		return;
		}
		im.gainItem(2430688, -1);
		im.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(80001112), 1, 1, im.getCurrentTime() + (365 * 24 * 60 * 60 * 1000));
		im.sendNextS("You learned the #fSkill/8000.img/skill/80001112/iconMouseOver# #b#q80001112##k skill!", 4);
		im.dispose();
}