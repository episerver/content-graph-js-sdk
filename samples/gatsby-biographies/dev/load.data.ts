import "cross-fetch/polyfill"
import crypto from "crypto-js"
import { config } from "dotenv"
import fs from "fs"
import yaml from "js-yaml"
import path from "path"
import { Biography } from "../src/models/biography"

type ContentType = {
  name: string
  base: string
  contentTypes: string[]
  properties: {
    name: string
    type: string
  }[]
}

type CustomerContentType = {
  languages: []
  contentTypes: ContentType[]
}

type MockData = {
  contentTypes: CustomerContentType
  docs: Biography[]
}

function parseJSON_safe(data: string) {
  try {
    return JSON.parse(data)
  } catch (e) {
    return data
  }
}

function log(msg: any) {
  console.log(msg)
}

function loadEnv() {
  log("-> .env file loading..")
  const { NODE_ENV = "development" } = process.env
  const envFile = `.env.${NODE_ENV}`
  log(`-> Using ${envFile}`)
  config({ path: envFile })
}

function loadData() {
  log("-> 'mock.data.yml' file loading..")
  const data = yaml.load(fs.readFileSync(path.join(__dirname, "mock.data.yml"), "utf8")) as MockData
  return data
}

function generateHmacHeader(url: string, init: RequestInit) {
  const { CONTENT_GRAPH_APPKEY: appKey, CONTENT_GRAPH_SECRET: secret } = process.env

  const method = (init.method || "").toUpperCase()
  const { pathname, search } = new URL(url)
  const target = pathname + search
  const timestamp = Date.now()
  const nonce = Math.random().toString(36).substring(7)
  const body = (init.body || "").toString()
  const body_b64 = crypto.MD5(body).toString(crypto.enc.Base64)
  console.log({ appKey, method, target, timestamp, nonce, body_b64 })
  const message = appKey + method + target + timestamp + nonce + body_b64
  const secret_bytes = crypto.enc.Base64.parse(secret || "")
  const hmac = crypto.HmacSHA256(message, secret_bytes)
  const signature = crypto.enc.Base64.stringify(hmac)

  return `epi-hmac ${appKey}:${timestamp}:${nonce}:${signature}`
}

async function sendOptiqReq(method: "GET" | "POST", path: string, data?: any, _url?: string) {
  const { CONTENT_GRAPH_URL } = process.env
  const url = `${_url || CONTENT_GRAPH_URL}/${path}`
  const isJson = typeof data === "object"
  const body = isJson ? JSON.stringify(data) : data
  const init: RequestInit = { method, body }
  const authHeader = generateHmacHeader(url, init)
  console.log({ authHeader })
  init.headers = {
    ...(isJson ? { "content-type": "application/json" } : {}),
    authorization: authHeader,
  }
  log(`-> Sending req: ${method} ${url}`)
  // log(body)
  const res = await fetch(url, init)
  const resBody = parseJSON_safe(await res.text())
  console.log({ status: res.status, body: resBody })
  return res
}

function createContentTypes(contentTypes: CustomerContentType) {
  log("-> Creating content types..")
  return sendOptiqReq("POST", "contentType", contentTypes)
}

function indexDocuments(docs: any[]) {
  const body = docs
    .map((doc, i) =>
      [
        JSON.stringify({ index: { _id: i + 1 } }), // operation
        JSON.stringify(doc), // data
      ].join("\n")
    )
    .join("\n")

  log("-> Indexing docs..")
  return sendOptiqReq(
    "POST",
    "_stream",
    body
    // "https://dev.optimizely.gq"
    // "http://optiq-emea-dev.northeurope.cloudapp.azure.com"
  )
}

async function main() {
  log("-> Load data app started..")
  loadEnv()
  const mockData = loadData()
  await createContentTypes(mockData.contentTypes)
  await indexDocuments(mockData.docs)
  log("-- Done --")
}

main()
