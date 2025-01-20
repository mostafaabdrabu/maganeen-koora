"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds timer
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [questions, setQuestions] = useState<question[]>([]);
  const [loading, setLoading] = useState(true);
  const getQuestions = useCallback(async () => {
    try {
      setLoading(true);

      const questions = await fetch("/api/questions", {
        method: "GET",
      });
      const data = await questions.json();
      if (data) {
        setQuestions(data);
      }
    } catch (error) {
      console.log(error);
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getQuestions();
  }, [getQuestions]);
  // Timer functionality
  useEffect(() => {
    if (timeLeft === 0) {
      handleNextClick();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, currentQuestion]);

  const handleNextClick = () => {
    if (selectedOption === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setTimeLeft(60); // Reset timer for the next question
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimeLeft(60);
  };

  if (loading) {
    return <div>Loading...</div>; // You can add a spinner or loading state here
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      dir="rtl"
    >
      <div className="max-w-md w-full bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6">
        {showScore ? (
          <div className="text-center space-y-6">
            <div className="flex justify-center animate-bounce mt-4">
              <Image
                src="/logo.png"
                alt="Football"
                width={100}
                height={100}
                className="w-24 h-24"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              انتهى الاختبار!
            </h2>
            <p className="text-xl text-gray-700">
              لقد حصلت على {score} من {questions.length}
            </p>
            <div className="space-y-4">
              {/* <Button
                onClick={restartQuiz}
                className="w-full bg-green-500 hover:bg-green-600 text-white"
              >
                حاول مرة أخرى
              </Button> */}
              <Link href="/" className="block">
                <Button
                  variant="outline"
                  className="w-full bg-green-500 hover:bg-green-600"
                >
                  العودة إلى الصفحة الرئيسية
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2">
                  <Image
                    src="/football.png"
                    alt="Football"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  <span className="text-lg font-bold text-gray-900 p-2">
                    السؤال {currentQuestion + 1}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-6 h-6 text-green-600" />
                  <span className="text-lg font-bold text-gray-900 p-2">
                    {timeLeft} ثانية
                  </span>
                </div>
              </div>

              {/* Question Section */}
              <h2 className="text-xl font-semibold text-gray-900">
                {questions[currentQuestion].question}
              </h2>

              <div className="space-y-4">
                {questions[currentQuestion].choices.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => setSelectedOption(index)}
                    className={`w-full justify-start text-left text-lg py-4 p-8 ${
                      selectedOption === index
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-white hover:bg-green-50 text-gray-700 border border-gray-200 hover:border-green-500 hover:text-gray-700"
                    }`}
                    variant="outline"
                    size={"lg"}
                  >
                    {option}
                  </Button>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-6">
                <Button
                  onClick={handleNextClick}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-6 text-lg rounded-xl"
                  disabled={selectedOption === null}
                >
                  التالي
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
