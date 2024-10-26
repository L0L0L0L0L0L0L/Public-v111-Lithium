/*
	名字:	新葉城
	地圖:	新葉城-市區中心
	描述:	600000000
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case - 1:
		ms.dispose();
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
		if (ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28745)).getStatus() != 1 || ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28745)).getCustomData() == 1) {
			ms.dispose();
			return;
			}
			ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28745)).setCustomData(1);
			ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(1));
			ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.trembleEffect(0, 500));
			ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 2000));
			break;
	case 1:
		ms.sendNextS("Holy Cygnus! This town is a werck! I better find the mayor .....and maybe a janitor.", 3);
		break;
	case 2:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.trembleEffect(0, 500));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg1/3", 1000, 0, -100, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg1/4", 1000, 100, -100, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg1/4", 1000, 300, -100, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg1/4", 1000, 460, -90, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 3:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.trembleEffect(0, 500));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Skill/2216.img/skill/22161001/hit/0", 1000, 100, 0, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Skill/2216.img/skill/22161001/hit/0", 1000, 200, 0, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Skill/2216.img/skill/22161001/hit/0", 1000, 300, 0, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Skill/2216.img/skill/22161001/hit/0", 1000, 400, 0, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Skill/2216.img/skill/22161001/hit/0", 1000, 500, 0, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Skill/2216.img/skill/22161001/hit/0", 1000, 600, 0, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Skill/2216.img/skill/22161001/hit/0", 1000, -100, 0, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Skill/2216.img/skill/22161001/hit/0", 1000, -200, 0, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Skill/2216.img/skill/22161001/hit/0", 1000, -300, 0, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Skill/2216.img/skill/22161001/hit/0", 1000, -400, 0, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Skill/2216.img/skill/22161001/hit/0", 1000, -500, 0, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Skill/2216.img/skill/22161001/hit/0", 1000, -600, 0, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 4:
		ms.sendNextS("Yikes! The earth keeps on quaking!", 3);
		break;
	case 5:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(0));
		ms.dispose();
}
}