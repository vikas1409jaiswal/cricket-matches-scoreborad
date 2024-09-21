import { useMutation } from "react-query";
import { CricketMatch } from "../../models/espn-cricinfo-models/CricketMatchModels";
import axios, { AxiosResponse } from "axios";

export const useGeneratePDFForMatch = (matchBody: CricketMatch) => {
  const {
    mutate: generatePDFForMatch,
    isLoading,
    error,
  } = useMutation<AxiosResponse<any>, Error, CricketMatch>(
    (matchBody) =>
      axios.post(
        "http://localhost:5104/cricketmatch/internationalMatches/GeneratePdf",
        [matchBody],
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ),
    {
      onSuccess: (data) => {
        alert("Post added successfully: " + JSON.stringify(data.data));
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
  return generatePDFForMatch;
};
