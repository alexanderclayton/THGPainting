import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CLIENT } from '../../utils/queries';
import { useParams, Link } from 'react-router-dom';
import AddProject from '../../components/AddProject/AddProject';
import UpdateClient from '../../components/UpdateClient/UpdateClient';
import './Client.css';

const Client = () => {
  const [showAddProjectForm, setShowAddProjectForm] = useState(false);
  const [showUpdateClientForm, setShowUpdateClientForm] = useState(false);
  const [showUpdateClientButton, setShowUpdateClientButton] = useState(true);

  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_CLIENT, {
    variables: { id: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const handleUpdateClientFormSubmit = () => {
    setShowUpdateClientForm(false);
    setShowUpdateClientButton(true);
  };

  const handleUpdateClientButtonClick = () => {
    setShowUpdateClientForm(true);
    setShowUpdateClientButton(false);
  };

  console.log("data:", data?.getClient.projects)

  return (
    <div>
      <p>Client: {data?.getClient?.name}</p>
      <p>Address: {data?.getClient?.address}</p>
      <p>Email: {data?.getClient?.email}</p>
      <p>Phone Number: {data?.getClient?.phoneNumber}</p>
      <p>Projects:</p>
      {data.getClient.projects.map((project) => (
        <Link to={`../all-projects/project/${project.id}`} className="project-card" key={project.id}>
          <p>{project.startDate}</p>
          <p>{project.endDate}</p>
        </Link>
      ))}
      {showUpdateClientForm && (
        <UpdateClient
          client={data?.getClient}
          onSubmit={() => handleUpdateClientFormSubmit()}
        />
      )}
      {showUpdateClientButton && (
        <button onClick={() => handleUpdateClientButtonClick()}>
          Update Client
        </button>
      )}
      {showAddProjectForm && <AddProject clientId={data?.getClient?.id} />}
      <button onClick={() => setShowAddProjectForm(!showAddProjectForm)}>
        {showAddProjectForm ? 'cancel' : 'Add Project'}
      </button>
    </div>
  );
};

export default Client;



