import { Box, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Panding from "../assets/img/panding.svg"
import "../style/Join/Join.scss"
import { String } from '../constants/String';
import { useCheckStatusQuery } from '../api/Join';
import Loader from '../Components/ComonComponent/Loader';
import { toast } from 'react-hot-toast';
import { Buttons } from '../Components/ComonComponent/CustomButtons';

export default function Join() {
  const navigaet = useNavigate();
  const { data, isFetching, refetch } = useCheckStatusQuery();

  useEffect(() => {
    if (!isFetching) {
      if (!data?.result?.isJoinedCompany) {
        navigaet("/Company")
      }
    }
  }, [isFetching, data, navigaet])

  const logout = () => {
    localStorage.removeItem("token")
    navigaet("/Phonno")
  }

  const status = async () => {
    if (!isFetching) {
      const response = await refetch();
      const RequestStatus = response?.data?.result?.requestStatus;
      if (RequestStatus === "rejected") {
        navigaet("/Company", {
          state: {
            response
          }
        });
        toast.error(String.rejected_status)
      }

      else if (RequestStatus === "approved") {
        navigaet("/Quality", {
          state: {
            response
          }
        });
        window.location.reload(false);
        toast.success(String.approved_status)
      }
      else {
        toast.error(String.pending_status)
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
              <Buttons variant={"contained"} className={'status_btn'} onClick={status} button_name={String.status} />
              <Buttons variant={"contained"} className={'sign_out'} onClick={logout} button_name={String.sign_out} />
            </Stack>
          </Box>
        </div>
      </div>)}
    </>
  )
}
