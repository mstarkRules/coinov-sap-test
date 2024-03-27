import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

const questions = [
  {
    questionText:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries?",
    answerOptions: [
      { answerText: "New York", isCorrect: false },
      { answerText: "London", isCorrect: false },
      { answerText: "Paris", isCorrect: true },
      { answerText: "Dublin", isCorrect: false },
    ],
  },
  {
    questionText: "Who is CEO of Tesla?",
    answerOptions: [
      { answerText: "Jeff Bezos", isCorrect: false },
      { answerText: "Elon Musk", isCorrect: true },
      { answerText: "Bill Gates", isCorrect: false },
      { answerText: "Tony Stark", isCorrect: false },
    ],
  },
  {
    questionText: "The iPhone was created by which company?",
    answerOptions: [
      { answerText: "Apple", isCorrect: true },
      { answerText: "Intel", isCorrect: false },
      { answerText: "Amazon", isCorrect: false },
      { answerText: "Microsoft", isCorrect: false },
    ],
  },
  {
    questionText: "How many Harry Potter books are there?",
    answerOptions: [
      { answerText: "1", isCorrect: false },
      { answerText: "4", isCorrect: false },
      { answerText: "6", isCorrect: false },
      { answerText: "7", isCorrect: true },
    ],
  },
  {
    questionText: "How many Harry Potter books are there?",
    answerOptions: [
      { answerText: "1", isCorrect: false },
      { answerText: "4", isCorrect: false },
      { answerText: "6", isCorrect: false },
      { answerText: "7", isCorrect: true },
    ],
  },
  {
    questionText: "How many Harry Potter books are there?",
    answerOptions: [
      { answerText: "1", isCorrect: false },
      { answerText: "4", isCorrect: true },
      { answerText: "6", isCorrect: false },
      { answerText: "7", isCorrect: false },
    ],
  },
];

export default function Home() {
  const [showAnswers, setShowAnswers] = useState(false);
  const [isFinishedTest, setIsFinishedTest] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(questions.length).fill(null)
  );
  const [correctQuestionsCount, setCorrectQuestionsCount] = useState<number>(0);

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    if (isFinishedTest) {
      return;
    }
    const newSelectedAnswer = [...selectedAnswers];
    newSelectedAnswer[questionIndex] = answerIndex;

    setSelectedAnswers(newSelectedAnswer);
  };

  const handleCheckAnswers = () => {
    setIsFinishedTest(true);
    setShowAnswers(true);

    let correctAnswersCount = 0;

    const questionsLength = questions.length;

    const correctTestAnswers = questions.map((question, index) =>
      question.answerOptions.findIndex((option) => option.isCorrect)
    );

    selectedAnswers.forEach((selectedAnswer, index) => {
      if (selectedAnswer === correctTestAnswers[index]) {
        correctAnswersCount += 1;
      }
    });

    setCorrectQuestionsCount(correctAnswersCount);

    console.log("selected answers: ", selectedAnswers);
    console.log("correct count: ", correctAnswersCount);
  };
  const handleResetTest = () => {
    setIsFinishedTest(false);
    setShowAnswers(false);
    setSelectedAnswers([]);
    console.log("selected answers: ", selectedAnswers);
  };

  const getCorrectPercent = (correctCount: number, totalQuestions: number) => {
    const percent = (correctCount * 100) / totalQuestions;
    return percent;
  };

  const getAprovationMessage = () => {
    const correctPercent = getCorrectPercent(
      correctQuestionsCount,
      questions.length
    );

    if (correctPercent >= 70 && correctPercent < 80) {
      return "Cê tá bem hein?? Aprovado!! :D";
    } else if (correctPercent >= 80) {
      return "Cê tá voando, cara!! Aprovadaço!! :D";
    } else {
      return "Aprovado!! :D";
    }
  };
  return (
    <div className="p-16 max-w-2xl mx-auto px-4">
      <div className="items-start justify-between sm:flex">
        <div>
          <h4 className="text-gray-800 text-xl font-semibold">
            Coinov SAP Test Simulator - {questions.length} questions
          </h4>
          <p className="mt-2 text-gray-600 text-base sm:text-sm">
            You will receive a email with the test results. Its a joke
          </p>
        </div>
      </div>
      <ul className="mt-6 space-y-3">
        {questions.map((item, idx) => (
          <li key={idx}>
            <h2 className="text-gray-600">{item.questionText}</h2>
            <ul className="divide-y-4 ">
              {item.answerOptions.map((option, index) => (
                <li key={index} className="box-border">
                  <label htmlFor={`${idx}-${index}`} className="block relative">
                    <input
                      id={`${idx}-${index}`}
                      type="radio"
                      // defaultChecked={idx == 1 ? true : false}
                      name={`question-${idx}`}
                      className="sr-only peer box-border"
                      value={index}
                      checked={selectedAnswers[idx] === index}
                      onChange={() => handleAnswerSelect(idx, index)}
                    />
                    <div
                      className={`${
                        showAnswers && option.isCorrect && "bg-green-500"
                      } w-full p-5 cursor-pointer rounded-lg border bg-white shadow-sm ring-indigo-600 peer-checked:ring-2 duration-200`}
                    >
                      <div className=" flex flex-row justify-between pl-7">
                        <h3 className="leading-none text-gray-800 font-medium">
                          {option.answerText}
                        </h3>
                        {showAnswers &&
                          selectedAnswers[idx] !== null &&
                          selectedAnswers[idx] === index &&
                          !item.answerOptions[index].isCorrect && (
                            <p className="font-bold text-sm m-0 p-0 text-red-600">
                              Errado, calabreso!
                            </p>
                          )}

                        {/* <span className="mt-1 text-sm text-gray-600">
                          
                        </span> */}
                      </div>
                    </div>
                    <span className="block absolute top-5 left-5 border peer-checked:border-[5px] peer-checked:border-indigo-600 w-4 h-4 rounded-full"></span>
                  </label>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      {isFinishedTest && (
        <div className=" py-2 text-base ">
          <div className="pb-3 font-bold text-lg">
            {getCorrectPercent(correctQuestionsCount, questions.length) >=
            60 ? (
              <h3 className={` text-green-500`}>{getAprovationMessage()}</h3>
            ) : (
              <h3 className="text-red-500">Reprovado! :&apos;(</h3>
            )}{" "}
            <span className="text-gray-600">
              {getCorrectPercent(
                correctQuestionsCount,
                questions.length
              ).toFixed(2)}
              % de acerto
            </span>
          </div>
          <div className="text-green-500">
            <strong>Respostas corretas: </strong>
            <span>{correctQuestionsCount}</span>
          </div>
          <div className="text-red-400">
            <strong>Respostas erradas: </strong>
            <span>{questions.length - Number(correctQuestionsCount)}</span>
          </div>
        </div>
      )}
      <div className="flex flex-row gap-x-2">
        <button
          className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleCheckAnswers}
        >
          Checar respostas
        </button>
        <button
          className="mt-6 border  text-gray-600 font-bold py-2 px-4 rounded"
          onClick={handleResetTest}
        >
          Resetar teste
        </button>
      </div>
    </div>
  );
}
