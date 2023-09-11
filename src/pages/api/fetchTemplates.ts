import type { NextApiRequest, NextApiResponse } from "next";
import http from "./http";

type Data = {
  templates: Record<string, any>[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await http.get("/templates/list", {
    headers: {
      Authorization: req.headers.authorization,
    },
  });

  res.status(200).json(response.data.templatesList);
}
