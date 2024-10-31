var status = 0;
var item = [
    [4031912, 4031825, 4031911, 4031829, 4031908, 4031824, 4031827, 4031907, 2070006],
    [250, 200, 325, 175, 200, 325, 175, 225, 150]
];
var sel;

function start() {
    var currentPoints = cm.getPlayer().getBPoints();
    cm.sendNext("Hello! You currently have #b" + currentPoints + "#k Boss points.\r\nDo you want to use some of those points? If you do, I can trade you some items for them!");
}

function action(m, t, s) {
    status++;
    if (m != 1) {
        cm.dispose();
        return;
    }
    if (status == 1) {
        var talk = "Which item would you like to buy?#b";
        for (var i = 0; i < item[0].length; i++) {
            talk += "\r\n\t#L" + i + "##v" + item[0][i] + "##t" + item[0][i] + "##l";
        }
        cm.sendSimple(talk);
    } else if (status == 2) {
        sel = s;
        cm.sendYesNo("Would you like to buy 1 #b#t" + item[0][sel] + "##k for #r" + item[1][sel] + " points#?");
    } else if (status == 3) {
        if (cm.getPlayer().getBPoints() >= item[1][sel]) {
            cm.sendOk("Enjoy your #b#t" + item[0][sel] + "##k! Remember to run Boss Expeditions more often to earn more points for exclusive deals!");
            cm.gainItem(item[0][sel], 1);
            cm.getPlayer().setBPoints(cm.getPlayer().getBPoints() - item[1][sel]);

            cm.sendNext("Would you like to buy something else?");
            status = 1;
        } else {
            var percent = Math.ceil(cm.getPlayer().getBPoints() / item[1][sel] * 100);
            cm.sendOk("You only have #b" + cm.getPlayer().getBPoints() + " points#k. You need #r" + item[1][sel] + " points#k to buy a #b#t" + item[0][sel] + "##k!\r\n\r\n#ePercent of points collected (rounded): \r\n#B" + percent + "#\r\n\r\nYou're just #r" + (item[1][sel] - cm.getPlayer().getBPoints()) + " points#k away!");
            status = 1;
        }
        cm.dispose();
    }
}

