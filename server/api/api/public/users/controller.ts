import { prismaClient } from '$/service/prismaClient';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => {
    const user = await prismaClient.user.create({
      data: {
        email: body.email,
        name: body.name,
        createdAt: new Date() // 現在の日時を設定
      },
    });
    return { status: 201, body: user };
  },
}));
