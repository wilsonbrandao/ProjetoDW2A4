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

        if(!type) throw new Error('Type is requered');
        if(!comment) throw new Error('Comment is requered');

        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format');
        }

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
                screenshot ? `<img src="${screenshot}"/>` : ``,
                '</div>'
            ].join('\n')
        })
    }
}