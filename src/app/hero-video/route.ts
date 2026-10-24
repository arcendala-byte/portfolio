import { stat } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { join } from "node:path";
import { Readable } from "node:stream";

const videoPath = join(process.cwd(), "src", "data", "hero.mp4");

function videoResponseHeaders(contentLength: number): Headers {
  return new Headers({
    "Accept-Ranges": "bytes",
    "Cache-Control": "public, max-age=86400",
    "Content-Length": String(contentLength),
    "Content-Type": "video/mp4",
    "X-Content-Type-Options": "nosniff",
  });
}

function responseStream(start?: number, end?: number): ReadableStream<Uint8Array> {
  const stream = createReadStream(videoPath, start === undefined ? undefined : { start, end });
  return Readable.toWeb(stream) as ReadableStream<Uint8Array>;
}

export async function GET(request: Request): Promise<Response> {
  const { size } = await stat(videoPath);
  const rangeHeader = request.headers.get("range");

  if (!rangeHeader) {
    return new Response(responseStream(), {
      headers: videoResponseHeaders(size),
    });
  }

  const match = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader);
  if (!match || (!match[1] && !match[2])) {
    return new Response(null, {
      status: 416,
      headers: { "Content-Range": `bytes */${size}`, "Accept-Ranges": "bytes" },
    });
  }

  const suffixLength = match[1] ? undefined : Number(match[2]);
  const start = match[1] ? Number(match[1]) : Math.max(0, size - (suffixLength ?? 0));
  const end = match[2] && match[1] ? Math.min(Number(match[2]), size - 1) : size - 1;

  if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start >= size || end < start) {
    return new Response(null, {
      status: 416,
      headers: { "Content-Range": `bytes */${size}`, "Accept-Ranges": "bytes" },
    });
  }

  const contentLength = end - start + 1;
  const headers = videoResponseHeaders(contentLength);
  headers.set("Content-Range", `bytes ${start}-${end}/${size}`);

  return new Response(responseStream(start, end), { status: 206, headers });
}
