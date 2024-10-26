/*
	名字:	倉庫之地 庫保
	地圖:	機庫
	描述:	221000200
*/

function start() {
	cm.getPlayer().getStorage().sendStorage(cm.getClient(), 2050004);
	cm.dispose();
}