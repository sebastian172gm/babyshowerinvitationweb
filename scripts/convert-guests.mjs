import { readFile, writeFile, mkdir } from "fs/promises"
import { join, dirname } from "path"
import { fileURLToPath } from "url"
import XLSX from "xlsx"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, "..")

const workbook = XLSX.readFile(join(ROOT, "lista invitados.xlsx"))
const sheet = workbook.Sheets[workbook.SheetNames[0]]
const rows = XLSX.utils.sheet_to_json(sheet)

const guests = rows
  .filter((row) => row["Invitados"] || row["invitados"])
  .map((row) => ({
    name: String(row["Invitados"] || row["invitados"]).trim(),
    maxGuests: Math.max(1, parseInt(row["no personas"]) || 1),
    category: String(row["tipo personas"] || "").trim(),
  }))

await mkdir(join(ROOT, "data"), { recursive: true })
await writeFile(
  join(ROOT, "data", "guests.json"),
  JSON.stringify(guests, null, 2),
  "utf-8"
)

console.log(`Generated data/guests.json with ${guests.length} guests`)
