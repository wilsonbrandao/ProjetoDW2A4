import { SubmitFeedbackUseCase } from "./SubmitFeedbackUseCase"

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
)

describe('Submit feedback', () => {

    it('should be able to submit feedback', async  () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example feedback',
            screenshot: 'data:image/png;base64,test.jpg'
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });
}); 
        
describe('Submit feedback', () => {

    it('should not be able to submit a feedback without a type', async  () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'example feedback',
            screenshot: 'data:image/png;base64,test.jpg'
        })).rejects.toThrow();
    });
}); 

describe('Submit feedback', () => {

    it('should not be able to submit a feedback without a comment', async  () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,test.jpg'
        })).rejects.toThrow();
    });
});

describe('Submit feedback', () => {

    it('should not be able to submit a feedback without an invalid screenshot', async  () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'ta tudo bugado',
            screenshot: 'test.jpg'
        })).rejects.toThrow();
    });
});
    
    
