/*
    Name: Anubis
    Map: Gate to Zakum's Altar
    Description: 211042300
*/

var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    switch (mode) {
    case -1:
        cm.dispose();
        return;
    case 0:
        if (status < 2) {
            cm.dispose();
            return;
        }
        status--;
        break;
    case 1:
        status++;
        break;
    }
    switch (status) {
    case 0:
        var chat = "Traveler, the path ahead is not easily accessible. Inside resides the fearsome #bZakum#k. Only warriors holding the Eye of Fire have the right to enter this area.";
        if (cm.getPlayer().getLevel() > 50) {
            chat += "\r\n#L0#Investigate the Abandoned Mine (Stage 1)";
            chat += "\r\n#L1#Explore Zakum's Training Ground (Stage 2)";
            chat += "\r\n#L2#Synthesize the Eye of Fire (Stage 3)";
        }
        chat += "\r\n#L3#Tell me more about Zakum";
        cm.sendSimple(chat);
        break;
    case 1:
        if (selection == 0) {
            if (cm.getPlayer().getParty() == null) {
                cm.sendOk("Sorry, the monsters inside are very dangerous. I cannot let you go alone.");
                cm.dispose();
                return;
            }
            if (cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
                cm.sendOk("If you wish to undertake this task, please ask your party leader to speak with me.");
                cm.dispose();
                return;
            }
            var chat = "Sorry, your party does not meet the entry requirements. Some members are either ineligible or not on this map.\r\n\r\nNumber of players: 2~6 \r\nLevel range: 50~200 \r\n\r\n";
            var ineligible = 0;
            var party = cm.getPlayer().getParty().getMembers();
            for (var i = 0; i < party.size(); i++)
                if (party.get(i).getLevel() < 50 || party.get(i).getLevel() > 200 || party.get(i).getMapid() != 211042300 || party.size() < 2) {
                    chat += "#bName: " + party.get(i).getName() + " / (Level: " + party.get(i).getLevel() + ") / Map: #m" + party.get(i).getMapid() + "#\r\n\r\n";
                    ineligible++;
                }
            if (ineligible != 0) {
                cm.sendOk(chat);
                cm.dispose();
                return;
            }
            var em = cm.getEventManager("ZakumPQ");
            var prop = em.getProperty("state");
            if (prop == null || prop == 0) {
                em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 200);
                cm.dispose();
                return;
            }
            cm.sendOk("The Abandoned Mine task is currently in progress. Please try another channel.");
        }
        if (selection == 1) {
            if (cm.getPlayer().itemQuantity(4031062)) {
                cm.sendNext("You already have #b#v4031062##t4031062##k, so there is no need to challenge this stage again.");
                cm.dispose();
                return;
            }
            if (!cm.getPlayer().itemQuantity(4031061)) {
                cm.sendOk("Please complete #bInvestigate the Abandoned Mine (Stage 1)#k before challenging (Stage 2).");
                cm.dispose();
                return;
            }
            cm.sendYesNo("Oh! You found the Ore Fragment of Fire, meaning you've completed Stage 1. Next, I will send you to a place filled with traps. Be cautious, as you might not make it out alive.");
        }
        if (selection == 2) {
            if (!(cm.getPlayer().itemQuantity(4031061) && cm.getPlayer().itemQuantity(4031062))) {
                cm.sendOk("To synthesize #b#z4001017##k, you need one each of #b#z4031061##k and #b#z4031062##k.");
                cm.dispose();
                return;
            }
            if (cm.getPlayer().itemQuantity(4000051) < 30) {
                cm.sendOk("Warrior! You have completed all trials, but before creating the Eye of Fire, I need an additional 30 Wolf Tails as a fee. Since the village was destroyed, survival has been difficult, so I must ask for this.");
                cm.dispose();
                return;
            }
            cm.gainItem(4031061, -1);
            cm.gainItem(4031062, -1);
            cm.gainItem(4000051, -30);
            cm.gainItem(4001017, 5);
            cm.sendOk("Warrior! Here is the Eye of Fire. You are now fully qualified to challenge Zakum. May God be with you.");
            cm.dispose();
        }
        if (selection == 3) {
            cm.sendOk("Zakum has existed for a long time. Originally, it was a treant without consciousness, but it gained form through the emotions of the residents of the lava region. The village was filled with darkness, flames, and desires... Over the years, the dark and sinister nature of the people there was fully passed onto Zakum.");
            cm.dispose();
        }
        select = selection;
        break;
    case 2:
        if (select == 1) {
            if (cm.getMap(280020000).getCharacters().size() < 1) {
                cm.getMap(280020000).resetFully();
                cm.getPlayer().changeMap(cm.getMap(280020000), cm.getMap(280020000).getPortal(0));
                cm.getPlayer().startMapTimeLimitTask(600, cm.getMap(211042300));
                cm.dispose();
                return;
            }
            cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "The volcanic path is currently crowded. Please try again later."));
        }
        cm.dispose();
    }
}
