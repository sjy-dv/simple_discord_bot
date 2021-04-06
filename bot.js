const fs = require("fs");
const Now = new Date();
let isYear = Now.getFullYear();
let isMonth = Now.getMonth() + 1;
let isDay = Now.getDate();
let isHour = Now.getHours();
let isMinute = Now.getMinutes();

const explain = `
1. !join (봇을 해당 채널로 부르려면 사용해주세요. 채널에 들어가 있어야 부를 수 있습니다. 안그러면 짜증냅니다.)\n2. !youtube 명령어 (해당 명령어에 해당하는 첫번째 유튜브영상을 실행합니다.)\n3. !link 명령어(해당 명령어에 해당하는 url에 영상을 실행합니다. 유튜브만 가능)\n4. ?명령어 (봇에게 말을 거시려면 ?을 붙이고 말을 걸어주세요.)\n5. !stop 을 통하여 1,2,3 번에 행위를 멈출 수 있습니다.\n6. !exit 를 통해 봇을 끌 수 있습니다.\n7. !restart 를 통해 봇을 재시작할 수 있습니다.\n8. !log 를 통해 누가 메세지를 삭제하고, 추방당했고, 차단했는지를 확인할 수 있습니다.
`;

const new_log = (member) => {
  let time =
    isYear + "/" + isMonth + "/" + isDay + "\t" + isHour + ":" + isMinute;
  let info = `${time} \t ${member}님이 입장하였습니다.`;
  fs.appendFileSync("log.txt", info);
};

const del_log = (msg) => {
  let time =
    isYear + "/" + isMonth + "/" + isDay + "\t" + isHour + ":" + isMinute;
  let info = `${time} \t ${msg}가 삭제되었습니다.`;
  fs.appendFileSync("log.txt", info);
};

const ban_log = (member) => {
  let time =
    isYear + "/" + isMonth + "/" + isDay + "\t" + isHour + ":" + isMinute;
  let info = `${time} \t ${member}가 추방되었습니다.`;
  fs.appendFileSync("log.txt", info);
};

const block_log = (user) => {
  let time =
    isYear + "/" + isMonth + "/" + isDay + "\t" + isHour + ":" + isMinute;
  let info = `${time} \t ${user}가 차단되었습니다`;
  fs.appendFileSync("log.txt", info);
};

const read_log = () => {
  const log = fs.readFileSync("log.txt", "utf8");
  console.log(log);
  return JSON.stringify(log);
};

module.exports = { explain, new_log, del_log, ban_log, block_log, read_log };
