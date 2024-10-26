package handling.channel.handler;

import client.MapleCharacter;
import client.inventory.Equip;
import client.inventory.MapleInventory;
import client.inventory.MapleInventoryType;
import client.inventory.Equip;
import client.inventory.EquipStats;
import constants.GameConstants;
import database.DatabaseConnection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import tools.packet.EtcPacket;
import tools.packet.MaplePacketCreator;
import tools.packet.PacketHelper;
import static tools.packet.PacketHelper.getTime;
import handling.SendPacketOpcode;
import java.sql.Connection;
import tools.packet.Packet;
import server.MapleInventoryManipulator;
import server.MapleItemInformationProvider;
import server.Randomizer;
import tools.data.LittleEndianAccessor;
import tools.data.MaplePacketLittleEndianWriter;

public class DueyHandler {
    
    public static void DueyHandler(LittleEndianAccessor rm, MapleCharacter chr) {
        int value = rm.readByte();
        switch(value) {
            case 6: {
                int invid = rm.readInt();
                delDueyItem(invid);
                chr.send(removeItem(invid,true));
                chr.send(MaplePacketCreator.enableActions());
                break;
            }
            case 5: 
            {
                int invid = rm.readInt();
                gainDueyItem(chr,invid);
                chr.send(removeItem(invid,false));
                delDueyItem(invid);
                chr.send(MaplePacketCreator.enableActions());
                break;
            }
            default:
            {
                int type = rm.readByte();
                int pos = rm.readShort();
                int quantity = rm.readShort();
                int mesos = rm.readInt();
                String name = rm.readMapleAsciiString();
                if(chr.getName().equals(name)) {
                    chr.send(DueyMessage(15));
                    chr.send(MaplePacketCreator.enableActions());
                    return;
                }
                chr.send(DueyMessage(19));
                saveDueyItems(type,pos,quantity,mesos,name,chr);
                MapleInventoryManipulator.removeFromSlot(chr.getClient(), MapleInventoryType.getByType((byte)type), (byte)pos, (short)quantity, false);
                chr.gainMeso(-mesos, false);
                chr.saveToDB(true, true);
                MapleCharacter recv = null;
                recv = chr.getClient().getChannelServer().getPlayerStorage().getCharacterByName(name);
                if (recv != null) {
                    recv.send(DueyHandler.DueyMessage(28));
                }
                chr.send(MaplePacketCreator.enableActions());
            break;
            }
        }
    }
    
    public static byte[] removeItem(int invid, boolean del) {
        MaplePacketLittleEndianWriter packet = new MaplePacketLittleEndianWriter();
        packet.writeShort(SendPacketOpcode.DUEY.getValue());
        packet.write(24);
        packet.writeInt(invid);
        packet.write(del ? 3 : 4);
        return packet.getPacket();
    }
    
    public static byte[] DueyMessage(int value) {
        MaplePacketLittleEndianWriter packet = new MaplePacketLittleEndianWriter();
        packet.writeShort(SendPacketOpcode.DUEY.getValue());
        packet.write(value);
        if(value == 28) {
            packet.write(0);
        }
        return packet.getPacket();
    }
 
    public static byte[] sendDuey(int type, String name) {
        MaplePacketLittleEndianWriter packet = new MaplePacketLittleEndianWriter();
        packet.writeShort(SendPacketOpcode.DUEY.getValue());
        packet.write(type);
        if(DueyItemSize(name) > 0) {
            packet.write(0);
            packet.write(DueyItemSize(name));
            DueyItemInfo(packet,name);
        } else {
            packet.write0(3);
        }
        return packet.getPacket();
    }
    
    public static void delDueyItem(int invid) {
        Connection con = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("SELECT * FROM dueyitems WHERE inventoryitemid = ?");
            ps.setInt(1, invid);
            rs = ps.executeQuery();
            while (rs.next()) {
                con = DatabaseConnection.getConnection();
                ps = con.prepareStatement("DELETE FROM dueyitems WHERE inventoryitemid = ?");
                ps.setInt(1, invid);
                ps.execute();
            }
        } catch (SQLException ex) {

        } finally {
            if (ps != null) {
                try {
                    ps.close();
                } catch (Exception e) {
                }
            }
            if (rs != null) {
                try {
                    rs.close();
                } catch (Exception e) {
                }
            }
        }
    }
    
    public static void gainDueyItem(MapleCharacter chr, int invid) {
        ResultSet rs = null;
        try {
            PreparedStatement dueydb = DatabaseConnection.getConnection().prepareStatement("SELECT * FROM dueyitems WHERE inventoryitemid = ?");
            dueydb.setInt(1, invid);
            rs = dueydb.executeQuery();
            while (rs.next()) {
                if(rs.getInt("inventorytype") == 1) {
                    Equip equip = (Equip) MapleItemInformationProvider.getInstance().getEquipById(rs.getInt("itemid"));
                    equip.setUpgradeSlots((byte)rs.getInt("upgradeslots"));
                    equip.setLevel((byte)rs.getInt("level"));
                    equip.setStr((short)rs.getInt("str"));
                    equip.setDex((short)rs.getInt("dex"));
                    equip.setInt((short)rs.getInt("int"));
                    equip.setLuk((short)rs.getInt("luk"));
                    equip.setHp((short)rs.getInt("hp"));
                    equip.setMp((short)rs.getInt("mp"));
                    equip.setWatk((short)rs.getInt("watk"));
                    equip.setMatk((short)rs.getInt("matk"));
                    equip.setWdef((short)rs.getInt("wdef"));
                    equip.setMdef((short)rs.getInt("mdef"));
                    equip.setAcc((short)rs.getInt("acc"));
                    equip.setAvoid((short)rs.getInt("avoid"));
                    equip.setHands((short)rs.getInt("hands"));
                    equip.setSpeed((short)rs.getInt("speed"));
                    equip.setJump((short)rs.getInt("jump"));
                    equip.setViciousHammer((byte)rs.getInt("ViciousHammer"));
                    equip.setItemEXP(rs.getInt("itemEXP"));
                    equip.setDurability(rs.getInt("durability"));
                    equip.setEnhance((byte)rs.getInt("enhance"));
                    equip.setPotential1(rs.getInt("potential1"));
                    equip.setPotential2(rs.getInt("potential2"));
                    equip.setPotential3(rs.getInt("potential3"));
                    equip.setPotential4(rs.getInt("potential4"));
                    equip.setPotential5(rs.getInt("potential5"));
                    equip.setSocket1(rs.getInt("socket1"));
                    equip.setSocket2(rs.getInt("socket2"));
                    equip.setSocket3(rs.getInt("socket3"));
                    equip.setIncSkill(rs.getInt("incSkill"));
                    equip.setCharmEXP(rs.getShort("charmEXP"));
                    equip.setPVPDamage(rs.getShort("pvpDamage"));
                    MapleInventoryManipulator.addFromDrop(chr.getClient(), equip, false);
                }
                if (rs.getInt("mesos") > 0) {
                     chr.gainMeso(rs.getInt("mesos"), true);
                }
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            if (rs != null) {
                try {
                    rs.close();
                } catch (Exception e) {
                }
            }
        }
    }
    public static void DueyItemInfo(MaplePacketLittleEndianWriter packet, String name) {
        Timestamp time = new Timestamp(System.currentTimeMillis());
        time.setSeconds(0);
        time.setNanos(0);
        time.setDate((time.getDate() + 29));
        ResultSet rs = null;        
        try {
            PreparedStatement dueydb = DatabaseConnection.getConnection().prepareStatement("SELECT * FROM dueyitems WHERE name = ?");
            dueydb.setString(1, name);
            rs = dueydb.executeQuery();
            while (rs.next()) {
                    packet.writeInt(rs.getInt("inventoryitemid"));
                    packet.writeAsciiString(rs.getString("recvname"), 13);
                    packet.writeInt(rs.getInt("mesos"));
                    packet.writeLong(PacketHelper.getTime(time.getTime()));
                    System.out.println(PacketHelper.getTime(time.getTime()));
                    packet.write(1);
                    packet.writeAsciiString(rs.getString("recvname") + "A package has arrived, please check it carefully.",201);
                 if(rs.getInt("itemid") > 0) {
                    packet.write(1);
                    packet.write(rs.getInt("inventorytype") == 1 ? 1 : 2);
                    packet.writeInt(rs.getInt("itemid"));
                    packet.write(0);
                    packet.writeLong(getTime(-1));
                    packet.writeInt(-1);
                    if(rs.getInt("inventorytype") == 1) {
                        int equipStats = 0;
                          try {
                            for (EquipStats equipstat : EquipStats.values()) {
                                switch (equipstat.name()) {
                                    case "UPGRADE": {
                                        equipStats |= rs.getInt("upgradeslots") > 0 ? EquipStats.UPGRADE.getValue() : 0;
                                        break;
                                    }
                                    case "LEVEL":
                                        equipStats |= rs.getInt("level") > 0 ? EquipStats.LEVEL.getValue() : 0;
                                        break;
                                    case "STR":
                                        equipStats |= rs.getInt("str") > 0 ? EquipStats.STR.getValue() : 0;
                                        break;
                                    case "DEX":
                                        equipStats |= rs.getInt("dex") > 0 ? EquipStats.DEX.getValue() : 0;
                                        break;
                                    case "INT":
                                        equipStats |= rs.getInt("int") > 0 ? EquipStats.INT.getValue() : 0;
                                        break;
                                    case "LUK":
                                        equipStats |= rs.getInt("luk") > 0 ? EquipStats.LUK.getValue() : 0;
                                        break;
                                    case "HP":
                                        equipStats |= rs.getInt("hp") > 0 ? EquipStats.HP.getValue() : 0;
                                        break;
                                    case "MP":
                                        equipStats |= rs.getInt("mp") > 0 ? EquipStats.MP.getValue() : 0;
                                        break;
                                    case "WATK":
                                        equipStats |= rs.getInt("watk") > 0 ? EquipStats.WATK.getValue() : 0;
                                        break;
                                    case "MATK":
                                        equipStats |= rs.getInt("matk") > 0 ? EquipStats.MATK.getValue() : 0;
                                        break;
                                    case "WDEF":
                                        equipStats |= rs.getInt("wdef") > 0 ? EquipStats.WDEF.getValue() : 0;
                                        break;
                                    case "MDEF":
                                        equipStats |= rs.getInt("mdef") > 0 ? EquipStats.MDEF.getValue() : 0;
                                        break;
                                    case "ACC":
                                        equipStats |= rs.getInt("acc") > 0 ? EquipStats.ACC.getValue() : 0;
                                        break;
                                    case "AVOID":
                                        equipStats |= rs.getInt("avoid") > 0 ? EquipStats.AVOID.getValue() : 0;
                                        break;
                                    case "HANDS":
                                        equipStats |= rs.getInt("hands") > 0 ? EquipStats.HANDS.getValue() : 0;
                                        break;
                                    case "SPEED":
                                        equipStats |= rs.getInt("speed") > 0 ? EquipStats.SPEED.getValue() : 0;
                                        break;
                                    case "JUMP":
                                        equipStats |= rs.getInt("jump") > 0 ? EquipStats.JUMP.getValue() : 0;
                                        break;
                                    case "ITEMLEVEL":
                                        equipStats |= rs.getInt("itemLevel") != 0 ? EquipStats.ITEMLEVEL.getValue() : 0;
                                        break;
                                    case "ITEMEXP":
                                        equipStats |= rs.getInt("itemEXP") > 0 ? EquipStats.ITEMEXP.getValue() : 0;
                                        break;
                                    case "DURABILITY":
                                        equipStats |= rs.getInt("durability") != -1 ? EquipStats.DURABILITY.getValue() : 0;
                                        break;
                                    case "HAMMER":
                                        equipStats |= rs.getInt("ViciousHammer") > 0 ? EquipStats.HAMMER.getValue() : 0;
                                        break;
                                    case "DOWNLEVEL":
                                        equipStats |= rs.getInt("downlevel") > 0 ? EquipStats.DOWNLEVEL.getValue() : 0;
                                        break;
                                    case "BOSSDAMAGE":
                                        equipStats |= rs.getInt("bossdmg") > 0 ? EquipStats.BOSSDAMAGE.getValue() : 0;
                                        break;
                                    case "IGNOREWDEF":
                                        equipStats |= rs.getInt("IgnoreWdef") > 0 ? EquipStats.IGNOREWDEF.getValue() : 0;
                                        break;
                                }
                            }

                            packet.writeInt(equipStats);
                            for (EquipStats equipstat : EquipStats.values()) {
                                switch (equipstat.name()) {
                                    case "UPGRADE": {
                                        packet.write(rs.getInt("upgradeslots") > 0 ? rs.getInt("upgradeslots") : -88888);
                                        break;
                                    }
                                    case "LEVEL":
                                        packet.write(rs.getInt("level") > 0 ? rs.getInt("level") : -88888);
                                        break;
                                    case "STR":
                                        packet.writeShort(rs.getInt("str") > 0 ? rs.getInt("str") : -88888);
                                        break;
                                    case "DEX":
                                        packet.writeShort(rs.getInt("dex") > 0 ? rs.getInt("dex") : -88888);
                                        break;
                                    case "INT":
                                        packet.writeShort(rs.getInt("int") > 0 ? rs.getInt("int") : -88888);
                                        break;
                                    case "LUK":
                                        packet.writeShort(rs.getInt("luk") > 0 ? rs.getInt("luk") : -88888);
                                        break;
                                    case "HP":
                                        packet.writeShort(rs.getInt("hp") > 0 ? rs.getInt("hp") : -88888);
                                        break;
                                    case "MP":
                                        packet.writeShort(rs.getInt("mp") > 0 ? rs.getInt("mp") : -88888);
                                        break;
                                    case "WATK":
                                        packet.writeShort(rs.getInt("watk") > 0 ? rs.getInt("watk") : -88888);
                                        break;
                                    case "MATK":
                                        packet.writeShort(rs.getInt("matk") > 0 ? rs.getInt("matk") : -88888);
                                        break;
                                    case "WDEF":
                                        packet.writeShort(rs.getInt("wdef") > 0 ? rs.getInt("wdef") : -88888);
                                        break;
                                    case "MDEF":
                                        packet.writeShort(rs.getInt("mdef") > 0 ? rs.getInt("mdef") : -88888);
                                        break;
                                    case "ACC":
                                        packet.writeShort(rs.getInt("acc") > 0 ? rs.getInt("acc") : -88888);
                                        break;
                                    case "AVOID":
                                        packet.writeShort(rs.getInt("avoid") > 0 ? rs.getInt("avoid") : -88888);
                                        break;
                                    case "HANDS":
                                        packet.writeShort(rs.getInt("hands") > 0 ? rs.getInt("hands") : -88888);
                                        break;
                                    case "SPEED":
                                        packet.writeShort(rs.getInt("speed") > 0 ? rs.getInt("speed") : -88888);
                                        break;
                                    case "JUMP":
                                        packet.writeShort(rs.getInt("jump") > 0 ? rs.getInt("jump") : -88888);
                                        break;
                                    case "ITEMLEVEL":
                                        packet.write(rs.getInt("itemLevel") != 0 ? rs.getInt("itemLevel") : -88888);
                                        break;
                                    case "ITEMEXP":
                                        packet.writeLong(rs.getInt("itemEXP") > 0 ? rs.getInt("itemEXP") : -88888);
                                        break;
                                    case "DURABILITY":
                                        packet.writeInt(rs.getInt("durability") != -1 ? rs.getInt("durability") : -88888);
                                        break;
                                    case "HAMMER":
                                        packet.writeInt(rs.getInt("ViciousHammer") > 0 ? rs.getInt("ViciousHammer") : -88888);
                                        break;
                                    case "DOWNLEVEL":
                                        packet.write(rs.getInt("downlevel") > 0 ? rs.getInt("downlevel") : -88888);
                                        break;
                                    case "BOSSDAMAGE":
                                        packet.write(rs.getInt("bossdmg") > 0 ? rs.getInt("bossdmg") : -88888);
                                        break;
                                    case "IGNOREWDEF":
                                        packet.write(rs.getInt("IgnoreWdef") > 0 ? rs.getInt("IgnoreWdef") : -88888);
                                        break;
                                }
                            }
                        } catch (Exception ex) {
                            ex.printStackTrace();
                        }
                        int value = 4;
                        if (rs.getInt("alldmgp") != 0) {
                            value += 1;
                        }
                        if (rs.getInt("allstatp") != 0) {
                            value += 2;
                        }
                        if (rs.getInt("fire") >= 0) {
                            value += 8;
                        }
                        packet.writeInt(value);
                        if (rs.getInt("alldmgp") != 0) {
                            packet.write(rs.getInt("alldmgp"));
                        }
                        if (rs.getInt("allstatp") != 0) {
                            packet.write(rs.getInt("allstatp"));
                        }
                        packet.write(rs.getInt("fire")); //가위
                        if (rs.getInt("fire") >= 0) {
                            packet.writeInt(Randomizer.nextInt());
                            packet.writeInt(0);
                        }
                        packet.writeShort(0);
                        packet.write(rs.getInt("state")); // State
                        packet.write(rs.getInt("enhance")); // Enchance
                        packet.writeShort(rs.getInt("potential1")); //선두
                        packet.writeShort(rs.getInt("potential2")); //후미
                        packet.writeShort(rs.getInt("potential3")); //후미
                        packet.writeShort(rs.getInt("potential4")); //에디셔널 1
                        packet.writeShort(rs.getInt("potential5")); //에디셔널 2
                        packet.write(rs.getInt("socket1")); //애디셔널 3
                        packet.write(rs.getInt("socket2")); //모
                        packet.write(rs.getInt("socket3")); //애디셔널 3
                        packet.writeShort(rs.getInt("incSkill")); //모
                        packet.writeShort(rs.getInt("charmEXP")); //애디셔널 3
                        packet.writeShort(rs.getInt("pvpDamage")); //모
                        packet.writeInt(-1);
                        packet.writeInt(-1);
                        packet.writeLong(PacketHelper.getTime(-2));
                        packet.writeInt(-1); //?
                        packet.writeLong(0);
                        packet.writeLong(PacketHelper.getTime(-2));
                        packet.write0(16);
                    } else {
                        packet.writeShort(rs.getInt("quantity"));
                        packet.writeShort(0);
                        packet.writeShort(0);
                        if (GameConstants.isThrowingStar(rs.getInt("itemid")) || GameConstants.isBullet(rs.getInt("itemid"))) {
                            packet.writeInt(2);
                            packet.writeShort(0x54);
                            packet.write(0);
                            packet.write(0x34);
                        }
                    }
                } else {
                    packet.write(0);
                }
            }
            packet.write(0);
        } catch (SQLException ex) {
        } finally {
            if (rs != null) {
                try {
                    rs.close();
                } catch (Exception e) {
                }
            }
        }
    }
    
    public static int DueyItemSize(String name) {
        int size = 0;
        ResultSet rs = null;
            try {
            PreparedStatement dueydb = DatabaseConnection.getConnection().prepareStatement("SELECT * FROM dueyitems WHERE name = ?");
            dueydb.setString(1, name);
            rs = dueydb.executeQuery();
            while (rs.next()) {
                size ++;
            }
           } catch (SQLException ex) {
      return size;
        } finally {
            if (rs != null) {
                try {
                    rs.close();
                } catch (Exception e) {
                }
            }
        }      return size;

    }
    
    public static void saveDueyItems(int type, int pos, int quantity, int mesos, String name,MapleCharacter chr) {
        Connection con = null;
        PreparedStatement pse = null;        
        try {                                                                                              
            con = DatabaseConnection.getConnection();
            pse = con.prepareStatement("INSERT INTO dueyitems VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
            if(type != 0) {
            MapleInventory inventory = chr.getInventory(MapleInventoryType.getByType((byte)type));
            if(type == 1) {
            Equip equip = (Equip) inventory.getItem((byte)pos);
            pse.setInt(1, mesos);
            pse.setInt(2, equip.getItemId());
            pse.setInt(3, 1);
            pse.setInt(4, equip.getUpgradeSlots());
            pse.setInt(5, equip.getLevel());
            pse.setInt(6, equip.getStr());
            pse.setInt(7, equip.getDex());
            pse.setInt(8, equip.getInt());
            pse.setInt(9, equip.getLuk());
            pse.setInt(10, equip.getHp());
            pse.setInt(11, equip.getMp());
            pse.setInt(12, equip.getWatk());
            pse.setInt(13, equip.getMatk());
            pse.setInt(14, equip.getWdef());
            pse.setInt(15, equip.getMdef());
            pse.setInt(16, equip.getAcc());
            pse.setInt(17, equip.getAvoid());
            pse.setInt(18, equip.getHands());
            pse.setInt(19, equip.getSpeed());
            pse.setInt(20, equip.getJump());
            pse.setInt(21, equip.getViciousHammer());
            pse.setInt(22, equip.getItemEXP());
            pse.setInt(23, equip.getDurability());
            pse.setByte(24, equip.getEnhance());
            pse.setInt(25, equip.getPotential1());
            pse.setInt(26, equip.getPotential2());
            pse.setInt(27, equip.getPotential3());
            pse.setInt(28, equip.getPotential4());
            pse.setInt(29, equip.getPotential5());
            pse.setInt(30, equip.getSocket1());
            pse.setInt(31, equip.getSocket2());
            pse.setInt(32, equip.getSocket3());
            pse.setInt(33, equip.getIncSkill());
            pse.setShort(34, equip.getCharmEXP());
            pse.setShort(35, equip.getPVPDamage());
            pse.setString(36, name);
            pse.setInt(37, type);
            pse.setString(38, chr.getName());
            pse.executeUpdate();
            } else {
            pse.setInt(1, mesos);
            pse.setInt(2, inventory.getItem((byte)pos).getItemId());
            pse.setInt(3, quantity);
            pse.setInt(4, 0);//equip.getUpgradeSlots());
            pse.setInt(5, 0);//equip.getLevel());
            pse.setInt(6, 0);//equip.getStr());
            pse.setInt(7, 0);//equip.getDex());
            pse.setInt(8, 0);//equip.getInt());
            pse.setInt(9, 0);//equip.getLuk());
            pse.setInt(10, 0);//equip.getHp());
            pse.setInt(11, 0);//equip.getMp());
            pse.setInt(12, 0);//equip.getWatk());
            pse.setInt(13, 0);//equip.getMatk());
            pse.setInt(14, 0);//equip.getWdef());
            pse.setInt(15, 0);//equip.getMdef());
            pse.setInt(16, 0);//equip.getAcc());
            pse.setInt(17, 0);//equip.getAvoid());
            pse.setInt(18, 0);//equip.getHands());
            pse.setInt(19, 0);//equip.getSpeed());
            pse.setInt(20, 0);//equip.getJump());
            pse.setInt(21, 0);//equip.getViciousHammer());
            pse.setInt(22, 0);//equip.getItemEXP());
            pse.setInt(23, 0);//equip.getDurability());
            pse.setByte(24, (byte)0);//equip.getEnhance());
            pse.setInt(25, 0);//equip.getPotential1());
            pse.setInt(26, 0);//equip.getPotential2());
            pse.setInt(27, 0);//equip.getPotential3());
            pse.setInt(28, 0);//equip.getPotential4());
            pse.setInt(29, 0);//equip.getPotential5());
            pse.setInt(30, 0);//equip.getPotential3());
            pse.setInt(31, 0);//equip.getPotential4());
            pse.setInt(32, 0);//equip.getPotential5());
            pse.setInt(33, 0);//equip.getPotential3());
            pse.setShort(34, (short)0);//equip.getPotential4());
            pse.setShort(35, (short)0);//equip.getPotential5());
            pse.setString(36, name);
            pse.setInt(37, type);
            pse.setInt(38, Randomizer.nextInt());
            pse.setString(39, chr.getName());
            pse.executeUpdate();            
               }
            } else {
            pse.setInt(1, mesos);
            pse.setInt(2, 0);
            pse.setInt(3, 0);
            pse.setInt(4, 0);//equip.getUpgradeSlots());
            pse.setInt(5, 0);//equip.getLevel());
            pse.setInt(6, 0);//equip.getStr());
            pse.setInt(7, 0);//equip.getDex());
            pse.setInt(8, 0);//equip.getInt());
            pse.setInt(9, 0);//equip.getLuk());
            pse.setInt(10, 0);//equip.getHp());
            pse.setInt(11, 0);//equip.getMp());
            pse.setInt(12, 0);//equip.getWatk());
            pse.setInt(13, 0);//equip.getMatk());
            pse.setInt(14, 0);//equip.getWdef());
            pse.setInt(15, 0);//equip.getMdef());
            pse.setInt(16, 0);//equip.getAcc());
            pse.setInt(17, 0);//equip.getAvoid());
            pse.setInt(18, 0);//equip.getHands());
            pse.setInt(19, 0);//equip.getSpeed());
            pse.setInt(20, 0);//equip.getJump());
            pse.setInt(21, 0);//equip.getViciousHammer());
            pse.setInt(22, 0);//equip.getItemEXP());
            pse.setInt(23, 0);//equip.getDurability());
            pse.setByte(24, (byte)0);//equip.getEnhance());
            pse.setInt(25, 0);//equip.getPotential1());
            pse.setInt(26, 0);//equip.getPotential2());
            pse.setInt(27, 0);//equip.getPotential3());
            pse.setInt(28, 0);//equip.getPotential4());
            pse.setInt(29, 0);//equip.getPotential5());
            pse.setInt(30, 0);//equip.getPotential3());
            pse.setInt(31, 0);//equip.getPotential4());
            pse.setInt(32, 0);//equip.getPotential5());
            pse.setInt(33, 0);//equip.getPotential3());
            pse.setShort(34, (short)0);//equip.getPotential4());
            pse.setShort(35, (short)0);//equip.getPotential5());
            pse.setString(36, name);
            pse.setInt(37, type);
            pse.setInt(38, Randomizer.nextInt());
            pse.setString(39, chr.getName());
            pse.executeUpdate();            
        }
            pse.close();
        } catch (SQLException ex) {
            System.out.println("Save data exception error : " + ex);
        } finally {
            if (pse != null) {
                try {
                    pse.close();
                } catch (Exception e) {
                }
            }
        }
    }
}
