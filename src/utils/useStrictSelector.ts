import { isEqual } from "lodash-es";
import { useSelector } from "react-redux";

/**
 * `useStrictSelector` performs a deep comparison before deciding to update the component.
 * This is because the default `useSelector` does only a `===` comparison
 */
const useStrictSelector = <S, Sel>(selector: (state: S) => Sel) =>
  useSelector(selector, isEqual);

export default useStrictSelector;
