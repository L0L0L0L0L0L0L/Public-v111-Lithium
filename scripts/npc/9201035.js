/*
    Name:    Jake
    Map:     Wedding Town
    Description:    680000000
*/

function start() {
	if (cm.getPlayer().getMarriageId() < 1) {
		cm.sendOk("It seems you are not married yet. Want a wedding ring before getting married? You should find a beloved one and get married first, then come back~");
		cm.dispose();
		return;
	}
	cm.sendSimple("Hello there~ I can smell the sweet scent of newlyweds~ Oh, you’re still wearing an engagement ring? After marriage, you need to wear a beautiful wedding ring! If you’d like, I can help you with the change. What do you think?\r\n#L0##bChange the engagement ring to a wedding ring.#l");
}

function action(mode, type, selection) {
	if (mode > 0)
		cm.sendOk("Wedding rings can also be equipped, make sure to give it a try~");
	cm.dispose();
}
