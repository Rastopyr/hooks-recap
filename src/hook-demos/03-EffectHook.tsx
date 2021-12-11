import { random } from "faker";
import React, { useEffect, useState } from "react";
import useLogger from "../hooks/useLogger";

const createProps = () => {
  const keys = new Array(random.number(10))
    .fill(undefined)
    .map(() => random.alphaNumeric(10));

  const values = keys.map(() => random.alphaNumeric(10));

  return keys.reduce(
    (props, key, index) => ({ ...props, [key]: values[index] }),
    {}
  );
};

const EffectLifecycle: React.FC<Record<string, string>> = (props) => {
  const logger = useLogger("Lifecycle");
  const [text, setText] = useState("");

  useEffect(() => {
    logger.log("Did render", props);
  });

  useEffect(() => {
    logger.log("Mount");

    return () => {
      logger.log("Unmount");
    };
  }, []);

  useEffect(() => {
    logger.log("Props did update");
  }, [...Object.values(props)]);

  useEffect(() => {
    logger.log("Text changed", { text });

    return () => {
      logger.log("Text prev value", { text });
    };
  }, [text]);

  return (
    <div className="container">
      <div className="row">
        <div className="col col-6 py-3 d-flex">
          <input
            placeholder="Type some text"
            type="text"
            className="form-control"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

const Effectfull: React.FC = () => {
  const logger = useLogger("Effectfull");

  useEffect(() => {
    const timerId = setInterval(() => {
      logger.info("Interval fired");
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    const socket = new WebSocket(
      "wss://demo.piesocket.com/v3/channel_1?api_key=oCdCMcMPQpbvNjUIzqtvF1d2X2okWpDQj4AwARJuAgtjhzKxVEjQU6IdCjwm&notify_self"
    );

    socket.addEventListener("open", function (event) {
      socket.send("Hello Server!");
    });

    socket.addEventListener("message", function (event) {
      logger.info("Message from server ", event.data);
    });

    return () => {
      logger.info("Teardown socket");
      socket.close();
    };
  }, []);

  return <div className="container"></div>;
};

export const EffectHook: React.FC = () => {
  return (
    <div className="container fluid">
      <div className="alert">
        <h2>useCallback + useMemo</h2>
      </div>
      <hr />
      <h3>EffectLifecycle</h3>
      <EffectLifecycle {...createProps()} />
      <hr />
      <h3>Effectfull</h3>
      <Effectfull />
    </div>
  );
};
