import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { ADD_PROJECT } from '../../utils/mutations'; // import the updated mutation from mutations.js
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

const AddProject = ({ clientId, onFormSubmit }) => {

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const [addProject, { loading, error }] = useMutation(ADD_PROJECT);
  if (loading) { return <p>Loading...</p> }
  if (error) { return <p>Error</p> }

  const handleStartDateChange = (date) => {
    const formattedDate = date.toLocaleDateString("en-US");
    console.log('Selected start date:', formattedDate, typeof formattedDate)
    setValue('startDate', formattedDate)
    setStartDate(date);
    
  };
  
  const handleEndDateChange = (date) => {
    const formattedDate = date.toLocaleDateString("en-US");
    console.log('Selected end date:', formattedDate, typeof formattedDate)
    setValue('endDate', formattedDate)
    setEndDate(date);
  };
  

  const handleStartDateBlur = () => {
    register('startDate').onBlur();
  };

  const handleEndDateBlur = () => {
    register('endDate').onBlur();
  };

  const onSubmit = async (data) => {
    const { startDate, endDate, clientId, projectType, paid, paymentType, images } = data;
    console.log('onSubmit triggered')
    try {
      await addProject({
        variables: { startDate, endDate, clientId, projectType, paid, paymentType, images },
      });
      onFormSubmit();
    } catch (error) {
      console.error("Error adding project:", error);
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
    <form onSubmit={onSubmit}>
      <div className="form-group">
      <label htmlFor="startDate">Start Date</label>
      <br />
      <DatePicker
        selected={startDate}
        onChange={handleStartDateChange}
        onBlur={handleStartDateBlur}
        dateFormat="MM/dd/yyyy"
        minDate={new Date()}
        className={`form-control ${errors.startDate ? "is-invalid" : ""}`}
      />
      {errors.startDate && (
        <div className="invalid-feedback">{errors.startDate.message}</div>
      )}
    </div>
    <div className="form-group">
      <label htmlFor="endDate">End Date</label>
      <br />
      <DatePicker
        selected={endDate}
        onChange={handleEndDateChange}
        onBlur={handleEndDateBlur}
        dateFormat="MM/dd/yyyy"
        minDate={startDate}
        className={`form-control ${errors.endDate ? "is-invalid" : ""}`}
      />
      {errors.endDate && (
        <div className="invalid-feedback">{errors.endDate.message}</div>
      )}
    </div>

      {/* <div>
        <label>Client ID:</label>
        <input type="text" {...register('clientId', { initialValue: clientId })} />
        {errors.clientId && <span>{errors.clientId.message}</span>}
      </div> */}

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




