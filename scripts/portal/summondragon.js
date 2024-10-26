/*
	名字:	神木村
	地圖:	九靈龍巢穴
	描述:	240040611
*/

function enter(pi) {
	if (pi.getPlayer().itemQuantity(4001094) && pi.getPlayer().getMap().getReactorByName("dragonBaby").getState() < 1) {
		pi.getPlayer().getMap().getReactorByName("dragonBaby").forceHitReactor(1);
		pi.gainItem(4001094, -1);
		}
		return false;
}