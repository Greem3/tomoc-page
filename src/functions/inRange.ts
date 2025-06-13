import { RangeList } from "@/types/RangeList";

export function inRange(value: number, range: RangeList) {
    return value >= range[0] && value <= range[1]
}