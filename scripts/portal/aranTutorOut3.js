/*
	名字:	黑路
	地圖:	燃燒的森林2
	描述:	914000210
*/

function enter(pi) {
	pi.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(20000016), 1, 1, -1);
	pi.getPlayer().changeMap(pi.getMap(914000220), pi.getMap(914000220).getPortal(1));
	return true;
}