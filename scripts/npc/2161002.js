/*
    Name: Luton
    Map: Fourth Tower
    Description: 211060800
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
            status--;
            break;
        case 1:
            status++;
            break;
    }

    var playerMapId = cm.getPlayer().getMap().getId();
    var playerQuest = Packages.server.quest.MapleQuest.getInstance(3139);
    var playerQuestStatus = cm.getPlayer().getQuestNAdd(playerQuest).getStatus();

    if (playerMapId == 211060200) {
        if (playerQuestStatus == 0) {
            switch (status) {
                case 0:
                    cm.sendNext("Oh, it's been a long time since anyone has come into the castle... Adventurer, it's very dangerous here, you should leave quickly.");
                    break;
                case 1:
                    cm.sendNextPrevS("#b...Who...? Is it a ghost???");
                    break;
                case 2:
                    cm.sendNextPrev("Sorry for scaring you. I am Luden, the knight guarding the castle. I died a long time ago but became a ghost and now wander the castle.");
                    break;
                case 3:
                    cm.sendNextPrev("#bWhy are you still here as a ghost? Is there something you need to guard?");
                    break;
                case 4:
                    cm.sendPrev("We can discuss the details later. For now, if you want to pass through this door, you must defeat the evil Red Crocodile Soldiers guarding the First Tower and break the seal. I once saw an excellent locksmith around, please ask him to make you the #v4032832# key for the First Tower.");
                    break;
                case 5:
                    playerQuest.forceStart(cm.getPlayer(), 0, null);
                    cm.dispose();
                    return;
            }
        } else if (playerQuestStatus == 1) {
            if (!cm.getInfoQuest(3139).equals("clear=1;clear=1")) {
                cm.sendOk("To pass through this door, you must obtain the First Tower key and defeat all the monsters in the tower to break the seal.");
                cm.dispose();
                return;
            }
            switch (status) {
                case 0:
                    cm.sendNext("You have broken the first seal. You seem stronger than I imagined, but you need to break two more seals to reach my location. It's not too late to turn back, what do you say?");
                    break;
                case 1:
                    cm.sendNextPrevS("#bHearing that makes me even more determined. Wait for me, I will be right there.");
                    break;
                case 2:
                    cm.sendPrev("Then I wish you victory. I hope you can defeat those evil beings.");
                    break;
                case 3:
                    playerQuest.forceComplete(cm.getPlayer(), 0);
                    cm.gainItem(4032832, -1);
                    cm.dispose();
                    return;
            }
        }
    } else if (playerMapId == 211060400) {
        var secondTowerQuest = Packages.server.quest.MapleQuest.getInstance(3140);
        var secondTowerQuestStatus = cm.getPlayer().getQuestNAdd(secondTowerQuest).getStatus();

        if (secondTowerQuestStatus == 0) {
            switch (status) {
                case 0:
                    cm.sendNext("You've reached the second checkpoint quickly. To proceed, you must defeat the #rGuardian Boar#k in the Second Tower to break the second seal.");
                    break;
                case 1:
                    cm.sendNextPrev("Guardian Boar... The name sounds like a wild boar?");
                    break;
                case 2:
                    cm.sendPrev("Yes, just like the name, it is a vicious and terrifying monster resembling a wild boar. Find the locksmith from before; he will make you the key for the Second Tower #v4032833#. Please go find him.");
                    break;
                case 3:
                    secondTowerQuest.forceStart(cm.getPlayer(), 0, null);
                    cm.dispose();
                    return;
            }
        } else if (secondTowerQuestStatus == 1) {
            if (!cm.getInfoQuest(3140).equals("clear=1;clear=1")) {
                cm.sendOk("To pass through this door, you need to obtain the Second Tower key and defeat all the #rGuardian Boars#k.");
                cm.dispose();
                return;
            }
            switch (status) {
                case 0:
                    cm.sendNext("The Guardian Boars have been defeated. To break the final seal, you will face even more dangerous challenges, but I believe you can do it.");
                    break;
                case 1:
                    cm.sendNextPrevS("#bYes, I will go find you immediately. Please wait for me.");
                    break;
                case 2:
                    cm.sendPrev("I will wait for you at the third seal. Please be careful...");
                    break;
                case 3:
                    secondTowerQuest.forceComplete(cm.getPlayer(), 0);
                    cm.gainItem(4032833, -1);
                    cm.dispose();
                    return;
            }
        }
    } else if (playerMapId == 211060600) {
        var thirdTowerQuest = Packages.server.quest.MapleQuest.getInstance(3141);
        var thirdTowerQuestStatus = cm.getPlayer().getQuestNAdd(thirdTowerQuest).getStatus();

        if (thirdTowerQuestStatus == 0) {
            switch (status) {
                case 0:
                    cm.sendNext("Finally, the last challenge. The Guardian Laino of the Third Tower is more vicious than the other monsters wandering in the castle.");
                    break;
                case 1:
                    cm.sendNextPrevS("#bIf I defeat them all, I can break the seal?");
                    break;
                case 2:
                    cm.sendNextPrev("Yes, though you have done well so far, you must not let your guard down this time.");
                    break;
                case 3:
                    cm.sendPrev("Don't worry. Go get the key #v4032834##t4032834# from the locksmith Jan and break the third seal.");
                    break;
                case 4:
                    thirdTowerQuest.forceStart(cm.getPlayer(), 0, null);
                    cm.dispose();
                    return;
            }
        } else if (thirdTowerQuestStatus == 1 && cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3167)).getStatus() != 2) {
            switch (status) {
                case 0:
                    if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3167)).getStatus() == 0) {
                        cm.sendOk("To pass through this door, you need to obtain #v4032834# and defeat all the #rGuardians Laino#k in the Third Tower.");
                        cm.dispose();
                        return;
                    }
                    cm.sendNextS("Luton, to obtain the key for the Third Tower, you must defeat Belvufu. But he cannot be found. What should we do?", 3);
                    break;
                case 1:
                    cm.sendNextPrev("Hmm... Belvufu is a monster found in the map under the city walls after passing through the door. I will temporarily weaken the seal's power. Take this opportunity to gather information about the key.");
                    break;
                case 2:
                    cm.getPlayer().changeMap(cm.getMap(211060700), cm.getMap(211060700).getPortal(1));
                    cm.dispose();
                    return;
            }
        } else if (thirdTowerQuestStatus == 1 && cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3167)).getStatus() == 2) {
            switch (status) {
                case 0:
                    if (!cm.getInfoQuest(3141).equals("clear=1;clear=1")) {
                        cm.sendOk("To pass through this door, you need to obtain #v4032834# and defeat all the #rGuardians Laino#k in the Third Tower.");
                        cm.dispose();
                        return;
                    }
                    cm.sendNext("You really... broke the third seal? After a long wait, the path to the Loyal Vow is finally open.");
                    break;
                case 1:
                    cm.sendNextPrevS("#bLoyal Vow... Are you referring to the Lion King?");
                    break;
                case 2:
                    cm.sendNextPrev("I will wait for you at the third seal. Please be careful...");
                    break;
                case 3:
                    cm.sendPrev("I am in the Fourth Tower. There are no more seals blocking you now. Please come and find me. Be careful of the monsters on the way. I hope to see you soon...");
                    break;
                case 4:
                    thirdTowerQuest.forceComplete(cm.getPlayer(), 0);
                    cm.gainItem(4032834, -1);
                    cm.dispose();
            }
        }
    }
}
