import os from "os";
import { argValidation } from "../utils/utils.js";

export const osGetInfo = (arg) => {
  if (!argValidation([arg])) {
    return;
  }

  const cpusCommand = () => {
    const CPUs = os.cpus();
    console.log(`amount of CPUs: ${CPUs.length}`);
    const CPUsList = CPUs.map((cpu) => ({
      model: cpu.model,
      speed: cpu.speed,
    }));
    console.log(CPUsList);
  };

  switch (arg) {
    case "--EOL":
      console.log(JSON.stringify(os.EOL));
      break;
    case "--username":
      console.log(os.userInfo().username);
      break;
    case "--cpus":
      cpusCommand();
      break;
    case "--homedir":
      console.log(os.homedir());
      break;
    case "--architecture":
      console.log(process.arch);
      break;
    default:
      console.error("invalid parameter: " + arg);
  }
};
