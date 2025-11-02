import "./AddMoviePage.css";
import type { IMovie } from "../../types";
import { useState } from "react";

interface IFormData {
  title: string;
  plot: string;
}

type FormErrors = {
  [K in keyof IFormData]?: string;
};

function AddMoviePage() {
  const [formData, setFormData] = useState<IFormData>({
    title: "",
    plot: "",
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

    if (!formData.title.trim()) {
      newErrors.plot = "Title is required.";
    }

    if (!formData.title.trim()) {
      newErrors.plot = "Plot is required.";
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    const validationErrors = validateForm();
    setErrors(validationErrors);

    // Check if there are any errors
    const isValid = Object.keys(validationErrors).length === 0;

    if (isValid) {
      // Form is valid, proceed with submission (e.g., API call)
      console.log("Form data submitted:", formData);

      //
      //
      //
      // navigate();
      //
      //
      //

      setFormData({
        title: "",
        plot: "",
      });
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
          <input className="form__input" id="title" name="plot" type="text" />
        </label>
        <label className="form__label" htmlFor="plot">
          Plot
          <input className="form__input" id="plot" name="plot" type="text" />
        </label>
        <input className="button form__button" type="submit" value={"Add"} />
      </form>
    </div>
  );
}

export default AddMoviePage;
