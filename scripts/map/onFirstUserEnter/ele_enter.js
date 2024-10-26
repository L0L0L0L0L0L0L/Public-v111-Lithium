/*
	名字:	外星基地
	地圖:	外星基地电梯
	描述:	610040300
*/

function start() {
	ms.getPlayer().startMapTimeLimitTask(180, ms.getMap(610040810));
	ms.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("Let's find the ID card from the Aliens and activate the computer."));
	ms.dispose();
}