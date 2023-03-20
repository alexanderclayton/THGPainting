import AddProject from '../../components/AddProject/AddProject';
import { useQuery } from '@apollo/client';
import { GET_CLIENT } from '../../utils/queries';
import { useParams } from 'react-router-dom';

const Client = () => {
    const { id } = useParams();
  
    const { loading, error, data } = useQuery(GET_CLIENT, {
      variables: { name: id }
    });
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;
  
    return (
      <div>
        <AddProject clientID={data?.getClient?.clientId} />
        <p>Client: {data?.getClient?.name}</p>
        <p>Address: {data?.getClient?.address}</p>
        <p>Email: {data?.getClient?.email}</p>
        <p>Phone Number: {data?.getClient?.phoneNumber}</p>
      </div>
    )
  }
  

export default Client;

