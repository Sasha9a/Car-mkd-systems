import { MongooseQueryParser } from "mongoose-query-parser";

export function queryParamParser(queryParams: any) {
  const parser = new MongooseQueryParser({
    skipKey: 'offset'
  });

  return parser.parse(queryParams);
}
