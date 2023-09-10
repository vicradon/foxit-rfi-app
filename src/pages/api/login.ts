// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import http from "./http";

type Data = {
  access_token: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const params = new URLSearchParams();

  params.append("client_id", process.env.CLIENT_ID || "");
  params.append("client_secret", process.env.CLIENT_SECRET || "");
  params.append("grant_type", "client_credentials");
  params.append("scope", "read-write");

  const response = await http.post(`/oauth2/access_token`, params);

  res.status(200).json({ access_token: response.data.access_token });
}
