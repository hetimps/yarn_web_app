import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, Drawer, FormControlLabel, InputLabel, Paper, Stack, TextField, Typography } from '@mui/material'
import * as Yup from "yup";
import "../../style/Quality/AddQualityForm.scss"
import { useState } from 'react';
import { Form, Formik } from 'formik';
import { String } from '../../constants/String';
import { Regex } from '../../constants/Regex';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useEffect } from 'react';
import { useUpdateYarnMutation } from '../../api/Yarn';
import Loader from '../ComonComponent/Loader';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useGetQualityQuery } from '../../api/Quality';
import { Buttons } from '../ComonComponent/CustomButtons';

export default function EditYarnDrawer({ toggleDrawer, isDrawerOpen, selectrdYarn }) {
    const limit = "";
    const search = "";
    const page = "";
    const yarn = selectrdYarn?._id;
    const { data, isFetching, refetch } = useGetQualityQuery({ page, limit, search: search, yarn });
    const [updateYarn, { isLoading }] = useUpdateYarnMutation();
    const [yarnQualityData, setYarnQualityData] = useState([]);
    const [selectedQualityIds, setSelectedQualityIds] = useState([]);
    const [isAll, setIsAll] = useState(false);
    const [allQualityId, setAllQualityId] = useState([]);

    useEffect(() => {
        isDrawerOpen && setYarnQualityData([])
        if (!isFetching && isDrawerOpen) {
            setYarnQualityData(data?.result?.data)
        }
    }, [data, isFetching, yarnQualityData, isDrawerOpen])

    useEffect(() => {
        isDrawerOpen && refetch();
    }, [isDrawerOpen, refetch])

    useEffect(() => {
        const qualityIds = yarnQualityData.map((quality) => quality._id);
        setAllQualityId(qualityIds);
    }, [yarnQualityData])

    useEffect(() => {
        if (allQualityId.length === 0 && selectedQualityIds.length === 0) {
            if (isAll) {
                setIsAll(true)
            } else {
                setIsAll(false)
            }
        } else {
            if (selectedQualityIds.length === allQualityId.length) {
                setIsAll(true)
            } else {
                setIsAll(false)
            }
        }

    }, [selectedQualityIds, allQualityId])

    const defaultValue = {
        yarnName: selectrdYarn?.yarnName || "",
        yarnRate: selectrdYarn?.yarnRate || "",
    };

    const validationSchema = Yup.object().shape({
        yarnName: Yup.string().required(String.yarn_required).matches(Regex.yarn_name, String.valid_name),
        yarnRate: Yup.string().required(String.yarn_rate).matches(Regex.yarn_rate, String.valid_rate),
    });

    const handleChangeisall = async (event) => {
        if (event.target.checked) {
            setIsAll(event.target.checked);
            setSelectedQualityIds(allQualityId)
        } else {
            setIsAll(event.target.checked);
            setSelectedQualityIds([])
        }
    };

    const handleQualityCheckboxChange = (qualityId) => {
        if (selectedQualityIds.includes(qualityId)) {
            setSelectedQualityIds(selectedQualityIds.filter((id) => id !== qualityId));
        } else {
            setSelectedQualityIds([...selectedQualityIds, qualityId]);
        }
    };

    const handleSubmit = async (value) => {
        const id = selectrdYarn?._id;
        const body = {
            yarnName: value?.yarnName,
            yarnRate: value?.yarnRate,
            isAll: isAll
        }
        if (selectedQualityIds.length > 0) {
            body.qualityIds = selectedQualityIds;
        }
        const response = await updateYarn({ body, id })
        response && toggleDrawer();
    }

    return (
        <>
            <Drawer transitionDuration={1000} anchor="right" open={isDrawerOpen} className='yedrawer' >
                <Formik initialValues={defaultValue} validationSchema={validationSchema} onSubmit={handleSubmit}  >
                    {({
                        values,
                        handleChange,
                        errors,
                        touched,
                    }) => {
                        return (
                            <Form>
                                <Paper className='yeheading_paper'>
                                    <div className='yeheading' >
                                        <div>
                                            <Typography
                                                className="yeheading_text"
                                                variant="span"
                                                component="span">
                                                {String.edit_yarn_tital}
                                            </Typography>
                                        </div>

                                        <div onClick={toggleDrawer} className='yeclose_icon'>
                                            <HighlightOffIcon />
                                        </div>
                                    </div>
                                </Paper>

                                {isFetching && isDrawerOpen ? (<Box className="ye_loader">
                                    <Loader />
                                </Box>) : (
                                    <div className='yefrom'>
                                        <div className='yeinputconatiner'>
                                            <InputLabel className="yelabel" >
                                                {String.yarn_label}
                                            </InputLabel>
                                            <TextField
                                                onChange={handleChange}
                                                name='yarnName'
                                                value={values.yarnName}
                                                error={touched.yarnName && Boolean(errors.yarnName)}
                                                helperText={touched.yarnName && errors.yarnName}
                                                placeholder={String.yarn_placeholder} id="outlined-basic" autoComplete='off' sx={{ width: "100%" }} variant="outlined"
                                                className='yeinput' />
                                        </div>

                                        <div className='yeinputconatiner'>
                                            <InputLabel className="yelabel " >
                                                {String.rate_label}
                                            </InputLabel>
                                            <TextField
                                                name='yarnRate'
                                                onChange={handleChange}
                                                value={values.yarnRate}
                                                error={touched.yarnRate && Boolean(errors.yarnRate)}
                                                helperText={touched.yarnRate && errors.yarnRate}
                                                placeholder={String.rate_placeholder} id="outlined-basic" autoComplete='off' sx={{ width: "100%" }} variant="outlined"
                                                className='yeinput' />
                                        </div>

                                        <div className='yedit_check_box' >
                                            <Checkbox
                                                name='isAll'
                                                checked={isAll}
                                                onChange={handleChangeisall} />

                                            <Typography className='yeheading_text'
                                                variant="span"
                                                component="span">
                                                {String.yarn_checkbox}
                                            </Typography>
                                        </div>

                                        <div className='yequality'>
                                            {yarnQualityData?.map((quality) => {
                                                return (
                                                    <>
                                                        <Accordion className='mainaccordion'>
                                                            <AccordionSummary
                                                                sx={{ height: "5px" }}
                                                                expandIcon={<ExpandMoreIcon />}
                                                                aria-controls="panel1a-content"
                                                                id="panel1a-header">
                                                                <div className='Accordion_heading'>
                                                                    <div className='Accordion_checkboxs'>
                                                                        <FormControlLabel
                                                                            control={<Checkbox sx={{ pointerEvents: "none" }} checked={selectedQualityIds.includes(quality._id)}
                                                                                onChange={(e) => {
                                                                                    handleQualityCheckboxChange(quality._id)
                                                                                    e.stopPropagation()
                                                                                }} />} />
                                                                        <Typography> {quality?.qualityName}</Typography>
                                                                    </div>
                                                                    <Typography>
                                                                        {`${String.money} : ${quality?.qualityCost.toFixed(2)} | ${String.akg} : ${quality?.qualityWeight.toFixed(2)}`}
                                                                    </Typography>
                                                                </div>
                                                            </AccordionSummary>

                                                            <AccordionDetails className='Accordioninfo'>
                                                                <Button className='btn_warp' variant="outlined" >
                                                                    <div className='btn_info'>
                                                                        <div>
                                                                            {String.warp_heafing}
                                                                        </div>
                                                                        <div>
                                                                            {String.warp_w} {quality?.warp?.totalWarpWeight} | {String.warp_c} {quality?.warp?.totalWarpCost}
                                                                        </div>
                                                                    </div>
                                                                </Button>

                                                                <div className='wrap_box' >
                                                                    {quality?.warp?.warpData?.map((wrap) => {
                                                                        return (
                                                                            <>
                                                                                <Box className='box_content' component="span">
                                                                                    <div className='heading1'  >
                                                                                        <div>
                                                                                            <Typography className='heading_text'
                                                                                                variant="span"
                                                                                                component="span">
                                                                                                {wrap?.warpCompany?.yarnCompanyName}
                                                                                            </Typography>
                                                                                        </div>
                                                                                        <div>
                                                                                            <Typography className='heading_text'
                                                                                                variant="span"
                                                                                                component="span">
                                                                                                {String.money} : {wrap?.warpCost}
                                                                                            </Typography>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className='heading2' >
                                                                                        <div>
                                                                                            <Typography
                                                                                                className='heading_text'
                                                                                                variant="span"
                                                                                                component="span">
                                                                                                {wrap?.warpYarn?.yarnName}
                                                                                            </Typography>
                                                                                        </div>
                                                                                        <div>
                                                                                            <Typography
                                                                                                className='heading_text'
                                                                                                variant="span"
                                                                                                component="span">
                                                                                                {String.kg} : {wrap?.warpWeight}
                                                                                            </Typography>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className='after_heading' >
                                                                                        <div>
                                                                                            <InputLabel className='heading_text' >{String.Deniar}</InputLabel>
                                                                                            <Typography
                                                                                                className='heading_text'
                                                                                                variant="span"
                                                                                                component="span">
                                                                                                {wrap?.warpDeniar}
                                                                                            </Typography>
                                                                                        </div>
                                                                                        <div className='dashed_border' />
                                                                                        <div>
                                                                                            <InputLabel className='heading_text' >{String.Shortage}</InputLabel>
                                                                                            <Typography
                                                                                                className='heading_text'
                                                                                                variant="span"
                                                                                                component="span">
                                                                                                {wrap?.warpShortage}
                                                                                            </Typography>
                                                                                        </div>
                                                                                        <div className='dashed_border' />
                                                                                        <div>
                                                                                            <InputLabel className='heading_text' >{String.Ends}</InputLabel>
                                                                                            <Typography
                                                                                                className='heading_text'
                                                                                                variant="span"
                                                                                                component="span">
                                                                                                {wrap?.warpBeamEnds}
                                                                                            </Typography>
                                                                                        </div>
                                                                                        <div className='dashed_border' />
                                                                                        <div>
                                                                                            <InputLabel className='heading_text' >{String.Y_Rate}</InputLabel>
                                                                                            <Typography
                                                                                                className='heading_text'
                                                                                                variant="span"
                                                                                                component="span">
                                                                                                {wrap?.warpYarnRate}
                                                                                            </Typography>
                                                                                        </div>
                                                                                        <div className='dashed_border' />
                                                                                        <div>
                                                                                            <InputLabel className='heading_text' >{String.TPM}</InputLabel>
                                                                                            <Typography
                                                                                                className='heading_text'
                                                                                                variant="span"
                                                                                                component="span">
                                                                                                {wrap?.tpm}
                                                                                            </Typography>
                                                                                        </div>
                                                                                    </div>
                                                                                </Box >
                                                                            </>
                                                                        )
                                                                    })}
                                                                </div>
                                                                <Button className='btn_warp' variant="outlined" sx={{ marginTop: "0.6rem" }} >
                                                                    <div className='btn_info'>
                                                                        <div>
                                                                            {String.weft_heading}
                                                                        </div>
                                                                        <div>
                                                                            {String.warp_w} {quality?.weft?.totalWeftWeight} | {String.warp_c} {quality?.weft?.totalWeftCost}
                                                                        </div>
                                                                    </div>
                                                                </Button>

                                                                <div className='wrap_box' >
                                                                    {quality?.weft?.weftData?.map((weft) => {
                                                                        return (
                                                                            <>
                                                                                <Box className='box_content' component="span">
                                                                                    <div className='heading1' >
                                                                                        <div>
                                                                                            <Typography className='heading_text'
                                                                                                variant="span"
                                                                                                component="span">
                                                                                                {weft?.weftCompany?.yarnCompanyName}
                                                                                            </Typography>
                                                                                        </div>
                                                                                        <div>
                                                                                            <Typography className='heading_text'
                                                                                                variant="span"
                                                                                                component="span">
                                                                                                {String.money} : {weft?.weftCost}
                                                                                            </Typography>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className='heading2' >
                                                                                        <div>
                                                                                            <Typography
                                                                                                className='heading_text'
                                                                                                variant="span"
                                                                                                component="span">
                                                                                                {weft?.weftYarn?.yarnName}
                                                                                            </Typography>
                                                                                        </div>
                                                                                        <div>
                                                                                            <Typography
                                                                                                className='heading_text'
                                                                                                variant="span"
                                                                                                component="span">
                                                                                                {String.kg} : {weft?.weftWeight}
                                                                                            </Typography>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className='after_heading' >
                                                                                        <div>
                                                                                            <InputLabel className='heading_text' >{String.Deniar}</InputLabel>
                                                                                            <Typography
                                                                                                className='heading_text'
                                                                                                variant="span"
                                                                                                component="span">
                                                                                                {weft?.weftDeniar}
                                                                                            </Typography>
                                                                                        </div>
                                                                                        <div className='dashed_border' />
                                                                                        <div>
                                                                                            <InputLabel className='heading_text' >{String.Pick}</InputLabel>
                                                                                            <Typography
                                                                                                className='heading_text'
                                                                                                variant="span"
                                                                                                component="span">
                                                                                                {weft?.weftPick}
                                                                                            </Typography>
                                                                                        </div>
                                                                                        <div className='dashed_border' />
                                                                                        <div>
                                                                                            <InputLabel className='heading_text' >{String.Wastage}</InputLabel>
                                                                                            <Typography
                                                                                                className='heading_text'
                                                                                                variant="span"
                                                                                                component="span">
                                                                                                {weft?.weftWastage}
                                                                                            </Typography>
                                                                                        </div>
                                                                                        <div className='dashed_border' />
                                                                                        <div>
                                                                                            <InputLabel className='heading_text' >{String.Width}</InputLabel>
                                                                                            <Typography
                                                                                                className='heading_text'
                                                                                                variant="span"
                                                                                                component="span">
                                                                                                {weft?.weftWidth}
                                                                                            </Typography>
                                                                                        </div>
                                                                                        <div className='dashed_border' />
                                                                                        <div>
                                                                                            <InputLabel className='heading_text' >{String.Y_Rate}</InputLabel>
                                                                                            <Typography
                                                                                                className='heading_text'
                                                                                                variant="span"
                                                                                                component="span">
                                                                                                {weft?.weftYarnRate}
                                                                                            </Typography>
                                                                                        </div>
                                                                                        <div className='dashed_border' />
                                                                                        <div>
                                                                                            <InputLabel className='heading_text' >{String.TPM}</InputLabel>
                                                                                            <Typography
                                                                                                className='heading_text'
                                                                                                variant="span"
                                                                                                component="span">
                                                                                                {weft?.tpm}
                                                                                            </Typography>
                                                                                        </div>
                                                                                    </div>
                                                                                </Box>
                                                                            </>
                                                                        )
                                                                    })}
                                                                </div>
                                                            </AccordionDetails>
                                                        </Accordion>
                                                    </>
                                                )
                                            })}
                                        </div>
                                        <div className='yebtns'>
                                            {isLoading ? <Loader /> : (<Stack direction="row" spacing={1}>
                                                <Buttons onClick={toggleDrawer}  className={'yebtn_cancel'} variant={"outlined"} button_name={String.ycancel} />
                                                <Buttons type={'submit'} className={'yebtn_done'} variant={"contained"} button_name={String.update_yarn} />
                                            </Stack>)}
                                        </div>
                                    </div>
                                )}
                            </Form>
                        )
                    }}
                </Formik>
            </Drawer >
        </>
    )
}
