importPackage(Packages.tools);
importPackage(Packages.constants);
importPackage(Packages.handling.channel.handler);

var miracleCube = 5062000;
var premiumCube = 5062001;
var superCube = 5062002;
var selectedOption;
var slot = [];
var inv;
var selectedItem;
var itemId = -1;
var status;
var selectedCube;

function getCubeFragment(cube) {
    const fragments = {
        5062000: 2430112,
        5062001: 2430112,
        5062002: 2430481
    };

    return fragments[cube];
}

function getCubeType(cube) {
    const types = {
        5062000: 0,
        5062001: 1,
        5062002: 2
    }

    return types[cube];
}

function getPotentialName(itemId, pot) {
    return GameConstants.resolvePotentialID(itemId, pot);
}

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }

    if (status == 0) {
        cm.sendNext("Hello! I'm here to help you with #rcubing#k. \r\n#L100#I want to Cube!#l");
    } else if (status == 1) {
        selectedOption = selection;

        if (selectedOption == 100) {
            inv = cm.getInventory(1);
            var canCube = false;
            var selStr = "The following items are eligible for cubing:\r\n\r\n#b";

            slot = [];
            for (var i = 0; i < inv.getSlotLimit(); i++) {
                var it = inv.getItem(i);
                if (it == null || it.getPotential1() == 0 || it.getPotential2() == 0) {
                    continue;
                }

                itemId = it.getItemId();
                slot.push(i); // Store valid slot index
                canCube = true;
                selStr += "#L" + (slot.length - 1) + "##v" + itemId + "##t" + itemId + "##l\r\n";
            }

            if (!canCube) {
                cm.sendOk("You don't have any equipment with two or more potential lines on them.");
                cm.dispose();
                return;
            }

            cm.sendSimple(selStr + "#k");

        } else if (selectedOption == 102) {
            cm.getPlayer().fakeRelog();
            cm.sendOk("Inventory refreshed.");
            cm.dispose();
            return;
        } else {
            cm.dispose();
            return;
        }
    } else if (status == 2) {
        var selectedSlot = slot[selection];
        selectedItem = inv.getItem(selectedSlot);
        itemId = selectedItem.getItemId();

        if (selectedItem == null) {
            cm.sendOk("The selected item could not be found.");
            cm.dispose();
            return;
        }

        var availableCubes = "";
        if (cm.haveItem(miracleCube, 1)) {
            availableCubes += "#L1##v" + miracleCube + "# Miracle Cube\r\n";
        }
        if (cm.haveItem(premiumCube, 1)) {
            availableCubes += "#L2##v" + premiumCube + "# Premium Miracle Cube\r\n";
        }
        if (cm.haveItem(superCube, 1)) {
            availableCubes += "#L3##v" + superCube + "# Super Miracle Cube\r\n";
        }

        if (availableCubes === "") {
            cm.sendOk("Looks like you don't have any cubes.");
            cm.dispose();
        } else {
            cm.sendSimple("Choose the cube you want to use:\r\n\r\n" + availableCubes);
        }
    } else if (status == 3) {
        // User has selected a cube type
        if (selection == 1 && cm.haveItem(miracleCube, 1)) {
            selectedCube = miracleCube;
        } else if (selection == 2 && cm.haveItem(premiumCube, 1)) {
            selectedCube = premiumCube;
        } else if (selection == 3 && cm.haveItem(superCube, 1)) {
            selectedCube = superCube;
        } else {
            cm.sendOk("You don't have the selected cube.");
            cm.dispose();
            return;
        }

        cube(selectedItem, selectedCube);
        showPotentials();
    } else if (status == 4) {
          if (mode == 1) { // If "Yes" was selected, loop back to continue cubing
              if (!cm.haveItem(selectedCube, 1)) {
                  cm.sendOk("It looks like you don't have any more of the selected cube.");
                  cm.dispose();
                  return;
              }
              // Continue cubing
              cube(selectedItem, selectedCube);
              showPotentials();
              status = 3; // Reset status to keep looping at showPotentials
          } else {
              // User chose to stop cubing
              cm.sendOk("Thank you for cubing. Good luck with your potentials!");
              cm.dispose();
          }
      }
}



function cube(item, cube) {
    var isValid = true;
    var type = getCubeType(cube)
    if (cube == miracleCube) {
        if (item.getState() >= 17 && item.getState() < 20) {
            item.renewPotential(0);
        } else {
            isValid = false;
            cm.sendSimple("You may not use this cube on an legendary item.")
        }

    } else if (cube == premiumCube) {
        if (item.getState() >= 17 && item.getState() < 20) {
            item.renewPotential(1);
        } else {
            isValid = false;
            cm.sendSimple("You may not use this cube on an legendary item.")
        }

    } else {
        item.renewPotential(3);
    }

    if (isValid) {
        cm.gainItem(cube, -1);
        cm.gainItem(getCubeFragment(cube), 1);
        return InventoryHandler.Reveal(item, cm.getClient(), false, type);
    } else {
        cm.dispose();
    }
}

function showPotentials() {
    cm.sendNext("Cubing successful! \r\n\r\n" +
        "1. " + getPotentialName(selectedItem.getItemId(), selectedItem.getPotential1()) + "\r\n" +
        "2. " + getPotentialName(selectedItem.getItemId(), selectedItem.getPotential2()) + "\r\n" +
        "3. " + (selectedItem.getPotential3() ? getPotentialName(selectedItem.getItemId(), selectedItem.getPotential3()) : "None") + "\r\n\r\n" +
        "Do you want to keep going?");
}
