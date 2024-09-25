import { NextResponse } from "next/server";

export async function GET(request: Request, response: Response) {
  // return response.json();

  // // const params = request.
  // const url = new URL(request.url);

  // const searchParams = new URLSearchParams(url.search);

  // const { get } = searchParams;

  // // https://firebasestorage.googleapis.com/v0/b/r-cloud-b40e6.appspot.com/o/users%2Forashusedmund%40gmail.com%2Fr-drive%2Fred-ubuntu.jpg-1711656106344.jpeg?alt=media&token=d07a50c7-d2b3-4ee5-a08d-d0252d4f1a0b

  // const download_url = get.call(searchParams, "file_url") + "&token=" + get.bind(searchParams)("token");

  // NextResponse.redirect(download_url);

  // // console.log({ url, searchParams, download_url });
  return NextResponse.json({ message: "All good" }, { status: 200 });
}
