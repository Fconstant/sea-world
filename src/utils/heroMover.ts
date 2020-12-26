import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Actions } from "store";

export type UnsubHeroMover = () => void;

export function useHeroMover(el: HTMLElement = document.body) {
  const dispatch = useDispatch();
  const onMoveHero = (event: KeyboardEvent) => {
    let vecX = 0;
    let vecY = 0;
    switch (event.key) {
      case "ArrowDown":
        vecY = 1;
        break;
      case "ArrowUp":
        vecY = -1;
        break;
      case "ArrowLeft":
        vecX = -1;
        break;
      case "ArrowRight":
        vecX = 1;
        break;
      default:
        return;
    }
    dispatch(
      Actions.moveHero({
        vector: {
          x: vecX,
          y: vecY,
        },
      })
    );
  };

  useEffect(() => {
    el.addEventListener("keyup", onMoveHero);
    return () => {
      el.removeEventListener("keyup", onMoveHero);
    };
  });
}
