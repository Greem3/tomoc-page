export default interface IFreeImageResponse {
    status_code: number;
    success: SuccessInfo;
    image: ImageInfo;
    status_txt: string;
}

export interface SuccessInfo {
  message: string;
  code: number;
}

export interface ImageInfo {
  name: string;
  extension: string;
  size: number;
  width: number;
  height: number;
  date: string;
  date_gmt: string;
  storage_id: string | null;
  description: string | null;
  nsfw: string;
  md5: string;
  storage: string;
  original_filename: string;
  original_exifdata: string | null;
  views: string;
  id_encoded: string;
  filename: string;
  ratio: number;
  size_formatted: string;
  mime: string;
  bits: number;
  channels: string[] | null;
  url: string;
  url_viewer: string;
  thumb: ImageVariant;
  medium: ImageVariant;
  views_label: string;
  display_url: string;
  how_long_ago: string;
}

export interface ImageVariant {
  filename: string;
  name: string;
  width: number;
  height: number;
  ratio: number;
  size: number;
  size_formatted: string;
  mime: string;
  extension: string;
  bits: number;
  channels: string[] | null;
  url: string;
}