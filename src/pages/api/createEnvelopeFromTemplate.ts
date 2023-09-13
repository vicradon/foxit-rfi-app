import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import http from "./http";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body);
  const response = await http({
    method: "POST",
    url: "/templates/createFolder",
    headers: {
      Authorization: req.headers.authorization,
    },
    data: req.body,
  });

  res.status(200).json(response.data);
}
