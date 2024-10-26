/*
	名字:	裴爾
	地圖:	秘密廣場
	描述:	310010000
*/

function start() {
	cm.sendSimple("What is it?\r\n\r\n#L0##bI want to talk to you.#l");
}

function action(mode, type, selection) {
	if (mode > 0)
		cm.sendNext("Hmm...you want to talk? All right. l love animals, you know ...especially cats. They're just so elegant and graceful.");
		cm.dispose();
}