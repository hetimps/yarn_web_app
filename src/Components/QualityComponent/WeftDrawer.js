import { Button, Drawer, FormHelperText, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
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


export default function WeftDrawer({  Width,setWidth,setPickSum, pickSum, setweftSumCost, weftSumCost, setweftSumweight, weftSumweight, toggleDrawerWeft, isDrawerOpenWeft, setweftData, weftData }) {



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

    const defaultValue = {
        weftCompany: "",
        weftYarn: "",
        weftWeight:"",
        weftCost:"",
        weftDeniar: "",
        weftPick: "",
        weftWidth: "",
        weftWastage: "",
        weftYarnRate: "",
        tpm: "",
        wefYarnName: "",
        wefCompnayName: "",

    };

    const validationSchema = Yup.object().shape({
        weftYarn: Yup.string().required(String.weftYarn_required),
        weftCompany: Yup.string().required(String.weftCompany_required),
        weftDeniar: Yup.string().required(String.weftDeniar_required).matches(Regex.wrap_item, String.weftDeniar_valid),
        weftPick: Yup.string().required(String.weftPick_required).matches(Regex.wrap_item, String.weftPick_valid),
        weftWidth: Yup.string().required(String.weftWidth_required).matches(Regex.wrap_item, String.weftWidth_valid),
        weftYarnRate: Yup.string().required(String.weftYarnRate_required).matches(Regex.wrap_item, String.weftYarnRate_valid),
        weftWastage: Yup.string().required(String.weftWastage_required).matches(Regex.wrap_item, String.weftWastage_valid),
        tpm: Yup.string().matches(Regex.wrap_item, String.wefttpm_valid)
    });

    const calculation = async (values) => {
        const value = (((values.weftDeniar * values.weftPick * values.weftWidth) * values.weftWastage / 100 + (values.weftDeniar * values.weftPick * values.weftWidth)) / 9000000)

        const cost = Number((value * values.weftYarnRate).toFixed(2));



        const weight = Number((value * 100).toFixed(2));


        const pick = Number(values.weftPick)

        const width = Number(values.weftWidth)

        values.weftWeight = weight
        values.weftCost = cost




        setweftSumCost([...weftSumCost, cost])
        setweftSumweight([...weftSumweight, weight])
        setPickSum([...pickSum,pick])
        setWidth([...Width,width])
       
    

    }

    const handleSubmit = async (values) => {
        console.log(values, "weft value")


        setweftData([...weftData, values])
        // values.tpm = parseFloat(values.tpm);
        

        calculation(values);
        toggleDrawerWeft();
    }

    return (
        <>
            <Drawer anchor="right" open={isDrawerOpenWeft}  className='drawer'>

                <Formik initialValues={defaultValue} validationSchema={validationSchema} onSubmit={handleSubmit}  >
                    {({
                        values,
                        handleChange,
                        errors,
                        touched,
                        setFieldValue
                    }) => (
                        <Form>
                            <div className='heading' >

                                <div >

                                    <Typography
                                        className="heading_text"
                                        variant="span"
                                        component="span">
                                        {String.weft_heading}
                                    </Typography>

                                </div>

                                <div>
                                    <Typography
                                        className="heading_text"
                                        variant="span"
                                        component="span">
                                        {String.weft_heading_value}
                                    </Typography>
                                </div>

                                <div onClick={toggleDrawerWeft} className='close_icon'>
                                    <CloseIcon />
                                </div>

                            </div>



                            <div className='from'>


                                <div className='yarns_wrap'>


                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name='weftYarn'
                                        onChange={(e) => {
                                            handleChange(e);
                                            const selectedYarnId = e.target.value;
                                            const selectedYarn = YarnData?.result?.find(yarnItem => yarnItem._id === selectedYarnId);
                                            setFieldValue('weftYarnRate', selectedYarn?.yarnRate || '');
                                            setFieldValue("wefYarnName", selectedYarn?.yarnName || "")

                                            // Clear the error for the warpYarn field
                                            if (selectedYarnId) {
                                                setFieldValue('weftYarn', selectedYarnId);
                                            } else {
                                                setFieldValue('weftYarn', ''); // Reset the selected value
                                            }
                                        }}
                                        value={values.weftYarn}
                                        error={touched.weftYarn && Boolean(errors.weftYarn)}
                                        className='yarn_select'
                                        displayEmpty

                                    >
                                        <MenuItem value="" disabled sx={{display:"none"}}>
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

                                    <AddCircleOutlineIcon className='add_yarn' onClick={handleOpenAddYarn} />

                                </div>


                                <FormHelperText sx={{ marginLeft: "0.9rem" }}>{touched.weftYarn && errors.weftYarn}</FormHelperText>




                                <div className='company_wrap'>


                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name='weftCompany'

                                        onChange={(e) => {



                                            handleChange(e);
                                            const selectedCompanyId = e.target.value;
                                            const selectedCompay = CompanyData?.result?.find(Company => Company._id === selectedCompanyId);

                                            setFieldValue("wefCompnayName", selectedCompay?.yarnCompanyName || "")



                                            if (selectedCompanyId) {
                                                setFieldValue('weftCompany', selectedCompanyId);
                                            } else {
                                                setFieldValue('weftCompany', '');
                                            }
                                        }}

                                        value={values.weftCompany}
                                        error={touched.weftCompany && Boolean(errors.weftCompany)}
                                        className='company_select'
                                        displayEmpty

                                    >
                                        <MenuItem value="" disabled sx={{display:"none"}}>
                                            {String.select_company}
                                        </MenuItem>
                                        {CompanyData?.result?.map((Company) => (
                                            <MenuItem className='company_menu' key={Company?._id} value={Company?._id}  >

                                                {Company?.yarnCompanyName}

                                            </MenuItem>
                                        ))}
                                    </Select>

                                    <AddCircleOutlineIcon className='add_company' onClick={handleOpenAddCompany} />

                                </div>
                                <FormHelperText sx={{ marginLeft: "0.9rem" }}>{touched.weftCompany && errors.weftCompany}</FormHelperText>


                                <div className='inputs'>

                                    <TextField onChange={handleChange}
                                        value={values.weftDeniar}
                                        error={touched.weftDeniar && Boolean(errors.weftDeniar)}
                                        helperText={touched.weftDeniar && errors.weftDeniar} placeholder={String.weftDeniar_placeholder} name="weftDeniar" autoComplete='off' id="outlined-basic" variant="outlined"></TextField>
                                    <TextField onChange={handleChange}
                                        value={values.weftPick}
                                        error={touched.weftPick && Boolean(errors.weftPick)}
                                        helperText={touched.weftPick && errors.weftPick} placeholder={String.weftPick_placeholder} name="weftPick" autoComplete='off' id="outlined-basic" variant="outlined"></TextField>
                                </div>
                                <div className='inputs'>
                                    <TextField onChange={handleChange}
                                        value={values.weftWidth}
                                        error={touched.weftWidth && Boolean(errors.weftWidth)}
                                        helperText={touched.weftWidth && errors.weftWidth} placeholder={String.weftWidth_placeholder} name="weftWidth" autoComplete='off' id="outlined-basic" variant="outlined"></TextField>
                                    <TextField onChange={handleChange}
                                        value={values.weftYarnRate}
                                        error={touched.weftYarnRate && Boolean(errors.weftYarnRate)}
                                        helperText={touched.weftYarnRate && errors.weftYarnRate} placeholder={String.weftYarnRate_placeholder} name="weftYarnRate" autoComplete='off' id="outlined-basic" variant="outlined"></TextField>
                                </div>
                                <div className='inputs'>
                                    <TextField onChange={handleChange}
                                        value={values.weftWastage}
                                        error={touched.weftWastage && Boolean(errors.weftWastage)}
                                        helperText={touched.weftWastage && errors.weftWastage} placeholder={String.weftWastage_placeholder} name={"weftWastage"} autoComplete='off' id="outlined-basic" variant="outlined"></TextField>

                                    <TextField onChange={handleChange}
                                        value={values.tpm}
                                        error={touched.tpm && Boolean(errors.tpm)}
                                        helperText={touched.tpm && errors.tpm} placeholder={String.wefttpm_yarn} name={"tpm"} autoComplete='off' id="outlined-basic" variant="outlined"></TextField>
                                </div>



                                <div className='btns'>
                                    <Stack direction="row" spacing={1}>
                                        <Button className='btn_done' type='submit' variant="contained">{String.warp_done}</Button>
                                        <Button onClick={toggleDrawerWeft} className='btn_cancel' variant="outlined">{String.warp_Cancel}</Button>
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
