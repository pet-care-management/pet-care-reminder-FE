import { useEffect, useState } from "react";
import { useParams } from "react-router";

function PetReminderDetail() {

    const { id } = useParams();
    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchPet(){
            try{
                const response = await fetch(`http://localhost:3000/pets/${id}`);

                if (!response.ok){
                    throw new Error(
                        response.status === 404 ? "Pet not found" : `Server responded with ${response.status}`
                    );
                }

                const data = await response.json();
                setPet(data);
            }
            catch(err) {
                setError(err.message);
            }
            finally{
                setLoading(false);
            }
        }

        fetchPet();
    }, [id]);

    return(
        <main className="page-container">
            <h1>Pet Reminders for Pet {id} </h1>
        </main>
    );
};

export default PetReminderDetail;
