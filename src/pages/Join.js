import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import Panding from "../assets/img/panding.svg"
import "../style/Join.scss"
import { String } from '../constants/String';
import { useCheckStatusQuery } from '../api/Join';
import Loader from '../Components/ComonComponent/Loader';
import { toast } from 'react-hot-toast';


export default function Join() {
  const navigaet = useNavigate();


  const logout = () => {
    localStorage.removeItem("token")
    navigaet("/Phonno")
  }

  const { data, isFetching, refetch } = useCheckStatusQuery();


  // const [requestStatus, setrequestStatus] = useState("");


  const status = async () => {

    if (!isFetching) {
      await refetch();

      const RequestStatus = data?.result?.requestStatus;
    
      if (RequestStatus === "pending") {
        toast.error(String.pending_status)
      }

      else if (RequestStatus === "rejected") {
        navigaet("/Company");
        toast.error(String.rejected_status)
      }

      else if (RequestStatus === "approved") {
        navigaet("/Quality");
        toast.success(String.approved_status)
      }

    }

  }
  return (
    <>
      {isFetching ? (<Box className='container'>
        <Loader />
      </Box>) : (<div className='container'>
        <Box >
          <img src={Panding} alt="logo" />

        </Box>
        <Box>
          <Typography
            className="join_tital"
            variant="span"
            component="h2"
          >
            {String.joinPage_tital}
          </Typography>
        </Box>


        <Box>
          <Typography
            className="join_desc"
            variant="span"
            component="span">
            {String.joinPage_des1}
          </Typography>
        </Box>
        <Box>
          <Typography
            className="join_desc"
            variant="span"
            component="span">
            {String.joinPage_des2}
          </Typography>
        </Box>
        <div className='btns'>
          <Box >
            <Stack direction="row" spacing={1}>
              <Button variant="contained" className='status_btn' onClick={status}>Status</Button>
              <Button variant="contained" className='sign_out' onClick={logout}>Sign Out</Button>
            </Stack>

          </Box>
        </div>

      </div>)}

    </>
  )
}
