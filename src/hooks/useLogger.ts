import minilog from "minilog";
import { useState } from "react";

type Logger = {
  debug(...msg: unknown[]): Logger;
  info(...msg: unknown[]): Logger;
  log(...msg: unknown[]): Logger;
  warn(...msg: unknown[]): Logger;
  error(...msg: unknown[]): Logger;
};

export default (id: string): Logger => {
  const [logger] = useState(() => minilog(id));

  return logger;
};
