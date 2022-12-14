import { CloseButton } from "../CloseButton";
import { useState } from "react";

import bugImageUrl from "../../../assets/bug.svg";
import ideaImageUrl from "../../../assets/idea.svg";
import thoughtImageUrl from "../../../assets/thought.svg";
import thoughthumbsupUrl from "../../../assets/thumbs-up.svg";

import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSeccessStep } from "./Steps/FeedbackSuccessStep";


export const feedbackTypes = {
    BUG: {
        title: "Problema",
        image: {
            source: bugImageUrl,
            alt: "Imagem de um inceto"
        }
    },
    IDEA: {
        title: "Ideia",
        image: {
            source: ideaImageUrl,
            alt: "Imagem de uma lampada"
        }

    },
    OTHER: {
        title: "Outro",
        image: {
            source: thoughtImageUrl,
            alt: "Imagem de umbalão de pensamento"
        }
    },
    LIKE: {
        title: "Gostei",
        image: {
            source: thoughthumbsupUrl,
            alt: "Imagem de umbalão de pensamento"
        }
    }
}

export type FeedbackType = keyof typeof feedbackTypes;

//Object.entries(feedbackTypes => [ ['CHAVE', {VALOR}], ['BUG', {...}], ['IDEA', {...}] ]

export function WidgetForm() {
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
    const [feedbackSent, setFeedbackSent] = useState(false);

    function handleRestartFeedback() {
        setFeedbackSent(false);
        setFeedbackType(null);
    }



    return (
        <div className="bg-zinc-900 border-zinc-500 border-2 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto ">

            {feedbackSent ? (
                <FeedbackSeccessStep onFeedbackRestartRequested={handleRestartFeedback}/>
            ) : (
                <>
                    {!feedbackType ? (
                        <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
                    ) : (
                        < FeedbackContentStep
                            feedbackType={feedbackType}
                            onFeedbackRestartRequested={handleRestartFeedback}
                            onFeedbackSent={() => setFeedbackSent(true)}
                        />
                    )}
                </>
            )}

            <footer className="text-xs text-neutral-400">
                Feito com ♥ por <a className="underline underline-offset-1" href="https://github.com/wilsonbrandao">Wilson Brandão</a>
            </footer>
        </div>
    );
}