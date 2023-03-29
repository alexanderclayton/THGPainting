import React, { useState } from 'react';
import AddProject from '../../components/AddProject/AddProject';
import { useQuery } from '@apollo/client';
import { GET_CLIENT } from '../../utils/queries';
import { useParams, Link } from 'react-router-dom';
import './Client.css'

const Client = () => {

  const [showForm, setShowForm] = useState(false);

  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_CLIENT, {
    variables: { name: id }
  });

  console.log('data:', data)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <p>Client: {data?.getClient?.name}</p>
      <p>Address: {data?.getClient?.address}</p>
      <p>Email: {data?.getClient?.email}</p>
      <p>Phone Number: {data?.getClient?.phoneNumber}</p>
      <p>Projects:</p>
      {data.getClient.projects.map(project => (
        <Link to='/' className='project-card' key={project.id}>
          <p>{project.startDate}</p>
          <p>{project.endDate}</p>
        </Link>
      ))}
      {showForm && <AddProject clientId={data?.getClient?.id} />}
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'cancel' : 'Add Project'}
      </button>
    </div>
  )
}


export default Client;

