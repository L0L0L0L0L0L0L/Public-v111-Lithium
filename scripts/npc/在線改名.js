/*
    Name:    Maple Island
    Map:     Maple Island
    Description:  Maple Island
*/

importPackage(Packages.client);

var cost = 1000;
var skill = [9101001, 9101002, 9101003, 9101008, 1001003, 1101007, 1101006, 1301006, 1301007, 1121000, 1121002, 2001003, 2001002, 2101001, 2301003, 2321005, 2321004, 4211003, 3121002, 3221006];

function start() {
    var chat = "#dHello #g#e#h ##n#d, would you like to be buffed? \r\n#b#eNote#n: #rEach buff will cost you #k#d#e" + cost + " #n#rmesos.#b";
    for (var i = 0; i < skill.length; i++)
        chat += "\r\n#L" + i + "##s" + skill[i] + "#   -  #q" + skill[i] + "#    [" + cost + " mesos]#l";
    cm.sendSimple(chat);
}

function action(mode, type, selection) {
    if (mode > 0) {
        if (cm.getPlayer().getMeso() < cost) {
            cm.sendOk("You don't have any mesos. You want a free ride? You must be joking.");
            cm.dispose();
            return;
        }
        cm.giveBuff(skill[selection], SkillFactory.getSkill(skill[selection]).getMaxLevel());
        cm.gainMeso(-cost);
        cm.sendOk("#b#eEnjoy!");
    }
    cm.dispose();
}
