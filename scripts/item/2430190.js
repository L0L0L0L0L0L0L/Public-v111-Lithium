/*
	名字:	藍色速克達60日使用券
	地圖:	藍色速克達60日使用券
	描述:	騎乘技能
*/

function start() {
	if (im.getPlayer().getSkillLevel(80001021) > 0) {
		im.sendOkS("You already learned the #fSkill/8000.img/skill/80001021/iconMouseOver# #b#q80001021##k skill. You can relearn it once the skill expires.", 4);
		im.dispose();
		return;
		}
		im.gainItem(2430190, -1);
		im.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(80001021), 1, 1, im.getCurrentTime() + (60 * 24 * 60 * 60 * 1000));
		im.sendNextS("You learned the #fSkill/8000.img/skill/80001021/iconMouseOver# #b#q80001021##k skill!", 4);
		im.dispose();
}