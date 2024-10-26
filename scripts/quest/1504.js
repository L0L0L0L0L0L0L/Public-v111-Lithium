/*
	名字:	危險的警告
	地圖:	赫麗娜的弓箭手教育園
	描述:	910090000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
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
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(1));
		qm.sendNextS("If you remember #p1090000#'s story of the Seven Commanders, then you know what danger this could bode. I just don't understand how Guwaru's mark could be present in this day and age. What could it mean?", 1);
		break;
	case 1:
		qm.sendNextPrevS("I pray that our fears are overblown. This may only be a relic from a time long passed, but we cannot afford to ignore it. If the Black Mage is truly nearing his resurrection, we are in grave danger.", 1);
		break;
	case 2:
		qm.sendNextPrevS("I believe it would be best to purify this relic to remove the dark aura that surrounds it. Cover your eyes well when I perform the ritual, the light would burn out your retinas in less than a second. Are you ready?", 1);
		break;
	case 3:
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(0));
		var tick = 0;
		schedule = Packages.server.Timer.EtcTimer.getInstance().register(function () {
		if (tick == 1) {
			Packages.server.quest.MapleQuest.getInstance(1504).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("demonSlayer/whiteOut", 3));
			qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction5.img/unitedMaple/Quest1504"));
			schedule.cancel(true);
			qm.dispose();
			return;
			}
			tick++;
		}, 2000);
}
}

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
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
		qm.sendNext("As I feared. this symbol is a warning from Guwaru. The Black Mage is returning to Maple World!");
		break;
	case 1:
		Packages.server.quest.MapleQuest.getInstance(1504).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getPlayer().changeMap(qm.getMap(100000201), qm.getMap(100000201).getPortal(2));
		qm.dispose();
}
}