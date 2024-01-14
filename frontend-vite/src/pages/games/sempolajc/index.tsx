import { ReactElement } from "react";
import Cricket from "../../../components/games/sempolajc";
import ScreenWakeLock from "../../../utils/wake_lock";


export default function SempolajcPage (): ReactElement {
  return <ScreenWakeLock><Cricket /></ScreenWakeLock>
}
