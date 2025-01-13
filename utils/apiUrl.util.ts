type BuildUrlParamsTypes = {
  endpoint: string;
  status?: string;
  desc?: "true" | "false";
};

type UrlParamsTypes = {
  status?: string;
  desc?: "true" | "false";
};

export class ApiUrl {
  private static baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  private static cloudinaryBaseUrl = process.env.NEXT_PUBLIC_CLOUDINARY_API;
  public static cloudinaryCloudName =
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  public static cloudinaryUploadPreset =
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  private static buildUrlParams = ({
    endpoint,
    status,
  }: BuildUrlParamsTypes) => {
    let url = `${ApiUrl.baseUrl}${endpoint}`;
    const queryParams = new URLSearchParams();
    if (status) queryParams.append("status", status);
    return `${url}${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;
  };

  public static uploadToCloudinary = `${ApiUrl.cloudinaryBaseUrl}/${ApiUrl.cloudinaryCloudName}/upload`;
}
