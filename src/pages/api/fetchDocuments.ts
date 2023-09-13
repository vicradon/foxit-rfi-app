import type { NextApiRequest, NextApiResponse } from "next";
import http from "./http";

const formatAsYYYMMDD = (date: Date) => {
  return date.toISOString().split("T")[0];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const today = new Date();
  const yesterday = new Date();

  yesterday.setDate(today.getDate() - 1);

  const formatedYesterday = formatAsYYYMMDD(yesterday);
  const formatedToday = formatAsYYYMMDD(today);

  const response = await http.get(
    `/folders/getAllFolderIdsByStatus?dateFrom=${formatedYesterday}&dateTo=${formatedToday}`,
    {
      headers: {
        Authorization: req.headers.authorization,
      },
    }
  );

  if (response.data.allFolderIds.length === 0) {
    res.status(200).json(response.data.allFolderIds);
  }

  const folderData = response.data.allFolderIds.map(async (id: number) => {
    const response = await http.get(`/folders/myfolder?folderId=${id}`, {
      headers: {
        Authorization: req.headers.authorization,
      },
    });

    return response.data;
  });

  const folders = await Promise.all(folderData);

  res.status(200).json(folders);
}
