/*
	名字:	組隊任務
	地圖:	大師秘密房間
	描述:	610030700
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(610030800), pi.getMap(610030800).getPortal(0)); //守護者的城軍械庫
	return true;
}