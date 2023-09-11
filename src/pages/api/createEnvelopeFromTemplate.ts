import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import http from "./http";

type Data = {
  templates: Record<string, any>[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await axios({
    method: "POST",
    url: "https://na1.foxitesign.foxit.com/api/templates/createFolder",
    headers: {
      Authorization: req.headers.authorization,
    },
    data: req.body,
  });

  res.status(200).json(response.data);
}
