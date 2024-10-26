/*
	名字:	桃花仙境
	地圖:	妖怪之林2
	描述:	250010504
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(925000000), pi.getMap(925000000).getPortal(2)); //喵怪仙人的領域
	return true;
}