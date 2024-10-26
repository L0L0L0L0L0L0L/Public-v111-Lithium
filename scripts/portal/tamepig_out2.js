/*
	名字:	隱藏地圖
	地圖:	飼育室通道
	描述:	923010100
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(230000003), pi.getMap(230000003).getPortal(3)); //動物園
	return true;
}