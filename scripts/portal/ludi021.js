/*
	名字:	隱藏地圖
	地圖:	秘密通道
	描述:	922000009
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(220030400), pi.getMap(220030400).getPortal(0)); //玩具工廠&amp;lt;B工程4&gt;
	return true;
}