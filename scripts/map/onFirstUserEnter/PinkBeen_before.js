/*
	名字:	神殿深處
	地圖:	神祇的黃昏
	描述:	270050100
*/

function start() {
	ms.getMap(270050100).resetFully();
	ms.getPlayer().getMap().spawnNpc(2141000, new java.awt.Point(-190, -42));
	ms.showNpcSpecialEffect(2141000, "magic");
	var tick = 0;
	schedule = Packages.server.Timer.EtcTimer.getInstance().register(function () {
	if (tick == 1) {
		ms.showNpcSpecialEffect(2141000, "magic");
		schedule.cancel(true);
		ms.dispose();
		return;
		}
		tick++;
	}, 4000);
}