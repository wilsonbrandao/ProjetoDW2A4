import { MailAdapter } from "../adapterts/MailAdapter";
import { FeedbackRepository } from "../repositories/FeedbackRepository";

interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase {
    private _feedbackRepository: FeedbackRepository;
    private _mailAdapter: MailAdapter;

    constructor(feedbackRepository: FeedbackRepository, mailAdapter: MailAdapter) {
        this._feedbackRepository = feedbackRepository;
        this._mailAdapter = mailAdapter;
    }

    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = request;

        await this._feedbackRepository.create({
            type,
            comment,
            screenshot

        })

        await this._mailAdapter.sendMail({
            subject: 'Novo feedback',
            body: [
                '<div style="font-family: sans-serif; font-size:16px; color:#111; ">',
                `<p> Tipo do feedback: ${type}</p>`,
                `<p> comentário: ${comment}</p>`,
                '</div>'
            ].join('\n')
        })
    }
}