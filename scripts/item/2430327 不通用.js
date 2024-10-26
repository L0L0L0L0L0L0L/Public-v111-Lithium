/*
	名字:	柏青哥機器使用券
	地圖:	柏青哥機器使用券
	描述:	騎乘技能
*/

function start() {
	y = im.getPlayer().getJob();
	if (im.getPlayer().getSkillLevel(y < 1000 ? 1130 : y < 2000 ? 10001130 : y < 2200 ? 20001130 : y < 2300 ? 20011130 : 30001130) > 0) {
		im.sendOkS("You already learned the #fSkill/8000.img/skill/20011130/iconMouseOver# #b#q20011130##k skill. You can relearn it once the skill expires.", 4);
		im.dispose();
		return;
		}
		im.gainItem(2430327, -1);
		im.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(y < 1000 ? 1130 : y < 2000 ? 10001130 : y < 2200 ? 20001130 : y < 2300 ? 20011130 : 30001130), 1, 1, -1);
		im.sendNextS("You learned the #fSkill/8000.img/skill/20011130/iconMouseOver# #b#q20011130##k skill!", 4);
		im.dispose();
}