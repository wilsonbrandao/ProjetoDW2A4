import express from 'express'
import { NodemailerMailAdapter } from './adapterts/nodemailer/NodemailerMailAdapter';
import { PrismaFeedbackRepository } from './repositories/prisma/PrismaFeedbackRepository';
import { SubmitFeedbackUseCase } from './useCase/SubmitFeedbackUseCase';



export const routes = express.Router()



routes.post('/feedbacks', async (req: any, res: any) => {
    const { type, comment, screenshot } = req.body
    const prismaFeedbackRepository = new PrismaFeedbackRepository();
    const nodemailer = new NodemailerMailAdapter();
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbackRepository, nodemailer);

    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot
    })



    return res.status(201).send();
})

