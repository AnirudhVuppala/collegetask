import React, { useState, useEffect, useContext, useReducer, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Counter context
const CounterContext = React.createContext();

// Reducer function for managing counter state
const counterReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return { ...state,count: action.count };
    case 'INCREMENT':
      return { ...state,count: state.count + 1 };
    case 'DECREMENT':
      return { ...state,count: state.count - 1 };
      case 'SETMy':
      return { ...state,Mycount: action.count };
    case 'INCREMENTMy':
      return { ...state,Mycount: state.Mycount + 1 };
    case 'DECREMENTMy':
      return { ...state,Mycount: state.Mycount - 1 };
    default:
      return state;
  }
};

const Home = () => {
  const { state } = useContext(CounterContext);

  return (
    <div>
      <h1>Counter Value: {state.count}</h1>
      <Link to="/counter">Counter</Link>
      <h1>MyCounter Value: {state.Mycount}</h1>
      <Link to="/Mycounter">MyCounter</Link>
    </div>
  );
};

const Counter = () => {
  const { state, dispatch } = useContext(CounterContext);
  const navigate = useNavigate();

  const fetchCounter = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/counter');
      dispatch({ type: 'SET', count: response.data.count });
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchCounter();
  }, [fetchCounter]);

  const incrementCounter = useCallback(async () => {
    try {
      await axios.post('http://localhost:5000/api/counter/increment');
      dispatch({ type: 'INCREMENT' });
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  const decrementCounter = useCallback(async () => {
    try {
      await axios.post('http://localhost:5000/api/counter/decrement');
      dispatch({ type: 'DECREMENT' });
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  return (
    <div>
      <h2>Counter</h2>
      <p>Count: {state.count}</p>
      <button onClick={incrementCounter}>Increment</button>
      <button onClick={decrementCounter}>Decrement</button>
      <button onClick={() => navigate('/')}>Go to Home</button>
    </div>
  );
};

const MyCounter = () => {
  const { state, dispatch } = useContext(CounterContext);
  const navigate = useNavigate();

  const fetchCounter = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/counter');
      dispatch({ type: 'SETMy', count: response.data.Mycount });
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchCounter();
  }, [fetchCounter]);

  const incrementMyCounter = useCallback(async () => {
    try {
      await axios.post('http://localhost:5000/api/counter/incrementmy');
      dispatch({ type: 'INCREMENTMy' });
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  const decrementMyCounter = useCallback(async () => {
    try {
      await axios.post('http://localhost:5000/api/counter/decrementmy');
      dispatch({ type: 'DECREMENTMy' });
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  return (
    <div>
      <h2>MyCounter</h2>
      <p>MYCount: {state.Mycount}</p>
      <button onClick={incrementMyCounter}>Increment</button>
      <button onClick={decrementMyCounter}>Decrement</button>
      <button onClick={() => navigate('/')}>Go to Home</button>
    </div>
  );
};

const App = () => {
  const [state, dispatch] = useReducer(counterReducer, { count: 0,Mycount:0});

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/counter">Counter</Link>
              </li>
              <li>
                <Link to="/Mycounter">MyCounter</Link>
              </li>
              
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/counter" element={<>
              <Counter />
              {/* <MyCounter /> */}
            </>} />
            <Route path="/Mycounter" element={<>
              {/* <Counter /> */}
              <MyCounter />
            </>} />
          </Routes>
        </div>
      </Router>
    </CounterContext.Provider>
  );
};

export default App;
