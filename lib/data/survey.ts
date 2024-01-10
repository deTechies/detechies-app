import { getSession } from "next-auth/react";
import { API_URL } from "../constants";
import { auth } from "../helpers/authOptions";

export async function submitEvaluationSurvey(
  questions: any,
  workId: string,
  surveyResponseId: string
) {
  const session = await getSession();

  const formattedData = {
    surveyResponseId: surveyResponseId, // ID of the survey
    projectWorkId: workId, // ID of the project work
    evaluatorId: session?.web3.address, // ID of the project member who is the evaluator
    answers: transformToAnswerDto(questions),
    // Any other fields required for a survey response
  };


  const url = new URL(`${API_URL}/survey-response`);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.web3?.accessToken}`,
    },
    body: JSON.stringify(formattedData),
  });

  // revalidatePath('/', 'layout')

  if (!response.ok) {
    //show me the result why its not ok
    return response.json();
  }

  return response.json();
}

export async function getAllContributed() {
  const session = await auth();
  const url = new URL(
    `${API_URL}/survey-response/contributed/${session?.web3.user.id}`
  );

  if (!session?.web3?.accessToken) {
    throw new Error("No access token found");
  }
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.web3?.accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch the survey id");
  }

  return response.json();
}

export async function getAllMyEvaluations() {
  const session = await auth();
  const url = new URL(
    `${API_URL}/survey-response/all/${session?.web3.user.id}`
  );

  if (!session?.web3?.accessToken) {
    throw new Error("No access token found");
  }
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.web3?.accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch the survey id");
  }

  return response.json();
}

export async function getEvaluationSurvey(id: string) {
  const session = await auth();
  const url = new URL(`${API_URL}/survey/match/${id}`);

  if (!session?.web3?.accessToken) {
    throw new Error("No access token found");
  }
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.web3?.accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch the survey id");
  }

  return response.json();
}

function transformToAnswerDto(data: { [key: string]: number }): any[] {
  return Object.entries(data).map(([questionId, response]) => ({
    questionId,
    response: response.toString(), // Assuming response is always a number and needs to be a string in AnswerDto
  }));
}
