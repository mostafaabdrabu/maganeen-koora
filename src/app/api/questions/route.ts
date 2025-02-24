import { createClient } from "@/utils/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  //get active subscription
  //get user answers today
  const { data: questions, error: questionError } = await supabase
    .rpc("get_random_questions", { limit_count: 5 })
    .returns<questions[]>();

  if (questionError) {
    console.error("Error fetching questions:", questionError);
    return;
  }

  // Fetch choices for the selected questions
  const questionIds = questions.map((q) => q.id);
  const { data: choices, error: choiceError } = await supabase
    .from("question_choices")
    .select("question_id, choice_text, is_correct")
    .in("question_id", questionIds);

  if (choiceError) {
    console.error("Error fetching choices:", choiceError);
    return;
  }

  // Construct the desired objects
  const formattedQuestions = questions.map((question) => {
    const questionChoices = choices.filter(
      (choice) => choice.question_id === question.id
    );
    return {
      question: question.question_text,
      choices: questionChoices.map((choice) => choice.choice_text),
      correct: questionChoices.findIndex((choice) => choice.is_correct),
    };
  });

  return NextResponse.json(formattedQuestions);
}
