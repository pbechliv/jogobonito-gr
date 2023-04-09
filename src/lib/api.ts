import qs from "qs";

export function getStrapiURL(path = "") {
  return `${"http://127.0.0.1:1337"}${path}`;
}

export async function fetchAPI(
  path: string,
  urlParamsObject = {},
  options: Partial<RequestInit> = {}
) {
  // Merge default and user options
  const mergedOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer 159377eac952071bde7ee0cc2becdd482ded45b626b0f5e8cb88ecd0bd8c3f8eb51b62e5c479094288fe6b3e20232c854478e857d4a47e3265589807b25297714f29ee90e6ed4ab9069ed573ba51d5dee502deae0f5f482f0e4cd0c7f04a1dc07998879c1fda764172c321dd806d4cbf059cac59f901987f588c4e2818f4fc5c`,
    },
    ...options,
  };

  // Build request URL
  const queryString = qs.stringify(urlParamsObject);
  const requestUrl = `${getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ""}`
  )}`;

  // Trigger API call
  const response = await fetch(requestUrl, mergedOptions);

  // Handle response
  if (!response.ok) {
    console.error(response.statusText);
    throw new Error(`An error occured please try again`);
  }
  const data = await response.json();
  return data;
}
