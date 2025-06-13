import Image from "next/image";
import locale from "@/data/preData/root.json";

export default function TosmocLogo({ variant = 'white', imageWidth = 82, imageHeight = 82 }: { variant?: 'white'|'dark', imageWidth?: number, imageHeight?: number}) {

    return <div className='flex items-center'>
        <Image
            src={`/${variant}/png/TOMOC-ico.png`}
            alt={locale.NAVBAR.LOGO_BLANK.ALT}
            width={imageWidth}
            height={imageHeight}
          />
        <h3
            className={`font-bold text-default-100 -mt-1 ${variant}`}
            style={{
                fontSize: (imageWidth + imageHeight)/2 * 0.45
            }}
        >
          {locale.NAVBAR.LOGO_BLANK.TEXT}
        </h3>
    </div>
}