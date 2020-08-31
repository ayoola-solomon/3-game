import React from "react";
import { Box } from "rebass/styled-components";
import { Transition } from "react-spring/renderprops";

import { Image } from "components/Image";

import { GameStatusWrapper, GameStatusButton } from "./Game.styles";

export const GameStatus = ({ status, onClick }) => (
  <Transition
    items={status}
    trail={200}
    from={{ opacity: 0, transform: "scale(0.0)" }}
    enter={{ opacity: 0.8, transform: "scale(1)" }}
    leave={{ opacity: 0, transform: "scale(0.0)" }}
  >
    {(status) =>
      status !== "progress" &&
      (({ opacity, transform }) => (
        <GameStatusWrapper style={{ opacity }}>
          <Image name={status} style={{ transform }} />
          <Box my={20}>{status === "won" ? "You won" : "You lose"} </Box>

          <Transition
            items={status}
            trail={status !== "progress" ? 500 : 0}
            from={{ transform: "translateY(300px)" }}
            enter={{ transform: "translateY(0)" }}
            leave={{ transform: "translateY(300px)" }}
          >
            {(status) =>
              status !== "progress" &&
              ((style) => (
                <GameStatusButton style={style} onClick={onClick}>
                  New game
                </GameStatusButton>
              ))
            }
          </Transition>
        </GameStatusWrapper>
      ))
    }
  </Transition>
);
