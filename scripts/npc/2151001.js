/*
	名字:	赫力泰
	地圖:	秘密廣場
	描述:	310010000
*/

function start() {
	cm.sendSimple("What is it?\r\n\r\n#L0##bI want to talk to you.#l");
}

function action(mode, type, selection) {
	if (mode > 0)
		cm.sendNext("Well... I'm not really that good with words, you see... I'm not the best person to hang around with.");
		cm.dispose();
}