import serverless from "serverless-http";
import app from "./app";
import { connectDB } from "./db/db";

let ready: Promise<void> | null = null;
const wrapped = serverless(app);

export const handler = async (event: any, context: any) => {
  if (!ready) ready = connectDB();   // connect once per container
  await ready;
  return wrapped(event, context);
};


// import serverless from "serverless-http";
// import app from "./app";
// import { connectDB } from "./db/db";

// let ready: Promise<void> | null = null;
// const wrapped = serverless(app);

// export const handler = async (event: any, context: any) => {
//   if (!ready) ready = connectDB();
//   await ready;

//   //important! 
//   //When AWS Lambda (Function URL, API Gateway, etc.) receives binary or text data, it sometimes base64-encodes the body before passing it to your function.
//   //This can happen even for JSON, depending on settings and how the request came in.
//   //Without decoding, event.body is just a long base64 string — Express doesn’t know how to turn that into { email, password, username }.
//   if (event?.isBase64Encoded && typeof event.body === "string") {
//     event.body = Buffer.from(event.body, "base64").toString("utf8");
//   }
//   const h = event.headers || {};
//   if (!(h["content-type"] || h["Content-Type"])) {
//     event.headers = { ...h, "content-type": "application/json" };
//   }

//   return wrapped(event, context);
// };