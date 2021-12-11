import React, { useState } from "react";
import minilog from "minilog";

minilog.enable();

export const Counter: React.FC = () => {
  const [counter, setCounter] = useState(0);

  const increment = () => {
    const nextValue = counter + 1;
    setCounter(nextValue);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2>Counter</h2>
        </div>
      </div>
      <div className="row">
        <div className="col col-2 d-flex flex-column align-items-center">
          <div>
            <h1>
              {" "}
              <div className="badge bg-warning">{counter}</div>{" "}
            </h1>
          </div>
          <button className="btn btn-primary" onClick={increment}>
            Increment
          </button>
        </div>
      </div>
    </div>
  );
};

const LogDemo: React.FC<{ readonly id: string }> = ({ id }) => {
  const [logger] = useState(() => minilog(id));
  const [counter, setCounter] = useState(0);

  const increment = () => {
    const nextValue = counter + 1;
    if (nextValue > 10) {
      logger.warn("Counter is too big", { nextValue });
    }

    setCounter(nextValue);

    logger.info("Counter is incremented", { counter: nextValue });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2>Counter {id}</h2>
        </div>
      </div>
      <div className="row">
        <div className="col col-2 d-flex flex-column align-items-center">
          <div>
            <h1>
              {" "}
              <div className="badge bg-warning">{counter}</div>{" "}
            </h1>
          </div>
          <button className="btn btn-primary" onClick={increment}>
            Increment
          </button>
        </div>
      </div>
    </div>
  );
};

export const StateHook: React.FC<{}> = () => {
  return (
    <div className="container fluid">
      <div className="alert">
        <h2>useState demo</h2>
      </div>
      <hr />
      <Counter />
      <hr />
      <LogDemo id={"cat"} />
      <LogDemo id={"dog"} />
    </div>
  );
};
