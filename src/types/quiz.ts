export type GetQuizResponse = {
  result: {
    id: string;
    mata_kuliah: string;
    src: string;
    createdAt: string;
    updatedAt: string;
  }[];
};

export type GetQuizByIdResponse = {
  shuffledQuiz: {
    id: string;
    mata_kuliah: string;
    judul_soal: string;
    opsi: {
      text: string;
      value: boolean;
    }[];
    src?: string;
    createdAt: string;
    updatedAt: string;
  }[];
};

export type SubmitQuizRequest = {
  id_subject: string;
  score: number;
}

export type SubmitQuizResponse = {
  msg: string;
}