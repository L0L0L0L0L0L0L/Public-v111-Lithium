/*
	名字:	退休的龍訓練師
	地圖:	碼頭&amp;lt;前往天空之城&gt;
	描述:	240000110
*/

function start() {
	cm.sendSimple("If you had wings, I'm sure you could go there. But, that alone won't be enough. If you want to fly though the wind that's sharper than a blade, you'll need tough scales as well. I'm the only Halfling left that knows the way back... If you want to go there, l can transform you. No matter what you are, for this moment, you will become a #bDragon#k... \r\n#L0##bI want to become a dragon.#l");
}

function action(mode, type, selection) {
	if (mode > 0) {
		cm.getPlayer().changeMap(cm.getMap(200090500), cm.getMap(200090500).getPortal(5));
		cm.useItem(2210016);
		}
		cm.dispose();
}