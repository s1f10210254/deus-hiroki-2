import { prismaClient } from '$/service/prismaClient';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => {
    const task = await prismaClient.task.create({
      data: {
        id: body.id,
        label: body.label,
        userId: body.userId,
        imageKey: body.imageKey,
        done: false, // デフォルト値を設定
        createdAt: new Date(), // 現在の日時を設定
      },
    });
    return { status: 201, body: task };
  },
}));
