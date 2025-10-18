import { parse } from "jsonc-parser";
import { Logger } from "../helper/logger.js";

const jsonCparser = async ({ jsonFile }: { jsonFile: string }) => {
  try {
    const json = parse(jsonFile);
    Logger.success("JSONC parsed successfully", json);
    return json;
  } catch (err) {
    console.error("❌ Failed to parse JSONC:", err);
    return null;
  }
};

export { jsonCparser };
