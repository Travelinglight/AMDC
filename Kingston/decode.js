function decode(rec){
  var mic = rec.substr(rec.search(">") + 1, 6);
  if (mic.length != 6)
    return;
  var regexp = /^[0-9A-Z]+$/;
  if(!regexp.test(mic))
    return;

  var map = {};
  map["0"] = {"LatDigit" : 0, "Msg" : "0", "NS" : "South", "LongOff" : 0, "WE" : "East"};
  map["1"] = {"LatDigit" : 1, "Msg" : "0", "NS" : "South", "LongOff" : 0, "WE" : "East"};
  map["2"] = {"LatDigit" : 2, "Msg" : "0", "NS" : "South", "LongOff" : 0, "WE" : "East"};
  map["3"] = {"LatDigit" : 3, "Msg" : "0", "NS" : "South", "LongOff" : 0, "WE" : "East"};
  map["4"] = {"LatDigit" : 4, "Msg" : "0", "NS" : "South", "LongOff" : 0, "WE" : "East"};
  map["5"] = {"LatDigit" : 5, "Msg" : "0", "NS" : "South", "LongOff" : 0, "WE" : "East"};
  map["6"] = {"LatDigit" : 6, "Msg" : "0", "NS" : "South", "LongOff" : 0, "WE" : "East"};
  map["7"] = {"LatDigit" : 7, "Msg" : "0", "NS" : "South", "LongOff" : 0, "WE" : "East"};
  map["8"] = {"LatDigit" : 8, "Msg" : "0", "NS" : "South", "LongOff" : 0, "WE" : "East"};
  map["9"] = {"LatDigit" : 9, "Msg" : "0", "NS" : "South", "LongOff" : 0, "WE" : "East"};
  map["A"] = {"LatDigit" : 0, "Msg" : "1C", "NS" : "NULL", "LongOff" : "NULL", "WE" : "NULL"};
  map["B"] = {"LatDigit" : 1, "Msg" : "1C", "NS" : "NULL", "LongOff" : "NULL", "WE" : "NULL"};
  map["C"] = {"LatDigit" : 2, "Msg" : "1C", "NS" : "NULL", "LongOff" : "NULL", "WE" : "NULL"};
  map["D"] = {"LatDigit" : 3, "Msg" : "1C", "NS" : "NULL", "LongOff" : "NULL", "WE" : "NULL"};
  map["E"] = {"LatDigit" : 4, "Msg" : "1C", "NS" : "NULL", "LongOff" : "NULL", "WE" : "NULL"};
  map["F"] = {"LatDigit" : 5, "Msg" : "1C", "NS" : "NULL", "LongOff" : "NULL", "WE" : "NULL"};
  map["G"] = {"LatDigit" : 6, "Msg" : "1C", "NS" : "NULL", "LongOff" : "NULL", "WE" : "NULL"};
  map["H"] = {"LatDigit" : 7, "Msg" : "1C", "NS" : "NULL", "LongOff" : "NULL", "WE" : "NULL"};
  map["I"] = {"LatDigit" : 8, "Msg" : "1C", "NS" : "NULL", "LongOff" : "NULL", "WE" : "NULL"};
  map["J"] = {"LatDigit" : 9, "Msg" : "1C", "NS" : "NULL", "LongOff" : "NULL", "WE" : "NULL"};
  map["K"] = {"LatDigit" : " ", "Msg" : "1C", "NS" : "NULL", "LongOff" : "NULL", "WE" : "NULL"};
  map["L"] = {"LatDigit" : " ", "Msg" : "0", "NS" : "South", "LongOff" : 0, "WE" : "East"};
  map["P"] = {"LatDigit" : 0, "Msg" : "1S", "NS" : "North", "LongOff" : 100, "WE" : "West"};
  map["Q"] = {"LatDigit" : 1, "Msg" : "1S", "NS" : "North", "LongOff" : 100, "WE" : "West"};
  map["R"] = {"LatDigit" : 2, "Msg" : "1S", "NS" : "North", "LongOff" : 100, "WE" : "West"};
  map["S"] = {"LatDigit" : 3, "Msg" : "1S", "NS" : "North", "LongOff" : 100, "WE" : "West"};
  map["T"] = {"LatDigit" : 4, "Msg" : "1S", "NS" : "North", "LongOff" : 100, "WE" : "West"};
  map["U"] = {"LatDigit" : 5, "Msg" : "1S", "NS" : "North", "LongOff" : 100, "WE" : "West"};
  map["V"] = {"LatDigit" : 6, "Msg" : "1S", "NS" : "North", "LongOff" : 100, "WE" : "West"};
  map["W"] = {"LatDigit" : 7, "Msg" : "1S", "NS" : "North", "LongOff" : 100, "WE" : "West"};
  map["X"] = {"LatDigit" : 8, "Msg" : "1S", "NS" : "North", "LongOff" : 100, "WE" : "West"};
  map["Y"] = {"LatDigit" : 9, "Msg" : "1S", "NS" : "North", "LongOff" : 100, "WE" : "West"};
  map["Z"] = {"LatDigit" : " ", "Msg" : "1S", "NS" : "North", "LongOff" : 100, "WE" : "West"};

  var MicMsg = {};
  MicMsg[0] = "Emergency";
  MicMsg[1] = {"S" : "M6: Priority", "C" : "C6: Custom-6"};
  MicMsg[2] = {"S" : "M5: Special", "C" : "C5: Custom-5"};
  MicMsg[3] = {"S" : "M4: Committed", "C" : "C4: Custom-4"};
  MicMsg[4] = {"S" : "M3: Returning", "C" : "C3: Custom-3"};
  MicMsg[5] = {"S" : "M2: In Service", "C" : "C2: Custom-2"};
  MicMsg[6] = {"S" : "M1: En Route", "C" : "C1: Custom-1"};
  MicMsg[7] = {"S" : "M0: Off Duty", "C" : "C0: Custom-0"};

  var Info = {};
  Info.LatiD = parseInt(map[mic[0]].LatDigit + map[mic[1]].LatDigit);
  Info.LatiM = parseInt(map[mic[2]].LatDigit + map[mic[3]].LatDigit);
  Info.LatiH = parseInt(map[mic[4]].LatDigit + map[mic[5]].LatDigit);
  Info.NS = map[mic[3]].NS;
  Info.WE = map[mic[5]].WE;
  Info.LongOff = map[mic[4]].LongOff;

  // mic-e message
  var msgIdx = parseInt(map[mic[0]].Msg[0]) * 4 + parseInt(map[mic[1]].Msg[0]) * 2 + parseInt(map[mic[2]].Msg[0]);
  // configure message type
  var msgTyp = "0";
  if (map[mic[0]].Msg[0] != "0")
    msgTyp = map[mic[0]].Msg[1];
  else if (map[mic[1]].Msg[0] != "0")
    msgTyp = map[mic[1]].Msg[1];
  else if (map[mic[2]].Msg[0] != "0")
    msgTyp = map[mic[2]].Msg[1];
  else
    msgTyp = "E";

  // assign message
  if (msgTyp == "E")
    Info.Msg = MicMsg[0];
  else if (msgTyp == "S")
    Info.Msg = MicMsg[msgIdx].S;
  else if (msgTyp == "C")
    Info.Msg = MicMsg[msgIdx].C;

  //to find where the Infomation field starts
  var i = 0;
  while((rec[i]!='`') && (rec[i] != '\'') && (i<rec.length))
    i++;

  //to decode the longitute degrees
  console.log(i);
  var LongD = rec[i+1].charCodeAt()-28;
  if(Info.LongOff == 100)
    LongD += 100;
  if(LongD>=180 && LongD<=189)
    LongD -= 80;
  if(LongD>=190 && LongD<=199)
    LongD -= 190;
  Info["LongD"] = LongD;

  //to decode the longitute minutes
  var LongM = rec[i+2].charCodeAt()-28;
  if(LongM>=60)
    LongM -= 60;
  Info["LongM"] = LongM;

  //to decode the longitute hundredths
  var LongH = rec[i+3].charCodeAt()-28;
  Info["LongH"] = LongH;

  //to decode the speed and course
  var SP = rec[i+4].charCodeAt()-28;
  var DC = rec[i+5].charCodeAt()-28;
  var SE = rec[i+6].charCodeAt()-28;
  var speed;
  var course;
  speed = SP*10+DC/10;
  course = (DC%10)*100+SE;
  if(speed>=800)
    speed -= 800;
  if(course>=400)
    course -= 400;
  Info["speed"] = speed;
  Info["course"] = course;

  //to find where the status text ends
  var i = 0;
  while(rec[i]!='}' && i<rec.length)
    i++;

  //to decode the status text
  var altitude;
  var alti3 = rec[i-1].charCodeAt()-33;
  var alti2 = rec[i-2].charCodeAt()-33;
  var alti1 = rec[i-3].charCodeAt()-33;
  altitude = alti1 + alti2*91 + alti3*91*91 - 1000;
  Info["altitude"] = altitude;
  console.log(JSON.stringify(Info));
}
exports.decode = decode;
