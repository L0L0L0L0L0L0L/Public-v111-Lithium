/*
	名字:	可可島
	地圖:	火箭發射
	描述:	912060300
*/

function start() {
	ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(1));//锁屏带黑色边框播放部分特效和角色动作

	ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction4.img/effect/cannonshooter/balloon/0", 5000, 0, 0, 1));//播放时间、X坐标、Y坐标
	ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction4.img/effect/cannonshooter/balloon/1", 5000, 0, 0, 1));
	ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction4.img/effect/cannonshooter/balloon/2", 5000, 0, 0, 1));

	ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction4.img/cannonshooter/face04"));
	ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction4.img/cannonshooter/out01"));

	ms.dispose();
}