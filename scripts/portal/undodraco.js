/*
	名字:	飛行中
	地圖:	前往時間神殿之路
	描述:	200090500
*/

function enter(pi) {
	pi.cancelItem(2210016); //恢復變龍
	pi.getPlayer().changeMap(pi.getMap(240000110), pi.getMap(240000110).getPortal(2)); //碼頭&amp;lt;前往天空之城&gt;
	return true;
}