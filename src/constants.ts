import { Dimensions } from "react-native";
import Constants from "expo-constants";

const { width, height } = Dimensions.get("window");
export const HEADER_HEIGHT = height * 0.4;
export const TOPBAR_HEIGHT = 40 + Constants.statusBarHeight;
export const TABS_HEIGHT = 64;
export const HEADER_DELTA = HEADER_HEIGHT - TOPBAR_HEIGHT - TABS_HEIGHT;
export const CARD_WIDTH = (width - 12 * 2 - 8) / 2;