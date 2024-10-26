/*
	名字:	神木村
	地圖:	生命之穴入口
	描述:	240040700
*/

function enter(pi) {
	if (pi.getMorphState() == 2210003) { //判斷BUFF狀態
		pi.cancelItem(2210003);
		}
		pi.getPlayer().changeMap(pi.getMap(240040600), pi.getMap(240040600).getPortal(4)); //主巢穴山峰
		return true;
}