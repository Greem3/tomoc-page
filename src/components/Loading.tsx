import { Spinner, SpinnerProps } from "./ui/spinner";


export default function Loading({ variant = 'default', ...props }: SpinnerProps) {

    return <div className='flex size-full justify-center'>
        <Spinner
            variant={variant}
            {...props}
        />
    </div>
}