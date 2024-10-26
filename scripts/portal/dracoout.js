/*
	名字:	神木村
	地圖:	碼頭&amp;lt;前往天空之城&gt;
	描述:	240000110
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(240000100), pi.getMap(240000100).getPortal(2)); //神木村售票處
	return true;
}