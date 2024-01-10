import { getSession } from "next-auth/react";
import { API_URL } from "../constants";
import { auth } from "../helpers/authOptions";

export async function getQuestions() {

  const session = await auth();

  const result = await fetch(`${API_URL}/question`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.web3?.accessToken}`,
    },
  });

  return result.json();
}

export async function getSurveys() {

  const session = await auth();

  const result = await fetch(`${API_URL}/survey`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.web3?.accessToken}`,
    },
  });

  return result.json();
}

export async function submitFeedback(data:any, workId:string){
  const session = await getSession();
  const result = await fetch(`${API_URL}/survey-response/update/${workId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.web3?.accessToken}`,
    },
    body: JSON.stringify({
      assessment: data,
    }),
  });

  return result.json();
}

export async function createQuestion(data: any) {
  const session = await getSession();
  const result = await fetch(`${API_URL}/question`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.web3?.accessToken}`,
    },
    body: JSON.stringify({
      ...data,
    }),
  });

  return result.json();
}

export async function sendRequestEvaluaton(id: string) {
  const session = await getSession();
  const result = await fetch(`${API_URL}/survey-response/request/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.web3?.accessToken}`,
    },
  });

  return result.json();
}


export async function createSurvey(data: any) {
  const session = await getSession();
  const result = await fetch(`${API_URL}/survey`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.web3?.accessToken}`,
    },
    body: JSON.stringify({
      ...data,
    }),
  });

  return result.json();
}

export async function submitVerifyWork(
  data: any,
  surveyId: string,
) {
  const session = await getSession();
  const result = await fetch(`${API_URL}/project-work-feedback/basic`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.web3?.accessToken}`,
    },
    body: JSON.stringify({
      ...data,
      workId: surveyId
    }),
  });
  

  return result.json();
}

//Create the swot analysis
export async function submitSwotAnalysis(data: any, projectWorkId: string, surveyResponseId: string) {
  const session = await getSession();
  const result = await fetch(`${API_URL}/survey-response/swot/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.web3?.accessToken}`,
    },
    body: JSON.stringify({
      ...data,
      projectWorkId: projectWorkId,
      surveyResponseId: surveyResponseId
    }),
  });

  return result.json();
}
