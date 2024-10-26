/*
	名字:	隱藏地圖
	地圖:	狂狼勇士系列動畫
	描述:	914090010
*/

function start() {
	switch (ms.getPlayer().getMap().getId()) {
	case 914090000:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroLock(1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction1.img/aranDirection/Scene0"));
		break;
	case 914090001:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroLock(1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction1.img/aranDirection/Scene1" + (ms.getPlayer().getGender() == 0 ? "0" : "1")));
		break;
	case 914090002:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction1.img/aranDirection/Scene2" + (ms.getPlayer().getGender() == 0 ? "0" : "1")));
		break;
	case 914090004:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction1.img/aranDirection/Scene4"));
		break;
	case 914090005:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction1.img/aranDirection/Scene5"));
		break;
	case 914090006:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction1.img/aranDirection/Scene6"));
		break;
	case 914090007:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroLock(0));
		ms.getPlayer().changeMap(ms.getMap(914000000), ms.getMap(914000000).getPortal(0));
		break;
	case 914090010:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroLock(1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction1.img/aranTutorial/Scene0"));
		break;
	case 914090011:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction1.img/aranTutorial/Scene1" + (ms.getPlayer().getGender() == 0 ? "0" : "1")));
		break;
	case 914090012:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction1.img/aranTutorial/Scene2" + (ms.getPlayer().getGender() == 0 ? "0" : "1")));
		break;
	case 914090013:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction1.img/aranTutorial/Scene3"));
		break;
	case 914090100:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroLock(1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction1.img/aranTutorial/HandedPoleArm" + (ms.getPlayer().getGender() == 0 ? "0" : "1")));
		break;
	case 914090200:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroLock(1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction1.img/aranTutorial/Maha"));
		break;
	case 914090201:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroLock(1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction1.img/aranTutorial/PoleArm"));
		}
		ms.dispose();
}