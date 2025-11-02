import "./AddMoviePage.css";
import type { IMovie } from "../../types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addMovie } from "../../features/movie/movieSlice";
import type { AppDispatch } from "../../store";

interface IFormData {
  title: string;
  plot: string;
  poster: string;
}

type FormErrors = {
  [K in keyof IFormData]?: string;
};

function AddMoviePage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IFormData>({
    title: "",
    plot: "",
    poster: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    const fieldName = name as keyof IFormData;

    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));

    if (errors[fieldName]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: undefined,
      }));
    }
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    console.log(formData);

    if (!formData.title.trim()) {
      newErrors.plot = "Title is required.";
    }

    if (!formData.plot.trim()) {
      newErrors.plot = "Plot is required.";
    }

    if (!formData.poster.trim()) {
      newErrors.poster = "Poster is required";
    }

    return newErrors;
  };

  function resetForm() {
    setFormData({
      title: "",
      plot: "",
      poster: "",
    });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    const validationErrors = validateForm();
    setErrors(validationErrors);

    const isValid = Object.keys(validationErrors).length === 0;

    if (isValid) {
      console.log("Form data submitted:", formData);

      const id = (Math.random() + 1).toString(36).substring(7);
      const movieToAdd: IMovie = {
        imdbId: `customid-${id}`,
        title: formData.title,
        plot: formData.plot,
        poster: formData.poster,
        bookmarked: false,
        custom: true,
      };
      dispatch(addMovie(movieToAdd));
      resetForm();
      navigate("/");
    } else {
      console.log("Form validation failed:", validationErrors);
    }
  };

  return (
    <div className="page">
      <form className="form card" onSubmit={handleSubmit} noValidate>
        <h1 className="form__heading">Add Movie</h1>
        <label className="form__label" htmlFor="title">
          Title
          <input
            className="form__input"
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <label className="form__label" htmlFor="plot">
          Plot
          <input
            className="form__input"
            id="plot"
            name="plot"
            type="text"
            value={formData.plot}
            onChange={handleChange}
          />
        </label>
        <label className="form__label" htmlFor="poster">
          Link for poster image
          <input
            className="form__input"
            id="poster"
            name="poster"
            type="text"
            value={formData.poster}
            onChange={handleChange}
          />
        </label>
        <div className="form__controls">
          <input className="button form__button" type="submit" value={"Add"} />
          <button
            className="button"
            onClick={() => {
              resetForm();
              navigate("/");
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddMoviePage;
