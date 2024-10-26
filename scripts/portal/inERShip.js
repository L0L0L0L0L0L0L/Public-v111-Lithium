/*
	名字:	砲台路
	地圖:	維多利亞樹木站台
	描述:	104020100
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(104020120), pi.getMap(104020120).getPortal(2)); //前往耶雷弗的站台
	return true;
}