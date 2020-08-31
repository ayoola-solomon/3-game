import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import socketIOClient from "socket.io-client";
import { status } from "utils/status";

const ENDPOINT = "http://localhost:5555";

const socket = socketIOClient(ENDPOINT);

const AppContext = createContext({
  socket: null,
  games: [],
  currentGame: null,
  isGameStarted: false,
});

export const AppProvider = ({ children }) => {
  const [games, setGames] = useState([]);
  const [currentGame, setCurrentGame] = useState();
  const [isGameStarted, setIsGameStarted] = useState(false);

  useEffect(() => {
    socket.on(status.ACTIVE_GAMES, (data) => setGames(data));

    return () => {
      socket.disconnect();
    };
  }, []);

  const contextValue = useMemo(
    () => ({
      socket,
      games,
      currentGame,
      setCurrentGame,
      isGameStarted,
      setIsGameStarted,
    }),
    [games, currentGame, setCurrentGame, isGameStarted, setIsGameStarted]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  return context;
};
