/*
    Name:    Angelic
    Map:     Wedding Town
    Description:    680000000
*/

function start() {
	if (cm.getPlayer().getMarriageId() < 1) {
		cm.sendOk("It seems you are not married yet. You want a wedding ring before getting married? You should find a beloved one and get married first, then come back~");
		cm.dispose();
		return;
	}
	cm.sendSimple("Need any help?\r\n#L0##bI want to check the wedding gifts.#l");
}

function action(mode, type, selection) {
	if (mode > 0)
		cm.sendOk("It seems your wedding gift has just been taken!");
	cm.dispose();
}
