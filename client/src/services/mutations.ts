import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMovie } from "./api/collection";
import { CreateMovieSchemaType } from "../schemas/movieSchema";

export function useAddMovie() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMovieSchemaType) => addMovie(data),
    onError: () => {
      console.log("error");
    },
    onSuccess: async (data) => {
      console.log("success");
      console.log(data);
      await queryClient.invalidateQueries({ queryKey: ["collection-info"] });
    },
  });
}
