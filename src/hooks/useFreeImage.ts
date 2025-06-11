import IFreeImageResponse from "@/interfaces/FreeImageInterfaces";
import axios from "axios";
import { URLSearchParams } from "url";

interface IUseFreeImageProps {
    image: File
}

export default async function useFreeImage({ image }: IUseFreeImageProps): Promise<IFreeImageResponse> {

    const urlParams = new URLSearchParams({
        key: process.env.freeImage,
        format: 'json'
    })

    const formData = new FormData();
    formData.append('source', image)

    const response = await axios.post(
        `https://freeimage.host/api/1/upload?${urlParams.toString()}`,
        formData
    );

    return response.data;
}