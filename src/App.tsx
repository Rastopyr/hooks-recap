import React from "react";

import { Link, Route, Routes } from "react-router-dom";

import { StateHook } from "./hook-demos/01-StateHook";
import { MemoizationHook } from "./hook-demos/02-MemoizationHook";
import { EffectHook } from "./hook-demos/03-EffectHook";
import { ReducerHook } from "./hook-demos/04-ReducerHook";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { ContextHook } from "./hook-demos/05-ContextHook";

const Navigation: React.FC = () => {
  return (
    <ul>
      <li>
        <Link to="/">Index</Link>
      </li>
      <li>
        <Link to="/state">useState</Link>
      </li>
      <li>
        <Link to="/memoization">useCallback + useMemo</Link>
      </li>
      <li>
        <Link to="/effects">useEffect</Link>
      </li>
      <li>
        <Link to="/reducer">useReducer</Link>
      </li>
      <li>
        <Link to="/context">Context + useContext</Link>
      </li>
    </ul>
  );
};

export default function App() {
  return (
    <div className="App container">
      <h1>Hook Recap demo</h1>

      <Navigation />

      <Routes>
        <Route path="/" element={<div />} />
        <Route path="/state" element={<StateHook />} />
        <Route path="/memoization" element={<MemoizationHook />} />
        <Route path="/effects" element={<EffectHook />} />
        <Route path="/reducer" element={<ReducerHook />} />
        <Route path="/context" element={<ContextHook />} />
      </Routes>
    </div>
  );
}
