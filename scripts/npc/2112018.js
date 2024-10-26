/*
	名字:	羅密歐和茱麗葉
	地圖:	羅密歐和茱麗葉
	描述:	926100600
*/

function start() {
	var em = cm.getEventManager(cm.getMapId() == 926100600 ? "Romeo" : "Juliet");
	if (em != null) {
		var itemid = cm.getMapId() == 926100600 ? 4001160 : 4001159;
	if (!cm.canHold(itemid, 1)) {
		cm.sendOk("Your backpack space is insufficient");
		cm.dispose();
		return;
		}
		cm.gainItem(itemid, 1);
	if (em.getProperty("stage").equals("2")) {
    		cm.gainExpR(280000);
	} else {
		cm.gainExpR(210000);
		}
		}
		cm.addTrait("will", 25);
		cm.addTrait("sense", 1);
		map = cm.getMapId() == 926100600 ? 926100700 : 926110700;
		cm.getPlayer().changeMap(cm.getMap(map), cm.getMap(map).getPortal(0));
		cm.dispose();
}