import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { ADD_PROJECT } from '../../utils/mutations';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const schema = yup.object().shape({
  startDate: yup.string().required(),
  endDate: yup.string().required(),
  clientId: yup.string().required(),
  projectType: yup.string().required(),
  paid: yup.boolean().required(),
  paymentType: yup.string(),
  images: yup.string()
});

const AddProject = ({ onFormSubmit }) => {

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const [addProject, { loading, error }] = useMutation(ADD_PROJECT);
  if (loading) { return <p>Loading...</p> }
  if (error) { return <p>Error</p>}

  const handleStartDateChange = (date) => {
    setStartDate(date);
    register('startDate').onChange(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    register('endDate').onChange(date);
  };

  const handleStartDateBlur = () => {
    register('startDate').onBlur();
  };

  const handleEndDateBlur = () => {
    register('endDate').onBlur();
  };

  const onSubmit = async (data) => {
    try {
      await addProject({ variables: data });
      onFormSubmit();
    } catch (error) {
      console.error("Error adding client:", error);
    }
  };

  const projectTypeOptions = ["PAINTING", "CHRISTMAS_LIGHTS", "OTHER"];

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    if (checked) {
      setValue(name, value === "true");
    } else {
      setValue(name, null);
    }
  };
  
  

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Start Date:</label>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          onBlur={handleStartDateBlur}
        />
        {errors.startDate && <span>{errors.startDate.message}</span>}
      </div>

      <div>
        <label>End Date:</label>
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          onBlur={handleEndDateBlur}
        />
        {errors.endDate && <span>{errors.endDate.message}</span>}
      </div>

      <div>
        <label>Client ID:</label>
        <input type="text" {...register('clientId')} />
        {errors.clientId && <span>{errors.clientId.message}</span>}
      </div>

      <div>
        <label>Project Type:</label>
        <select {...register("projectType")}>
          {projectTypeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.projectType && <span>{errors.projectType.message}</span>}
      </div>

      <div>
        <label>Paid:</label>
        <input
          type="checkbox"
          name="paid"
          value={true}
          checked={watch("paid") === true}
          onChange={handleCheckboxChange}
        />
        <span>Yes</span>
        <input
          type="checkbox"
          name="paid"
          value={false}
          checked={watch("paid") === false}
          onChange={handleCheckboxChange}
        />
        <span>No</span>
        {errors.paid && <span>{errors.paid.message}</span>}
      </div>

      <button type="submit">Add Project</button>
    </form>
  );
};

export default AddProject;




