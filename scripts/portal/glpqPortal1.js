/*
	名字:	組隊任務
	地圖:	被遺忘的儲蓄室
	描述:	610030200
*/

function enter(pi) {
	var nun = pi.getPlayer().getMap().getReactorByName("2skill0").getState() + pi.getPlayer().getMap().getReactorByName("2skill1").getState() + pi.getPlayer().getMap().getReactorByName("2skill2").getState() + pi.getPlayer().getMap().getReactorByName("2skill3").getState() + pi.getPlayer().getMap().getReactorByName("2skill4").getState();
	if (nun > 4) {
		pi.getPlayer().changeMap(pi.getMap(610030300), pi.getMap(610030300).getPortal(0)); //敏捷的測試
		}
		return false;
}