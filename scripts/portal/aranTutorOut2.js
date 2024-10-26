/*
	名字:	黑路
	地圖:	燃燒的森林1
	描述:	914000200
*/

function enter(pi) {
	pi.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(20000014), 1, 1, -1);
	pi.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(20000015), 1, 1, -1);
	pi.getPlayer().changeMap(pi.getMap(914000210), pi.getMap(914000210).getPortal(1)); //燃燒的森林2
	return true;
}