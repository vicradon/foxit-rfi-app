import type { NextApiRequest, NextApiResponse } from "next";
import http from "./http";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await http.get("/templates/list", {
    headers: {
      Authorization: req.headers.authorization,
    },
  });

  res.status(200).json(response.data.templatesList);
}
