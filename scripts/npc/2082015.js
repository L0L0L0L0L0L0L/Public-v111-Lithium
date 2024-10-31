function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else if (mode == 0) {
        cm.dispose();
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
			Check = cm.getPlayer().CheckBurning();
            cm.sendSimple("Oh! Hello im in charge of the burning system.\r\nI can help you become stronger!#n#k\r\n\r\n#L0# I would love the help!#l\r\n#L1#No, I fine on my own!#l");
        } else if (status == 1) {
            if (selection == 0) {
				if(Check == 0) {
                cm.sendOk("You have been #e#bburned#k#n\r\nYou have the ability to gain a extra level per level up! \r\nBut It will only last #r#euntil level 120!");
				cm.getPlayer().setburning(1);
                cm.dispose();
				}
				if(Check == 1 || cm.getPlayer().getLevel() >= 120) {
				cm.sendOk("Sorry but you are not ready! \r\nOr your level is higher than 120!");
				cm.dispose();
				}
            } else if (selection == 1) {
                cm.sendOk("Well then! I am available if you wanted a boost");
                cm.dispose();
        }
    }
}
}