/*
	名字:	飛天直昇機使用券
	地圖:	飛天直昇機使用券
	描述:	騎乘技能
*/

function start() {
	if (im.getPlayer().getSkillLevel(80001077) > 0) {
		im.sendOkS("You already learned the #fSkill/8000.img/skill/80001077/iconMouseOver# #b#q80001077##k skill. You can relearn it once the skill expires.", 4);
		im.dispose();
		return;
		}
		im.gainItem(2430313, -1);
		im.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(80001077), 1, 1, -1);
		im.sendNextS("You learned the #fSkill/8000.img/skill/80001077/iconMouseOver# #b#q80001077##k skill!", 4);
		im.dispose();
}