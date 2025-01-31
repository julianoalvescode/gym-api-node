import { makeFetchUserCheckInHistoryUseCase } from "@/use-cases/factories/make-fetch-user-check-ins-history-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
export async function history(request: FastifyRequest, reply: FastifyReply) {
  const searchSchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = searchSchema.parse(request.body);

  const { checkIns } = await makeFetchUserCheckInHistoryUseCase().execute({
    page,
    userId: request.user.sub,
  });

  reply.status(200).send({ checkIns });
}
