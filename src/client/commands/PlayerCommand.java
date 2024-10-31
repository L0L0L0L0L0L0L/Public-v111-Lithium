package client.commands;

//import client.MapleInventory;
//import client.MapleInventoryType;
import client.commands.CommandExecute.TradeExecute;
import client.MapleCharacter;
import client.inventory.Item;
import client.inventory.MapleInventoryType;
import constants.ServerConstants.PlayerGMRank;
import client.MapleClient;
import client.MapleStat;
import constants.GameConstants;
import handling.channel.ChannelServer;
import handling.world.World;
import scripting.NPCScriptManager;
import server.MapleItemInformationProvider;
import server.maps.FieldLimitType;


import server.maps.MapleMap;
import server.maps.SavedLocationType;
import tools.FileoutputUtil;
import tools.StringUtil;
import tools.packet.MaplePacketCreator;

/**
 *
 * @author Emilyx3
 */
public class PlayerCommand {

    public static class dispose extends CommandExecute {

        public int execute(MapleClient c, String[] splitted) {
            c.removeClickedNPC();
            NPCScriptManager.getInstance().dispose(c);
            c.getSession().write(MaplePacketCreator.enableActions());
            return 1;
        }
    }

    public static class transfer extends CommandExecute {

        public int execute(MapleClient c, String[] splitted) {
            NPCScriptManager.getInstance().start(c, 1012000);
            return 1;
        }
    }

    public static class Expedition extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (c.getPlayer().getMapId() == 280030000 || c.getPlayer().getMapId() == 280030001 || //자쿰맵
                    c.getPlayer().getMapId() == 240060200 || c.getPlayer().getMapId() == 240060201) //혼테일맵
            {
                MapleCharacter victim = c.getChannelServer().getPlayerStorage().getCharacterByName(splitted[1]);
            /*if (victim.getLevel() < 200) {
                c.getPlayer().dropMessage(6, "You cannot summon characters below level 200.");
                return 0;                
            }*/
                if (victim != null) {
                    if ((c.getPlayer().getGMLevel() < 2 && (victim.isInBlockedMap() || victim.getGMLevel() > 1))) { //GM High level users cannot be summoned
                        c.getPlayer().dropMessage(6, "Please try again.");
                        return 0;
                    }
                    victim.changeMap(c.getPlayer().getMap(), c.getPlayer().getMap().findClosestPortal(c.getPlayer().getTruePosition()));
                } else {
                    int ch = World.Find.findChannel(splitted[1]);
                    if (ch < 0) { //Channel error
                        c.getPlayer().dropMessage(6, "Please try again.");
                        return 0;
                    }
                    victim = ChannelServer.getInstance(ch).getPlayerStorage().getCharacterByName(splitted[1]);
                    if (victim == null || (c.getPlayer().getGMLevel() < 2 && (victim.isInBlockedMap() || victim.getGMLevel() > 1))) { //GM High level users cannot be summoned
                        c.getPlayer().dropMessage(6, "Please try again.");
                        return 0;
                    }
                    c.getPlayer().dropMessage(6, "The user is moving channels.");
                    victim.dropMessage(6, "Moving channels.");
                    if (victim.getMapId() != c.getPlayer().getMapId()) {
                        final MapleMap mapp = victim.getClient().getChannelServer().getMapFactory().getMap(c.getPlayer().getMapId());
                        victim.changeMap(mapp, mapp.findClosestPortal(c.getPlayer().getTruePosition()));
                    }
                    victim.changeChannel(c.getChannel());
                    c.getPlayer().dropMessage(6, splitted[1] + "Summons a user.");
                }
            } else {
                c.getPlayer().dropMessage(6, "You cannot summon outside of the boss map.");
                return 0;
            }
            return 1;
        }
    }

    public static class Recruit extends CommandExecute {
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(6, "Please specify the quest or expedition. Example:");
                c.getPlayer().dropMessage(6, "kpq (Kerning Party Quest)");
                c.getPlayer().dropMessage(6, "lpq (Ludibrium Party Quest)");
                c.getPlayer().dropMessage(6, "opq (Orbis Party Quest)");
                c.getPlayer().dropMessage(6, "hpq (Henesys Party Quest)");
                c.getPlayer().dropMessage(6, "cpq (Monster Carnival Party Quest)");
                c.getPlayer().dropMessage(6, "rnjpq (Romeo and Juliet Party Quest)");
                c.getPlayer().dropMessage(6, "ppq (Pirate Party Quest)");
                c.getPlayer().dropMessage(6, "zakum (Zakum Expedition)");
                c.getPlayer().dropMessage(6, "guild (Guild Recruitment)");
                c.getPlayer().dropMessage(6, "horntail (Horntail Expedition)");
                c.getPlayer().dropMessage(6, "pinkbean (Pink Bean Expedition)");
                c.getPlayer().dropMessage(6, "empress (Empress Expedition)");
                c.getPlayer().dropMessage(6, "partyhunting (Party Hunting)");
                return 0;
            }

            String type = splitted[1].toLowerCase();
            String eventName = "";
            int minLevel = 0; // minimum level for the event
            int maxLevel = Integer.MAX_VALUE; // maximum level for the event

            switch (type) {
                case "kpq":
                    eventName = "Kerning PQ";
                    minLevel = 21;
                    maxLevel = 30;
                    break;
                case "hpq":
                    eventName = "Henesys PQ";
                    minLevel = 10;
                    maxLevel = 20;
                    break;
                case "cpq":
                    eventName = "Monster Carnival PQ";
                    minLevel = 30;
                    maxLevel = 50;
                    break;
                case "guild":
                    eventName = "Guild Recruitment";
                    break; // no level restriction
                case "rnjpq":
                    eventName = "Romeo and Juliet PQ";
                    minLevel = 70;
                    maxLevel = 120;
                    break;
                case "zakum":
                    eventName = "Zakum Expedition";
                    minLevel = 50;
                    break; // no max level
                case "horntail":
                    eventName = "Horntail Expedition";
                    minLevel = 80;
                    break; // no max level
                case "pinkbean":
                    eventName = "Pink Bean Expedition";
                    minLevel = 120;
                    break; // no max level
                case "empress":
                    eventName = "Empress Raid";
                    minLevel = 170;
                    break; // no max level
                case "lpq":
                    eventName = "Ludibrium PQ";
                    minLevel = 35;
                    maxLevel = 50;
                    break;
                case "opq":
                    eventName = "Orbis PQ";
                    minLevel = 51;
                    maxLevel = 70;
                    break;
                case "partyhunting":
                    eventName = "Party Hunting";
                    break; // no level restriction
                case "ppq":
                    eventName = "Pirate PQ";
                    minLevel = 55;
                    maxLevel = 100;
                    break;
                case "epq":
                    eventName = "Ellin PQ";
                    minLevel = 45;
                    maxLevel = 70;
                    break;
                default:
                    c.getPlayer().dropMessage(6, "Unknown quest or expedition type.");
                    return 0;
            }

            int playerLevel = c.getPlayer().getLevel();
            if (playerLevel < minLevel || playerLevel > maxLevel) {
                c.getPlayer().dropMessage(6, "Your level is not within the required range for " + eventName +
                        ". Required level: " + minLevel + " to " + (maxLevel == Integer.MAX_VALUE ? "No max level" : maxLevel) + ".");
                return 0;
            }

            World.Broadcast.broadcastMessage(MaplePacketCreator.serverNotice(6,
                    " [Recruiting] " + c.getPlayer().getName() + " is looking for members to join " + eventName + " on [Channel " + c.getChannel() + "]"));

            return 1;
        }
    }

    public static class commands extends CommandExecute {

        public int execute(MapleClient c, String[] splitted) {
            c.getPlayer().dropMessage(5, "@Save - Save all my current information.");
            c.getPlayer().dropMessage(5, "@Online - Shows the current connected users in the server.");
            c.getPlayer().dropMessage(5, "@TopUp - Recharges Nx. 100 Meso = 1 Nx (Available from level 20)");
            c.getPlayer().dropMessage(5, "@dispose - Used when attacks, NPC chat, etc. are not working.");
            c.getPlayer().dropMessage(5, "@recruit: examples (kpq, hpq, lpq, etc)");
            c.getPlayer().dropMessage(5, "@Expedition Summon: @Expedition Summon Username - You can summon by entering the user name that was logged out in the boss map.");
            c.getPlayer().dropMessage(5, "@str,dex,int,luk: example (@str amount)");
            c.getPlayer().dropMessage(5, "@check: example (@check player name)");
            c.getPlayer().dropMessage(5, "@stats: shows you extra stats");
            c.getPlayer().dropMessage(5, "@burning");
            return 1;
        }
    }

    public static class Help extends CommandExecute {

        public int execute(MapleClient c, String[] splitted) {
            c.getPlayer().dropMessage(5, "@Save - Save all my current information.");
            c.getPlayer().dropMessage(5, "@Online - Shows the current connected users in the server.");
            c.getPlayer().dropMessage(5, "@TopUp - Recharges Nx. 100 Meso = 1 Nx (Available from level 20)");
            c.getPlayer().dropMessage(5, "@dispose - Used when attacks, NPC chat, etc. are not working.");
            c.getPlayer().dropMessage(5, "@recruit: examples (kpq, hpq, lpq, etc)");
            c.getPlayer().dropMessage(5, "@Expedition Summon: @Expedition Summon Username - You can summon by entering the user name that was logged out in the boss map.");
            c.getPlayer().dropMessage(5, "@str,dex,int,luk: example (@str amount)");
            c.getPlayer().dropMessage(5, "@check: shows you extra info)");
            c.getPlayer().dropMessage(5, "@stats: shows you extra stats");
            c.getPlayer().dropMessage(5, "@burning: opens burn npc");
            return 1;
        }
    }

    public static PlayerGMRank getPlayerLevelRequired() {
        return PlayerGMRank.NORMAL;
    }

    public static class STR extends DistributeStatCommands {

        public STR() {
            stat = MapleStat.STR; // Sets the stat to Strength
        }
    }

    public static class DEX extends DistributeStatCommands {

        public DEX() {
            stat = MapleStat.DEX; // Sets the stat to Dexterity
        }
    }

    public static class INT extends DistributeStatCommands {

        public INT() {
            stat = MapleStat.INT; // Sets the stat to Intelligence
        }
    }

    public static class LUK extends DistributeStatCommands {

        public LUK() {
            stat = MapleStat.LUK; // Sets the stat to Luck
        }
    }

    public abstract static class DistributeStatCommands extends CommandExecute {

        protected MapleStat stat = null;
        private static int statLim = 32767;

        private void setStat(MapleCharacter player, int amount) {
            switch (stat) {
                case STR:
                    player.getStat().setStr((short) (amount <= 0 ? -amount : amount), player);
                    player.updateSingleStat(MapleStat.STR, player.getStat().getStr());
                    if (amount <= 0) {
                        player.setRemainingAp((short) (player.getRemainingAp() - amount));
                    }
                    break;
                case DEX:
                    player.getStat().setDex((short) (amount <= 0 ? -amount : amount), player);
                    player.updateSingleStat(MapleStat.DEX, player.getStat().getDex());
                    break;
                case INT:
                    player.getStat().setInt((short) (amount <= 0 ? -amount : amount), player);
                    player.updateSingleStat(MapleStat.INT, player.getStat().getInt());
                    break;
                case LUK:
                    player.getStat().setLuk((short) (amount <= 0 ? -amount : amount), player);
                    player.updateSingleStat(MapleStat.LUK, player.getStat().getLuk());
                    break;
            }
        }

        private int getStat(MapleCharacter player) {
            switch (stat) {
                case STR:
                    return player.getStat().getStr();
                case DEX:
                    return player.getStat().getDex();
                case INT:
                    return player.getStat().getInt();
                case LUK:
                    return player.getStat().getLuk();
                default:
                    throw new RuntimeException(); //Will never happen.
            }
        }

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(5, "Invalid number entered.");
                return 0;
            }
            int change = 0;
            try {
                change = Integer.parseInt(splitted[1]);
            } catch (NumberFormatException nfe) {
                c.getPlayer().dropMessage(5, "Please enter the amount of stats you wish to raise.");
                return 0;
            }
            if (change <= 0) {
                c.getPlayer().dropMessage(5, "You must enter a number greater than 0.");
                return 0;
            }
            if (c.getPlayer().getRemainingAp() < change) {
                c.getPlayer().dropMessage(5, "AP is not enough.");
                return 0;
            }
            if (getStat(c.getPlayer()) + change > statLim) {
                c.getPlayer().dropMessage(5, "The maximum value of the stat is" + statLim + "32767.");
                return 0;
            }
            setStat(c.getPlayer(), getStat(c.getPlayer()) + change);
            c.getPlayer().setRemainingAp((short) (c.getPlayer().getRemainingAp() - change));
            c.getPlayer().updateSingleStat(MapleStat.AVAILABLEAP, c.getPlayer().getRemainingAp());
            c.getPlayer().dropMessage(5, StringUtil.makeEnumHumanReadable(stat.name()).toUpperCase() + " went up by " + change);
            return 1;
        }
    }

    public abstract static class OpenNPCCommand extends CommandExecute {

        protected int npc = -1;
        private static int[] npcs = { //Ish yur job to make sure these are in order and correct ;(
                9270035,
                9010017,
                9000000,
                9000030,
                9010000,
                9000085,
                9000018};

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (npc != 6 && npc != 5 && npc != 4 && npc != 3 && npc != 1 && c.getPlayer().getMapId() != 910000000) { //drop cash can use anywhere
                if (c.getPlayer().getLevel() < 10 && c.getPlayer().getJob() != 200) {
                    c.getPlayer().dropMessage(5, "You must be over level 10 to use this command.");
                    return 0;
                }
                if (c.getPlayer().isInBlockedMap()) {
                    c.getPlayer().dropMessage(5, "You may not use this command here.");
                    return 0;
                }
            } else if (npc == 1) {
                if (c.getPlayer().getLevel() < 70) {
                    c.getPlayer().dropMessage(5, "You must be over level 70 to use this command.");
                    return 0;
                }
            }
            if (c.getPlayer().hasBlockedInventory()) {
                c.getPlayer().dropMessage(5, "You may not use this command here.");
                return 0;
            }
            NPCScriptManager.getInstance().start(c, npcs[npc]);
            return 1;
        }
    }


    public static class online extends CommandExecute {

        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isGM()) {
                for (ChannelServer ch : ChannelServer.getAllInstances()) {
                    c.getPlayer().dropMessage(6, "Channel " + ch.getChannel() + " (" + ch.getPlayerStorage().getAllNonGMCharacters().size() + " players): " + ch.getPlayerStorage().getOnlinePlayers(false));
                }
                return 1;
            } else {
                for (ChannelServer ch : ChannelServer.getAllInstances()) {
                    c.getPlayer().dropMessage(6, "Channel " + ch.getChannel() + " (" + ch.getPlayerStorage().getAllCharacters().size() + " players): " + ch.getPlayerStorage().getOnlinePlayers(true));
                }
                return 1;
            }

        }
    }

    public static class Damage extends CommandExecute {

        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isDma()) {
                c.getPlayer().setDma(true);
                c.getPlayer().dropMessage(6, "Real damage display feature is turned on.");
            } else {
                c.getPlayer().setDma(false);
                c.getPlayer().dropMessage(6, "The actual damage display feature has been turned off.");
            }
            return 1;
        }
    }

    public static class TopUp extends CommandExecute {

        public int execute(MapleClient c, String[] splitted) {
            if (c.getPlayer().getLevel() < 20) {
                c.getPlayer().dropMessage(1, "Level 20 and below cannot use it.");
                return 1;
            }
            int cash = Integer.parseInt(splitted[1]);
            int meso = cash * 100;
            if (cash >= 1 && cash <= 1000000) {
                if (c.getPlayer().getMeso() >= meso) {
                    c.getPlayer().modifyCSPoints(1, cash, false);
                    c.getPlayer().gainMeso(-meso, false);
                    c.getPlayer().dropMessage(5, "" + cash + "Cash recharge complete.");
                } else {
                    c.getPlayer().dropMessage(1, "Cash recharge is not possible due to lack of mesos.");
                }
            } else {
                c.getPlayer().dropMessage(1, "Cash can only be recharged up to 1000000 at a time.");
            }
            return 1;
        }
    }

    public static class save extends CommandExecute {
        public int execute(MapleClient c, String[] splitted) {
            for (ChannelServer ch : ChannelServer.getAllInstances())
                for (MapleCharacter chr : ch.getPlayerStorage().getAllCharacters())
                    chr.saveToDB(true, true);
            World.Guild.save();
            World.Alliance.save();
            World.Family.save();
            c.getPlayer().dropMessage(6, "Saving completed.");
            return 1;
        }
    }

    public static class WhoDrops extends CommandExecute {

        public int execute(MapleClient c, String[] splitted) {
            NPCScriptManager.getInstance().start(c, 9270073);
            return 1;
        }
    }

    public static class TradeHelp extends TradeExecute {

        public int execute(MapleClient c, String[] splitted) {
            c.getPlayer().dropMessage(-2, "[System] : <@offerequip, @offeruse, @offersetup, @offeretc, @offercash> <quantity> <name of the item>");
            return 1;
        }
    }

    public abstract static class OfferCommand extends TradeExecute {

        protected int invType = -1;

        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length < 3) {
                c.getPlayer().dropMessage(-2, "[Error] : <quantity> <name of item>");
            } else if (c.getPlayer().getLevel() < 70) {
                c.getPlayer().dropMessage(-2, "[Error] : Only level 70+ may use this command");
            } else {
                int quantity = 1;
                try {
                    quantity = Integer.parseInt(splitted[1]);
                } catch (Exception e) { //swallow and just use 1
                }
                String search = StringUtil.joinStringFrom(splitted, 2).toLowerCase();
                Item found = null;
                final MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
                for (Item inv : c.getPlayer().getInventory(MapleInventoryType.getByType((byte) invType))) {
                    if (ii.getName(inv.getItemId()) != null && ii.getName(inv.getItemId()).toLowerCase().contains(search)) {
                        found = inv;
                        break;
                    }
                }
                if (found == null) {
                    c.getPlayer().dropMessage(-2, "[Error] : No such item was found (" + search + ")");
                    return 0;
                }
                if (GameConstants.isPet(found.getItemId()) || GameConstants.isRechargable(found.getItemId())) {
                    c.getPlayer().dropMessage(-2, "[Error] : You may not trade this item using this command");
                    return 0;
                }
                if (quantity > found.getQuantity() || quantity <= 0 || quantity > ii.getSlotMax(found.getItemId())) {
                    c.getPlayer().dropMessage(-2, "[Error] : Invalid quantity");
                    return 0;
                }
                if (!c.getPlayer().getTrade().setItems(c, found, (byte) -1, quantity)) {
                    c.getPlayer().dropMessage(-2, "[Error] : This item could not be placed");
                    return 0;
                } else {
                    c.getPlayer().getTrade().chatAuto("[System] : " + c.getPlayer().getName() + " offered " + ii.getName(found.getItemId()) + " x " + quantity);
                }
            }
            return 1;
        }
    }

    public static class Burning extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            NPCScriptManager.getInstance().start(c, 2082015);
            return 1;
        }
    }

    public static class Check extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            c.getPlayer().dropMessage(6, "You currently have " + c.getPlayer().getCSPoints(1) + " NX.");
            c.getPlayer().dropMessage(6, "You currently have " + c.getPlayer().getMeso() + " Mesos.");
            c.getPlayer().dropMessage(6, "You currently have " + c.getPlayer().getFame() + " Fame.");
            c.getPlayer().dropMessage(6, "You currently have " + c.getPlayer().getPoints() + " Donor Points.");
            c.getPlayer().dropMessage(6, "You currently have " + c.getPlayer().getVPoints() + " voting points.");
            c.getPlayer().dropMessage(6, "You currently have " + c.getPlayer().getPQPoints() + " PQ Points.");
            c.getPlayer().dropMessage(6, "You currently have " + c.getPlayer().getBPoints() + " Boss Points.");
            c.getPlayer().dropMessage(6, "You currently have " + c.getPlayer().getEventPoints() + " Event Points.");
            c.getPlayer().dropMessage(6, "The time is currently " + FileoutputUtil.CurrentReadable_TimeGMT() + " GMT.");
            c.removeClickedNPC();
            NPCScriptManager.getInstance().dispose(c);
            c.getSession().write(MaplePacketCreator.enableActions());
            return 1;
        }
    }

    public static class Stats extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            c.getPlayer().dropMessage(6, "Extra stats for character ID " + c.getPlayer().getName() + ":");
            c.getPlayer().dropMessage(6, "Base HP: " + c.getPlayer().getStat().getMaxHp());
            c.getPlayer().dropMessage(6, "Base MP: " + c.getPlayer().getStat().getMaxMp());
            c.getPlayer().dropMessage(6, "Physical Attack Total: " + c.getPlayer().getStat().getTotalWatk());
            c.getPlayer().dropMessage(6, "Magical Attack Total: " + c.getPlayer().getStat().getTotalMagic());
            c.getPlayer().dropMessage(6, "Boss Damage Total: " + (int) Math.floor(c.getPlayer().getStat().bossdam_r) + "%");
            c.getPlayer().dropMessage(6, "Ignore Enemy DEF Total: " + Math.round(c.getPlayer().getStat().ignoreTargetDEF) + "%");
            // c.getPlayer().dropMessage(6, "EXP/Meso/Drop Rate: " + c.getPlayer().getStat().getExpBuff() + "% / " + c.getPlayer().getStat().getMesoBuff() + "% / " + c.getPlayer().getStat().getDropBuff() + "%");
            return 1;
        }
    }


    public static class OfferEquip extends OfferCommand {

        public OfferEquip() {
            invType = 1;
        }
    }

    public static class OfferUse extends OfferCommand {

        public OfferUse() {
            invType = 2;
        }
    }

    public static class OfferSetup extends OfferCommand {

        public OfferSetup() {
            invType = 3;
        }
    }

    public static class OfferEtc extends OfferCommand {

        public OfferEtc() {
            invType = 4;
        }
    }

    public static class OfferCash extends OfferCommand {

        public OfferCash() {
            invType = 5;
        }

    }
}