import { useQuery } from '@apollo/client';
import { GET_PROJECT } from '../../utils/queries';
import { useParams } from 'react-router-dom';

const Project = () => {
    const { id } = useParams();
    console.log(typeof id)

    const { loading, error, data } = useQuery(GET_PROJECT, {
        variables: { id: id }
    });

    const startingDate = new Date(data?.getProject?.startDate).toLocaleDateString();
    const endingDate = new Date(data?.getProject?.endDate).toLocaleDateString();
    
    let isItPaid;
    if (data?.getProject?.paid === true) {
        isItPaid = "Yes"
    } else {
        isItPaid = "No"
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    console.log('Data:', data);

    return (
        <div>
            <p>Description: {data?.getProject?.description}</p>
            <p>Project Type: {data?.getProject?.projectType}</p>
            <p>Start Date: {startingDate}</p>
            <p>End Date: {endingDate}</p>
            <p>Paid: {isItPaid}</p>
            <p>Payment Type: {data?.getProject?.paymentType}</p>
            <p>Images: {data?.getProject?.images}</p>
        </div>
    )
}

export default Project;