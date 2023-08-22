import { Button, Drawer, FormHelperText, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import * as Yup from "yup";
import "../../style/Quality/AddQualityForm.scss"
import { useEffect, useState } from 'react';
import { useGetCompanyQuery, useGetYarnQuery } from '../../api/Quality';
import AddYarnDialog from './AddYarnDialog';
import { Form, Formik } from 'formik';
import { String } from '../../constants/String';
import { Regex } from '../../constants/Regex';
import AddCompannyDialog from './AddCompannyDialog';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


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

    console.log(initialValues, "opoopopopopopp")

    // useEffect(() => {
    //     // Check if editdata.index is defined and wrapData at that index exists
    //     if (editdata.index !== undefined && wrapData[editdata.index]) {
    //         setInitialValues(wrapData[editdata.index]);
    //     } else {
    //         // If not defined or doesn't exist, reset the form
    //         setInitialValues({
    //             warpCompany: "",
    //             warpYarn: "",
    //             warpWeight: "",
    //             warpCost: "",
    //             warpDeniar: "",
    //             warpBeamEnds: "",
    //             warpShortage: "",
    //             warpYarnRate: "",
    //             tpm: "",
    //             warpYarnName: "",
    //             warpCompnayName: "",
    //         });
    //     }
    // }, [editdata.index, wrapData]);

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


    console.log(initialValues, "---------------opoopopopopopp")

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
        warpCompany: Yup.string().required(String.warpyarn_required),
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
            <Drawer anchor="right" open={isDrawerOpen} className='drawer' >

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} >

                    {({
                        values,
                        handleChange,
                        errors,
                        touched,
                        setFieldValue
                    }) => (
                        <Form>
                            {console.log(values, "yyyyyyyyyyyyyyyyyyyyyyy")}
                            <div className='heading' >

                                <div >

                                    <Typography
                                        className="heading_text"
                                        variant="span"
                                        component="span">
                                        {"Warp"}
                                    </Typography>

                                </div>

                                <div>
                                    <Typography
                                        className="heading_text"
                                        variant="span"
                                        component="span">
                                        {"W:00.00 | C:00.00"}
                                    </Typography>
                                </div>

                                <div onClick={toggleDrawers} className='close_icon'>
                                    <CloseIcon />
                                </div>

                            </div>



                            <div className='from'>


                                <div className='yarns_wrap'>


                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name='warpYarn'
                                        onChange={(e) => {
                                            handleChange(e);
                                            const selectedYarnId = e.target.value;
                                            const selectedYarn = YarnData?.result?.find(yarnItem => yarnItem._id === selectedYarnId);
                                            setFieldValue('warpYarnRate', selectedYarn?.yarnRate || '');
                                            setFieldValue("warpYarnName", selectedYarn?.yarnName || "")

                                            // Clear the error for the warpYarn field
                                            if (selectedYarnId) {
                                                setFieldValue('warpYarn', selectedYarnId);
                                            } else {
                                                setFieldValue('warpYarn', ''); // Reset the selected value
                                            }
                                        }}
                                        value={values.warpYarn}
                                        error={touched.warpYarn && Boolean(errors.warpYarn)}
                                        className='yarn_select'
                                        displayEmpty

                                    >
                                        <MenuItem value="" disabled sx={{ display: "none" }}>
                                            {String.select_yarn}
                                        </MenuItem>
                                        {YarnData?.result?.map((yarnItem) => (
                                            <MenuItem className='yarn_menu' key={yarnItem?.id} value={yarnItem?._id} sx={{ display: "flex", justifyContent: "space-between" }}>
                                                <div>
                                                    {yarnItem?.yarnName}
                                                </div>
                                                <div>
                                                    {`${yarnItem?.yarnRate} ₹`}
                                                </div>
                                            </MenuItem>
                                        ))}
                                    </Select>

                                    {/* <Button onClick={handleOpenAddYarn} className='add_yarn' variant="outlined">Add</Button> */}

                                    <AddCircleOutlineIcon className='add_yarn' onClick={handleOpenAddYarn} />



                                </div>


                                <FormHelperText sx={{ marginLeft: "0.9rem" }}>{touched.warpYarn && errors.warpYarn}</FormHelperText>




                                <div className='company_wrap'>


                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"

                                        onChange={(e) => {



                                            handleChange(e);
                                            const selectedCompanyId = e.target.value;
                                            const selectedCompay = CompanyData?.result?.find(Company => Company._id === selectedCompanyId);

                                            setFieldValue("warpCompnayName", selectedCompay?.yarnCompanyName || "")



                                            if (selectedCompanyId) {
                                                setFieldValue('warpCompany', selectedCompanyId);
                                            } else {
                                                setFieldValue('warpCompany', '');
                                            }
                                        }}

                                        value={values.warpCompany}
                                        error={touched.warpCompany && Boolean(errors.warpCompany)}
                                        className='company_select'
                                        displayEmpty

                                    >
                                        <MenuItem value="" disabled sx={{ display: "none" }}>
                                            {String.select_company}
                                        </MenuItem>
                                        {CompanyData?.result?.map((Company) => (
                                            <MenuItem className='company_menu' key={Company?._id} value={Company?._id}  >

                                                {Company?.yarnCompanyName}

                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {/* 
                                    <Button onClick={handleOpenAddCompany} className='add_company' variant="outlined">Add</Button> */}

                                    <AddCircleOutlineIcon className='add_company' onClick={handleOpenAddCompany} />

                                </div>
                                <FormHelperText sx={{ marginLeft: "0.9rem" }}>{touched.warpCompany && errors.warpCompany}</FormHelperText>


                                <div className='inputs'>
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
                                    ></TextField>
                                    <TextField onChange={handleChange}
                                        value={values.warpBeamEnds}
                                        error={touched.warpBeamEnds && Boolean(errors.warpBeamEnds)}
                                        helperText={touched.warpBeamEnds && errors.warpBeamEnds} placeholder={String.ends_placeholder} name="warpBeamEnds" autoComplete='off' id="outlined-basic" variant="outlined"></TextField>
                                </div>
                                <div className='inputs'>
                                    <TextField onChange={handleChange}
                                        value={values.warpShortage}
                                        error={touched.warpShortage && Boolean(errors.warpShortage)}
                                        helperText={touched.warpShortage && errors.warpShortage} placeholder={String.shortage_placeholder} name="warpShortage" autoComplete='off' id="outlined-basic" variant="outlined"></TextField>
                                    <TextField onChange={handleChange}
                                        value={values.warpYarnRate}
                                        error={touched.warpYarnRate && Boolean(errors.warpYarnRate)}
                                        helperText={touched.warpYarnRate && errors.warpYarnRate} placeholder={String.yrate_placeholder} name="warpYarnRate" autoComplete='off' id="outlined-basic" variant="outlined"></TextField>
                                </div>
                                <div className='inputs'>
                                    <TextField onChange={handleChange}
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
                        </Form>)}
                </Formik>
            </Drawer>


            <AddYarnDialog open={openAdd} onClose={handleCloseAddYarn} />
            <AddCompannyDialog open={openAddCompnay} onClose={handleCloseAddCompany} />
        </>
    )
}
