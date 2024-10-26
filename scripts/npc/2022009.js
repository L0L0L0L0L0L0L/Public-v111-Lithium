/*
	名字:	邪摩斯
	地圖:	冰雪峽谷1
	描述:	921120005
*/

function start() {
	if (cm.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		cm.sendOk("由於怪物的阻擋，我們無法通過傳送點繼續前進。");
		cm.dispose();
		return;
		}
		cm.sendOk("通過前面的秘密通道，我們將進入更危險的區域，請一定要確保我的安全。");
		cm.dispose();
}