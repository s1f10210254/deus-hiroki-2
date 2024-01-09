import { prismaClient } from '$/service/prismaClient';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => {
    const task = await prismaClient.task.create({
      data: {
        label: body.label,
        userId: body.userId,
        imageKey: body.imageKey,
      },
    });
    return { status: 201, body: task };
  },
}));
