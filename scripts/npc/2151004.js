/*
	名字:	傑奇
	地圖:	秘密廣場
	描述:	310010000
*/

function start() {
	cm.sendSimple("What is it?\r\n\r\n#L0##bI want to talk to you.#l");
}

function action(mode, type, selection) {
	if (mode > 0)
		cm.sendNext("Are you still wondering what kind of face is beneath this mask?");
		cm.dispose();
}