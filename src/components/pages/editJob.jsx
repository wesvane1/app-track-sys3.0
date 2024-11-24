import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { useAuth } from "../../contexts/authContext";
import { firestore } from '../../firebase/firebase';

const EditJob = () => {
  const { id } = useParams();
  const [jobData, setJobData] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const getData = async () => {
      try {
        if (currentUser) {
          const appDocRef = doc(
            firestore,
            'userApplicationData',
            currentUser.uid,
            'applications',
            id
          );
          const docSnap = await getDoc(appDocRef);

          if (docSnap.exists()) {
            setJobData(docSnap.data());
          } else {
            console.error('No such document!');
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();
  }, [id, currentUser]);

  if (!jobData) {
    return <p className="text-center text-gray-500 mt-4">Loading...</p>;
  }

  return (
    <div className="edit-job-page mx-auto max-w-4xl mt-8 p-4 bg-white shadow-lg rounded">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Edit Job</h1>
      <div className="space-y-2">
        <p className="text-lg">
          <span className="font-semibold">Status:</span> {jobData.status}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Company:</span> {jobData.companyName}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Date Applied:</span> {jobData.dateApplied?.toDate().toLocaleDateString()}
        </p>
        <p className="text-lg">
          <span className="font-semibold">URL:</span> <a href={jobData.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{jobData.url}</a>
        </p>
      </div>
    </div>
  );
};

export default EditJob;
