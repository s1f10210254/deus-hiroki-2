import { prismaClient } from '$/service/prismaClient';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async ({ params }) => {
    const task = await prismaClient.task.findUnique({
      where: { id: params.taskId },
    });
    if (!task) return { status: 404 };
    return { status: 200, body: task };
  },
  put: async ({ params, body }) => {
    const task = await prismaClient.task.update({
      where: { id: params.taskId },
      data: {
        label: body.label,
        done: body.done,
        imageKey: body.imageKey,
      },
    });
    return { status: 200, body: task };
  },
  delete: async ({ params }) => {
    await prismaClient.task.delete({
      where: { id: params.taskId },
    });
    return { status: 200 };
  },
}));
