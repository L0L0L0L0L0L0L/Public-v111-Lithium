/*
	名字:	薑餅人
	地圖:	魔女之塔3樓
	描述:	980041200
*/

function start() {
              cm.sendSimple("哇，我一路爬到了頂樓！ \n\r #L0##b我想離開這裡#k#l");
}

function action(mode, type, selection) {
	if (mode == 1)
		cm.warp(980040000, 0);
		cm.dispose();
}