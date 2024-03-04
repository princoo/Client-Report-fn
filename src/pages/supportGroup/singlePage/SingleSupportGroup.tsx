import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useParams } from 'react-router-dom';
import { useSupportGroups } from '../redux/hooks';
import { useEffect, useState } from 'react';
import Loader from '../../../components/pageLoader/loader';
import PageNotFound from '../../../components/PageNotFound';
import { SGBody, SupportGroupData, singleSgResponse } from '../interface';
import Carousel from '../../../components/Carousel';
import { Button } from '../../../components/Button';
import ConfirmationDialogue from '../../../components/ConfirmationDialogue';
import SnackBar from '../../../components/SnackBar/SnackBar';
import Update from '../updateSupportGroup/Update';

export default function SingleSupportGroup() {
  const {
    getSingleSupportGroup,
    isAddError,
    isAddLoading,
    // singleSGroup,
    onDelete,
    onUpdate,
    removeSupportGroup,
    updateSupportGroup,
  } = useSupportGroups();
  const { sid } = useParams();
  const [SGbody, setSGbody] = useState<singleSgResponse | undefined>(undefined);
  const [body, setbody] = useState<Omit<SupportGroupData, 'SGroupImages'> | undefined>(undefined);
  const [onAlert, setonAlert] = useState<boolean>(false);
  const [openUpdateDialogue, setopenUpdateDialogue] = useState<boolean>(false);
  const navigate = useNavigate();
  const [updateFields, setupdateFields] = useState<SGBody>();

  useEffect(() => {
    getSingleSupportGroup(sid || '').then((data) => {
      if (data) {
        setSGbody(data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, createdAt, updatedAt, User, UserId, ...rest } = data.data.body;
        setupdateFields(rest);
        setbody(data?.data.body);
      }
    });
  }, [sid]);

  const handleDelete = async () => {
    setonAlert(false);
    const data = await removeSupportGroup(sid || '');
    if (data) {
      navigate('/supportgroup/all');
    }
  };
  const handleUpdateSG = async (values: SGBody) => {
    const data = await updateSupportGroup(values, sid || '');
    if (data) {
      setbody((prevBody) => ({
        ...prevBody,
        id: data[1][0].id,
        date: data[1][0].date,
        title: data[1][0].title,
        description: data[1][0].description,
        createdAt: data[1][0].createdAt,
        updatedAt: data[1][0].updatedAt,
        UserId: data[1][0].UserId,
        User: prevBody!.User,
      }));
      setopenUpdateDialogue(false);
    }
  };
  if (isAddLoading) {
    return <Loader />;
  }
  if (isAddError) {
    return <PageNotFound error={isAddError} />;
  }
  return (
    <>
      {onDelete.error && <SnackBar orderOpen={true} message={onDelete.error} severity="error" />}
      {onUpdate.data && (
        <SnackBar orderOpen={true} message="SupportGroup Updated" severity="success" />
      )}
      {onUpdate.error && <SnackBar orderOpen={true} message={onUpdate.error} severity="error" />}

      {body && (
        <div className="w-4/5 mx-auto">
          <div className="header flex justify-between py-2 gap-5">
            <div className="title">
              <h3 className="text-2xl text-blue-500 font-medium">{body.title}</h3>
              <p className="text-sm text-gray-500 capitalize">
                Host: {body.User.firstName + ' ' + body.User.lastName}
              </p>
            </div>
            <span
              className=" px-2 py-2 rounded self-center text-sm cursor-pointer hover:bg-blue-100"
              onClick={() => setopenUpdateDialogue(true)}
            >
              <FontAwesomeIcon icon="pen" className="mr-2" />
              Edit
            </span>
          </div>
          <Carousel images={SGbody!.data.images} />
          <div className="body my-10">
            <h3 className="font-medium">Event details</h3>
            <p className="text-sm text-gray-500">Date: {body.date}</p>
            <p className="text-lg mt-2">{body.description}</p>
          </div>
          <div className="action w-20">
            <Button
              onClick={() => setonAlert(true)}
              text="Delete"
              type="button"
              color="delete"
              loading_state={onDelete.loading}
            />
          </div>
        </div>
      )}
      {onAlert && (
        <ConfirmationDialogue
          onClose={() => setonAlert(false)}
          onAgree={handleDelete}
          Onopen={onAlert}
          item="Support Group"
        />
      )}
      {openUpdateDialogue && (
        <Update
          data={updateFields!}
          isOpen={openUpdateDialogue}
          handleClose={() => setopenUpdateDialogue(false)}
          onUpdate={onUpdate}
          handleUpdated={handleUpdateSG}
        />
      )}
    </>
  );
}
