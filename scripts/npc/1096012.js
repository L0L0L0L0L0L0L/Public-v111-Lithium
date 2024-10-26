/*
	名字:	斯托納
	地圖:	火箭出發
	描述:	912060200
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case -1:
		cm.dispose();
		return;
	case 0:
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		cm.sendNextS("All right Let's go!", 1);
		break;
	case 1:
		cm.getPlayer().getMap().hideNpc(1096012);
		//cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(0, 372));//角色隱身
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("cannonshooter/fire", 4));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction4.img/effect/cannonshooter/flying/0", 0, 0, 0, 0));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction4.img/effect/cannonshooter/flying1/0", 2000, 0, -100, 0));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 800));
		break;
	case 2:
		cm.dispose();
		cm.getPlayer().changeMap(cm.getMap(912060300), cm.getMap(912060300).getPortal(0));
}
}