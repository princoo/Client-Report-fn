import { useState } from 'react';
import { SupportGroupBody } from '../interface';
import { useSupportGroups } from '../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/hooks';
import { addSupportGroupReducer } from '../redux/supportGroupSlice';
import SnackBar from '../../../components/SnackBar/SnackBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SupportGroupForm from '../components/SupportGroupForm';

export default function AddSupportGroup() {
  const [addedSGroup, setAddedSGroup] = useState<boolean>(false);
  const { addSupportGroup, isAddError, isAddLoading } = useSupportGroups();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: SupportGroupBody) => {
    const data = await addSupportGroup(values);
    if (data) {
      const body = {
        ...data.data,
        SGroupImages: data.SGroupImages,
      };
      dispatch(addSupportGroupReducer(body));
      setAddedSGroup(true);
      setTimeout(() => {
        navigate('/supportgroup/all');
      }, 1000);
    }
  };
  const initialValues = {
    date: '',
    title: '',
    description: '',
    images: [],
  };

  return (
    <div>
      {isAddError && <SnackBar orderOpen={true} message={isAddError} severity="error" />}
      {addedSGroup && <SnackBar orderOpen={true} message="Report created" severity="success" />}
      <div className="border-2 w-full flex flex-col mx-auto mt-2 p-6 rounded-xl">
        <h1 className="text-2xl font-medium text-blue-500">
          <FontAwesomeIcon icon="group-arrows-rotate" className="me-2 text-4xl" />
          Add Support group
        </h1>
        <SupportGroupForm
          handleSubmit={handleSubmit}
          loading={isAddLoading}
          initialValues={initialValues}
          action="Add"
        />
      </div>
    </div>
  );
}
