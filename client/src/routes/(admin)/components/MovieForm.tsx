import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  createMovieSchema,
  CreateMovieSchemaType,
} from "../../../schemas/movieSchema";
import { useAddMovie } from "../../../services/mutations";

export default function MovieForm() {
  const addMovieMutation = useAddMovie();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateMovieSchemaType>({
    resolver: zodResolver(createMovieSchema),
  });

  const onSubmit: SubmitHandler<CreateMovieSchemaType> = (data) => {
    addMovieMutation.mutate(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="my-6 w-full px-4">
        <div className="flex flex-col">
          <label htmlFor="title">Title</label>
          <input type="text" {...register("title")} autoComplete="off" />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-4 py-4 md:flex-row">
          <div>
            <label htmlFor="format" className="mr-2">
              Format
            </label>
            <select {...register("format")}>
              <option>Choose format...</option>
              <option value="DVD">DVD</option>
              <option value="Blu-ray">Blu-ray</option>
              <option value="4K UHD">4K UHD</option>
            </select>
            {errors.format && (
              <p className="text-red-500">{errors.format.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="type" className="mr-2">
              Media type
            </label>
            <select {...register("type")}>
              <option>Choose media type...</option>
              <option value="Movie">Movie</option>
              <option value="TV Show">TV Show</option>
            </select>
            {errors.type && (
              <p className="text-red-500">{errors.type.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="watched" className="mr-2">
              Watched
            </label>
            <input type="checkbox" {...register("watched")} />
          </div>
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </form>
    </>
  );
}
