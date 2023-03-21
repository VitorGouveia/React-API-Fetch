import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiHandler } from "next";
import { z } from "zod";

import { prisma } from "@/prisma";

const body = z.object({
  userId: z.string(),
  affiliateReferral: z.string().optional(),
});

const generateCode = (length = 6) => {
  return new Array(length)
    .fill(0)
    .map(() => Math.floor(Math.random() * 10))
    .join("");
};

const handler: NextApiHandler = async (request, response) => {
  switch (request.method) {
    case "POST": {
      const { userId, affiliateReferral } = body.parse(request.body);

      try {
        await prisma.userProgress.create({
          data: {
            userId,
            coins: affiliateReferral ? 100 : 0,
            referral: generateCode(),
            affiliateReferral,
          },
        });

        if (affiliateReferral) {
          const progress = await prisma.userProgress.findFirst({
            where: {
              referral: affiliateReferral,
            },
          });

          progress &&
            (await prisma.userProgress.update({
              where: {
                referral: progress?.referral,
              },
              data: {
                coins: progress?.coins + 3500,
              },
            }));
        }
      } catch (error) {
        return response.status(500).json({
          message: "Internal Server Error",
        });
      }

      return response.status(201).json({
        ok: true,
      });
    }
    default: {
      return response.status(405).json({
        message: "Method not allowed.",
        error: "Method not allowed",
      });
    }
  }
};

export default handler;
