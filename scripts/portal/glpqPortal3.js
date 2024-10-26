/*
	名字:	組隊任務
	地圖:	敏捷的測試
	描述:	610030300
*/

function enter(pi) {
	var nun = pi.getPlayer().getMap().getReactorByName("3skill0").getState() + pi.getPlayer().getMap().getReactorByName("3skill1").getState() + pi.getPlayer().getMap().getReactorByName("3skill2").getState() + pi.getPlayer().getMap().getReactorByName("3skill3").getState() + pi.getPlayer().getMap().getReactorByName("3skill4").getState();
	if (nun > 4) {
		pi.getPlayer().changeMap(pi.getMap(610030400), pi.getMap(610030400).getPortal(0)); //機智的測試
		}
		return false;
}