/*
	名字:	傑克
	地圖:	上層走廊
	描述:	120000100
*/

function start() {
	cm.sendSimple("You're trying to discard the Dirty Treasure Map or Eggs? Well, you've come to the right place. \r\n\r\n#b#L0#I want to discard the Dirty Treasure Map.#l\r\n#L1#I want to discard the Eggs.#l");
}

function action(mode,type,selection) {
	if (mode > 0) {
		if (selection < 1) {
			cm.sendOk("Hmm... What is it? I'm the person that discards the Dirty Treasure Maps, but you don't seem to have the Dirty Treasure Map.");
			cm.dispose();
			return;
			}
			cm.sendOk("Hmm... What is it? I'm the person that discards the Eggs, but you don't seem to have the Egg.");
			}
			cm.dispose();
}