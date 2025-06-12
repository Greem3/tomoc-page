import RangeSlider, { ReactRangeSliderInputProps } from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

export default function RangeInput({ ...props }: ReactRangeSliderInputProps) {

    return (
        <RangeSlider {...props}/>
    )
}