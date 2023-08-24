import { Autocomplete, Button, Drawer, FormControl, FormHelperText, IconButton, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material'

import * as Yup from "yup";
import "../../style/Quality/AddQualityForm.scss"
import { useState } from 'react';
import { useGetCompanyQuery, useGetYarnQuery } from '../../api/Quality';
import AddYarnDialog from './AddYarnDialog';
import { Form, Formik } from 'formik';
import { String } from '../../constants/String';
import { Regex } from '../../constants/Regex';
import AddCompannyDialog from './AddCompannyDialog';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


export default function WarpDrawer({ editdata, Tar, setTar, setWrapSumweight, WrapSumweight, toggleDrawer, isDrawerOpen, setWrapData, wrapData, wrapSumCost, setWrapSumCost }) {


    let initialValues =
    {
        warpCompany: "",
        warpYarn: "",
        warpWeight: "",
        warpCost: "",
        warpDeniar: "",
        warpBeamEnds: "",
        warpShortage: "",
        warpYarnRate: "",
        tpm: "",
        warpYarnName: "",
        warpCompnayName: "",
    };



    if (editdata.index !== undefined && wrapData[editdata.index]) {
        initialValues = wrapData[editdata.index];
    }
    else {
        initialValues =
        {
            warpCompany: "",
            warpYarn: "",
            warpWeight: "",
            warpCost: "",
            warpDeniar: "",
            warpBeamEnds: "",
            warpShortage: "",
            warpYarnRate: "",
            tpm: "",
            warpYarnName: "",
            warpCompnayName: "",
        };
    }

    // add yarn
    const [openAdd, setOpenAdd] = useState(false);

    const handleCloseAddYarn = () => {
        setOpenAdd(false);
    };
    const handleOpenAddYarn = () => {
        setOpenAdd(true);
    };

    //   add company
    const [openAddCompnay, setOpenAddCompnay] = useState(false);

    const handleCloseAddCompany = () => {
        setOpenAddCompnay(false);
    };
    const handleOpenAddCompany = () => {
        setOpenAddCompnay(true);
    };

    const { data: YarnData } = useGetYarnQuery();

    const { data: CompanyData } = useGetCompanyQuery();


    console.log(YarnData?.result)



    const validationSchema = Yup.object().shape({
        warpYarn: Yup.string().required(String.warpyarn_required),
        warpCompany: Yup.string().required(String.warpcompany_required),
        warpDeniar: Yup.string().required(String.warpdeniar_required).matches(Regex.wrap_item, String.warpdeniar_valid),
        warpBeamEnds: Yup.string().required(String.warpbeamends_required).matches(Regex.wrap_item, String.warpbeamends_valid),
        warpShortage: Yup.string().required(String.warpShortage_required).matches(Regex.wrap_item, String.warpShortage_valid),
        warpYarnRate: Yup.string().required(String.warpYarnRate_required).matches(Regex.wrap_item, String.warpYarnRate_valid),
        tpm: Yup.string().matches(Regex.wrap_item, String.tpm_valid)
    });

    const cal = async (values) => {
        const value = (((values.warpDeniar * values.warpBeamEnds) * values.warpShortage / 100 + (values.warpDeniar * values.warpBeamEnds)) / 9000000)
        const cost = Number((value * values.warpYarnRate).toFixed(2));

        const weight = Number((value * 100).toFixed(2));

        values.warpWeight = weight;
        values.warpCost = cost;

        const tar = values.warpBeamEnds;
        setWrapSumCost([...wrapSumCost, cost])
        setWrapSumweight([...WrapSumweight, weight])
        setTar([...Tar, tar])
    }


    const handleSubmit = (values) => {
        if (editdata.index !== undefined) {

            const updatedWrapData = [...wrapData];
            updatedWrapData[editdata.index] = values;
            setWrapData(updatedWrapData);
        } else {

            setWrapData([...wrapData, values]);
        }

        cal(values);

        if (editdata.index !== undefined) {
            editdata.index = undefined
        }
        toggleDrawer();
    }

    const toggleDrawers = () => {
        toggleDrawer();
        if (editdata.index !== undefined) {
            editdata.index = undefined
        }
    }
    return (
        <>
            <Drawer transitionDuration={1000} anchor="right" open={isDrawerOpen} className='drawer' >

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} >

                    {({
                        values,
                        handleChange,
                        errors,
                        touched,
                        setFieldValue,
                        setFieldTouched,
                        setFieldError
                    }) => {
                        const value = (((values.warpDeniar * values.warpBeamEnds) * values.warpShortage / 100 + (values.warpDeniar * values.warpBeamEnds)) / 9000000)
                        const weight = Number((value * 100).toFixed(2));
                        const cost = Number((value * values.warpYarnRate).toFixed(2));
                        return (
                            <Form>



                                <Paper className='heading_paper'>

                                    <div className='heading' >

                                        <div>
                                            <Typography
                                                className="heading_text"
                                                variant="span"
                                                component="span">
                                                {String.warp_heafing}
                                            </Typography>

                                        </div>

                                        <div>
                                            <Typography
                                                className="heading_text"
                                                variant="span"
                                                component="span">
                                                {String.dweight} {weight.toFixed(2)} | {String.dcost} {cost.toFixed(2)}
                                            </Typography>
                                        </div>

                                        <div onClick={toggleDrawers} className='close_icon'>
                                            <HighlightOffIcon />
                                        </div>
                                    </div>
                                </Paper>


                                <div className='from'>

                                    <div className='yarns_wrap'>
                                        <FormControl fullWidth>
                                            <Autocomplete
                                                sx={{ width: "98%" }}
                                                id='warpYarn'
                                                name='warpYarn'
                                                options={YarnData?.result || []}
                                                getOptionLabel={(option) => option ? `${option.yarnName} - ${option.yarnRate} ₹` : ''}
                                                value={YarnData?.result?.find((yarnItem) => yarnItem._id === values.warpYarn) || null}
                                                onChange={(e, newValue) => {
                                                    if (newValue) {
                                                        setFieldValue('warpYarn', newValue._id || '');
                                                        setFieldValue('warpYarnRate', newValue.yarnRate || '');
                                                        setFieldValue('warpYarnName', newValue.yarnName || '');
                                                        setFieldTouched('warpYarn', false);
                                                        setFieldError('warpYarn', '');
                                                    } else {
                                                        setFieldValue('warpYarn', '');
                                                        setFieldValue('warpYarnRate', '');
                                                        setFieldValue('warpYarnName', '');
                                                        setFieldTouched('warpYarn', true);
                                                        setFieldError('warpYarn', String.warpyarn_required);
                                                    }
                                                }}
                                                renderOption={(props, yarnItem) => (
                                                    <MenuItem
                                                        {...props}
                                                        className='yarn_menu'
                                                        key={yarnItem?._id}
                                                        value={yarnItem?._id}
                                                        sx={{ display: "flex", justifyContent: "space-between" }}
                                                    >
                                                        <div>
                                                            {yarnItem?.yarnName}
                                                        </div>
                                                        <div>
                                                            {`${yarnItem?.yarnRate} ₹`}
                                                        </div>
                                                    </MenuItem>
                                                )}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label={String.select_yarn}
                                                        variant='outlined'
                                                    />
                                                )}
                                            />

                                        </FormControl>



                                        <IconButton className='add_icon' onClick={handleOpenAddYarn}>
                                            <AddCircleOutlineIcon className='add_yarn' />
                                        </IconButton>


                                    </div>


                                    <FormHelperText sx={{ marginLeft: "0.9rem" }}>{touched.warpYarn && errors.warpYarn}</FormHelperText>




                                    <div className='company_wrap'>

                                        <FormControl fullWidth>
                                            <Autocomplete
                                                sx={{ width: "98%" }}
                                                id='warpCompany'
                                                name='warpCompany'
                                                options={CompanyData?.result || []}
                                                getOptionLabel={(option) => option?.yarnCompanyName || ''}
                                                value={CompanyData?.result?.find((company) => company._id === values.warpCompany) || null}
                                                onChange={(e, newValue) => {
                                                    if (newValue) {
                                                        setFieldValue('warpCompany', newValue._id || '');
                                                        setFieldValue('warpCompnayName', newValue.yarnCompanyName || '');
                                                        setFieldTouched('warpCompany', false);
                                                        setFieldError('warpCompany', '');
                                                    } else {
                                                        setFieldValue('warpCompany', '');
                                                        setFieldValue('warpCompnayName', '');
                                                        setFieldTouched('warpCompany', true);
                                                        setFieldError('warpCompany', String.select_company);
                                                    }
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label={String.select_company}
                                                        variant='outlined'
                                                    />
                                                )}
                                            />

                                        </FormControl>



                                        <IconButton className='add_icon'>
                                            <AddCircleOutlineIcon className='add_company' onClick={handleOpenAddCompany} />
                                        </IconButton>

                                    </div>
                                    <FormHelperText sx={{ marginLeft: "0.9rem" }}>{touched.warpCompany && errors.warpCompany}</FormHelperText>

                                    <div className='input_all'>

                                        <div className='inputs'>

                                            <InputLabel className="drawer_label" >
                                                {String.deniar_placeholder}
                                            </InputLabel>
                                            <TextField
                                                onChange={handleChange}
                                                value={values.warpDeniar}
                                                error={touched.warpDeniar && Boolean(errors.warpDeniar)}
                                                helperText={touched.warpDeniar && errors.warpDeniar}
                                                placeholder={String.deniar_placeholder}
                                                name="warpDeniar"
                                                autoComplete='off'
                                                id="outlined-basic"
                                                variant="outlined"
                                                className='input'
                                            ></TextField>
                                        </div>

                                        <div className='inputs'>
                                            <InputLabel className="drawer_label" >
                                                {String.ends_placeholder}
                                            </InputLabel>
                                            <TextField onChange={handleChange}
                                                className='input'
                                                value={values.warpBeamEnds}
                                                error={touched.warpBeamEnds && Boolean(errors.warpBeamEnds)}
                                                helperText={touched.warpBeamEnds && errors.warpBeamEnds} placeholder={String.ends_placeholder} name="warpBeamEnds" autoComplete='off' id="outlined-basic" variant="outlined"></TextField>
                                        </div>
                                        <div className='inputs'>

                                            <InputLabel className="drawer_label" >
                                                {String.shortage_placeholder}
                                            </InputLabel>
                                            <TextField onChange={handleChange}
                                                className='input'
                                                value={values.warpShortage}
                                                error={touched.warpShortage && Boolean(errors.warpShortage)}
                                                helperText={touched.warpShortage && errors.warpShortage} placeholder={String.shortage_placeholder} name="warpShortage" autoComplete='off' id="outlined-basic" variant="outlined"></TextField>

                                        </div>


                                        <div className='inputs'>
                                            <InputLabel className="drawer_label" >
                                                {String.yrate_placeholder}
                                            </InputLabel>
                                            <TextField onChange={handleChange}
                                                className='input'
                                                value={values.warpYarnRate}
                                                error={touched.warpYarnRate && Boolean(errors.warpYarnRate)}
                                                helperText={touched.warpYarnRate && errors.warpYarnRate} placeholder={String.yrate_placeholder} name="warpYarnRate" autoComplete='off' id="outlined-basic" variant="outlined"></TextField>
                                        </div>


                                        <div className='inputs'>
                                            <InputLabel className="drawer_label" >
                                                {String.tpm_placeholder}
                                            </InputLabel>
                                            <TextField onChange={handleChange}
                                                className='input'
                                                value={(values.tpm)}
                                                error={touched.tpm && Boolean(errors.tpm)}
                                                helperText={touched.tpm && errors.tpm} placeholder={String.tpm_placeholder} name={"tpm"} autoComplete='off' id="outlined-basic" variant="outlined"></TextField>
                                        </div>

                                        <div className='btns'>
                                            <Stack direction="row" spacing={1}>
                                                <Button onClick={toggleDrawers} className='btn_cancel' variant="outlined">{String.warp_Cancel}</Button>
                                                <Button className='btn_done' type='submit' variant="contained">{String.warp_done}</Button>

                                            </Stack>
                                        </div>
                                    </div>

                                </div>
                            </Form>
                        )
                    }
                    }
                </Formik>
            </Drawer >

            <AddYarnDialog open={openAdd} onClose={handleCloseAddYarn} />
            <AddCompannyDialog open={openAddCompnay} onClose={handleCloseAddCompany} />
        </>
    )
}
