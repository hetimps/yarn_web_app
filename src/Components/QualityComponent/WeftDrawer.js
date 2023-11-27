import { Autocomplete, Drawer, FormControl, FormHelperText, IconButton, InputLabel, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import * as Yup from "yup";
import "../../style/Quality/AddQualityForm.scss"
import { useEffect, useState } from 'react';
import { useGetCompanyQuery } from '../../api/Quality';
import AddYarnDialog from './AddYarnDialog';
import { Form, Formik } from 'formik';
import { String } from '../../constants/String';
import { Regex } from '../../constants/Regex';
import AddCompannyDialog from './AddCompannyDialog';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useGetYarnQuery } from '../../api/Yarn';
import { Buttons } from '../ComonComponent/CustomButtons';

export default function WeftDrawer({ editweftData, Width, setWidth, setPickSum, pickSum, setweftSumCost, weftSumCost, setweftSumweight, weftSumweight, toggleDrawerWeft, isDrawerOpenWeft, setweftData, weftData }) {
    const page = 1;
    const limit = "";
    const search = "";
    const { data: YarnData } = useGetYarnQuery({ page, limit, search: search });
    const { data: CompanyData } = useGetCompanyQuery();
    const [openAddCompnay, setOpenAddCompnay] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);

    let initialValues = {
        weftCompany: "",
        weftYarn: "",
        weftDeniar: "",
        weftPick: "",
        weftWidth: "",
        weftWastage: "",
        weftYarnRate: "",
        tpm: "",
        wefYarnName: "",
        wefCompnayName: "",
        weftCost: "",
        weftWeight: "",
    };

    if (editweftData.index !== undefined && weftData[editweftData.index]) {
        const weftDatas = weftData[editweftData.index];
        initialValues = {
            weftCompany: weftDatas?.weftCompany?._id || weftDatas?.weftCompany,
            weftYarn: weftDatas?.weftYarn?._id || weftDatas?.weftYarn,
            weftDeniar: weftDatas?.weftDeniar,
            weftPick: weftDatas?.weftPick,
            weftWidth: weftDatas?.weftWidth,
            weftWastage: weftDatas?.weftWastage,
            weftYarnRate: weftDatas?.weftYarn?.yarnRate || weftDatas?.weftYarnRate,
            tpm: weftDatas?.tpm,
            wefYarnName: weftDatas?.weftYarn?.yarnName || weftDatas?.wefYarnName,
            wefCompnayName: weftDatas?.weftCompany?.yarnCompanyName || weftDatas?.wefCompnayName,
            weftWeight: weftDatas.weftWeight
        }
    }
    else {
        initialValues = {
            weftCompany: "",
            weftYarn: "",
            weftDeniar: "",
            weftPick: "",
            weftWidth: "",
            weftWastage: "",
            weftYarnRate: "",
            tpm: "",
            wefYarnName: "",
            wefCompnayName: "",
            weftCost: "",
            weftWeight: "",
        };
    }
    // add yarn
    const handleCloseAddYarn = () => {
        setOpenAdd(false);
    };
    const handleOpenAddYarn = () => {
        setOpenAdd(true);
    };

    //   add company
    const handleCloseAddCompany = () => {
        setOpenAddCompnay(false);
    };
    const handleOpenAddCompany = () => {
        setOpenAddCompnay(true);
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

    useEffect(() => {
        if (weftData && weftData.length > 0) {
            const defaultWeftPicks = weftData.map((weftItem) => Number(weftItem.weftPick));
            setPickSum(defaultWeftPicks);
            const defaultWeftWidth = weftData.map((weftItem) => Number(weftItem.weftWidth));
            setWidth(defaultWeftWidth);
            const defaultWeftCost = weftData.map((weftItem) => Number(weftItem.weftCost));
            setweftSumCost(defaultWeftCost)
            const defaultWeftWeight = weftData.map((weftItem) => Number(weftItem.weftWeight));
            setweftSumweight(defaultWeftWeight)
        }
    }, [weftData, setPickSum, setWidth, setweftSumCost, setweftSumweight]);

    const addWeftPickValue = async (value) => {
        if (!pickSum.includes(value)) {
            setPickSum([...pickSum, value]);
        }
    };
    const addWidthValue = async (value) => {
        if (!Width.includes(value)) {
            setWidth([...Width, value]);
        }
    };
    const addweftCost = async (value) => {
        if (!weftSumCost.includes(value)) {
            setweftSumCost([...weftSumCost, value]);
        }
    };
    const addweftWeight = async (value) => {
        if (!weftSumweight.includes(value)) {
            setweftSumCost([...weftSumweight, value]);
        }
    };

    const calculation = async (values) => {
        const value = (((values.weftDeniar * values.weftPick * values.weftWidth) * values.weftWastage / 100 + (values.weftDeniar * values.weftPick * values.weftWidth)) / 9000000)
        const cost = Number((value * values.weftYarnRate).toFixed(2));
        const weight = Number((value * 100).toFixed(2));
        const pick = Number(values.weftPick)
        const width = Number(values.weftWidth)
        values.weftWeight = weight;
        values.weftCost = cost;
        addweftWeight(weight)
        addweftCost(cost)
        addWeftPickValue(pick)
        addWidthValue(width)
    }

    const handleSubmit = async (values, { resetForm, setFieldValue }) => {
        if (editweftData.index !== undefined) {
            const updatedWeftData = [...weftData];
            updatedWeftData[editweftData.index] = values;
            setweftData(updatedWeftData);
        } else {
            setweftData([...weftData, values]);
        }
        calculation(values, setFieldValue);
        resetForm();
        toggleDrawerWeft();
    }

    const toggleDrawerWefts = () => {
        toggleDrawerWeft();
        if (editweftData.index !== undefined) {
            editweftData.index = undefined
        }
    }

    return (
        <>
            <Drawer transitionDuration={1000} anchor="right" open={isDrawerOpenWeft} className='drawer'>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}  >
                    {({
                        values,
                        handleChange,
                        errors,
                        touched,
                        setFieldValue,
                        setFieldError,
                        setFieldTouched
                    }) => {
                        const value = (((values.weftDeniar * values.weftPick * values.weftWidth) * values.weftWastage / 100 + (values.weftDeniar * values.weftPick * values.weftWidth)) / 9000000)
                        const cost = Number((value * values.weftYarnRate).toFixed(2));
                        const weight = Number((value * 100).toFixed(2));
                        return (
                            <Form >
                                <Paper className='heading_paper'>
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
                                                {String.dweight} {weight.toFixed(2)} | {String.dcost} {cost.toFixed(2)}
                                            </Typography>
                                        </div>
                                        <div onClick={toggleDrawerWefts} className='close_icon'>
                                            <HighlightOffIcon />
                                        </div>
                                    </div>
                                </Paper>
                                <div className='from'>
                                    <div className='yarns_wrap'>
                                        <FormControl fullWidth>
                                            <Autocomplete
                                                sx={{ width: "98%" }}
                                                id='weftYarn'
                                                name='weftYarn'
                                                options={YarnData?.result?.data || []}
                                                getOptionLabel={(option) => option ? `${option.yarnName} - ${option.yarnRate} ₹` : ''}
                                                value={YarnData?.result?.data?.find((yarnItem) => yarnItem._id === values.weftYarn) || null}
                                                onChange={(e, newValue) => {
                                                    if (newValue) {
                                                        setFieldValue('weftYarn', newValue._id || '');
                                                        setFieldValue('weftYarnRate', newValue.yarnRate || '');
                                                        setFieldValue('wefYarnName', newValue.yarnName || '');
                                                        setFieldTouched('weftYarn', false);
                                                        setFieldError('weftYarn', '');
                                                    } else {
                                                        setFieldValue('weftYarn', '');
                                                        setFieldValue('weftYarnRate', '');
                                                        setFieldValue('wefYarnName', '');
                                                        setFieldTouched('weftYarn', true);
                                                        setFieldError('weftYarn', String.weftYarn_required);
                                                    }
                                                }}
                                                renderOption={(props, yarnItem) => (
                                                    <MenuItem
                                                        {...props}
                                                        className='yarn_menu'
                                                        key={yarnItem?._id}
                                                        value={yarnItem?._id}
                                                        sx={{ display: "flex", justifyContent: "space-between" }}>
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
                                                        variant='outlined'/>
                                                )}/>
                                        </FormControl>
                                        <IconButton className='add_icon' onClick={handleOpenAddYarn}>
                                            <AddCircleOutlineIcon className='add_yarn' />
                                        </IconButton>
                                    </div>
                                    <FormHelperText sx={{ marginLeft: "0.9rem" }}>{touched.weftYarn && errors.weftYarn}</FormHelperText>
                                    <div className='company_wrap'>
                                        <FormControl fullWidth>
                                            <Autocomplete
                                                sx={{ width: "98%" }}
                                                id='weftCompany'
                                                name='weftCompany'
                                                options={CompanyData?.result || []}
                                                getOptionLabel={(option) => option?.yarnCompanyName || ''}
                                                value={CompanyData?.result?.find((company) => company._id === values.weftCompany) || null}
                                                onChange={(e, newValue) => {
                                                    if (newValue) {
                                                        setFieldValue('weftCompany', newValue._id || '');
                                                        setFieldValue('wefCompnayName', newValue.yarnCompanyName || '');
                                                        setFieldTouched('weftCompany', false);
                                                        setFieldError('weftCompany', '');
                                                    } else {
                                                        setFieldValue('weftCompany', '');
                                                        setFieldValue('wefCompnayName', '');
                                                        setFieldTouched('weftCompany', true);
                                                        setFieldError('weftCompany', String.select_company);
                                                    }
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label={String.select_company}
                                                        variant='outlined'
                                                    />
                                                )}/>
                                        </FormControl>
                                        <IconButton className='add_icon'>
                                            <AddCircleOutlineIcon className='add_company' onClick={handleOpenAddCompany} />
                                        </IconButton>
                                    </div>
                                    <FormHelperText sx={{ marginLeft: "0.9rem" }}>{touched.weftCompany && errors.weftCompany}</FormHelperText>
                                    <div className='input_all'>
                                        <div className='inputs'>
                                            <InputLabel className="drawer_label" >
                                                {String.weftDeniar_placeholder}
                                            </InputLabel>
                                            <TextField onChange={handleChange}
                                                className='input'
                                                value={values.weftDeniar}
                                                error={touched.weftDeniar && Boolean(errors.weftDeniar)}
                                                helperText={touched.weftDeniar && errors.weftDeniar} placeholder={String.weftDeniar_placeholder} name="weftDeniar" autoComplete='off' id="outlined-basic" variant="outlined"></TextField>
                                        </div>
                                        <div className='inputs'>
                                            <InputLabel className="drawer_label" >
                                                {String.weftPick_placeholder}
                                            </InputLabel>
                                            <TextField onChange={handleChange}
                                                className='input'
                                                value={values.weftPick}
                                                error={touched.weftPick && Boolean(errors.weftPick)}
                                                helperText={touched.weftPick && errors.weftPick} placeholder={String.weftPick_placeholder} name="weftPick" autoComplete='off' id="outlined-basic" variant="outlined"></TextField>
                                        </div>
                                        <div className='inputs'>
                                            <InputLabel className="drawer_label" >
                                                {String.weftWidth_placeholder}
                                            </InputLabel>
                                            <TextField onChange={handleChange}
                                                className='input'
                                                value={values.weftWidth}
                                                error={touched.weftWidth && Boolean(errors.weftWidth)}
                                                helperText={touched.weftWidth && errors.weftWidth} placeholder={String.weftWidth_placeholder} name="weftWidth" autoComplete='off' id="outlined-basic" variant="outlined"></TextField>
                                        </div>
                                        <div className='inputs'>
                                            <InputLabel className="drawer_label" >
                                                {String.weftYarnRate_placeholder}
                                            </InputLabel>
                                            <TextField onChange={handleChange}
                                                className='input'
                                                value={values.weftYarnRate}
                                                error={touched.weftYarnRate && Boolean(errors.weftYarnRate)}
                                                helperText={touched.weftYarnRate && errors.weftYarnRate} placeholder={String.weftYarnRate_placeholder} name="weftYarnRate" autoComplete='off' id="outlined-basic" variant="outlined"></TextField>
                                        </div>
                                        <div className='inputs'>
                                            <InputLabel className="drawer_label" >
                                                {String.weftWastage_placeholder}
                                            </InputLabel>
                                            <TextField onChange={handleChange}
                                                className='input'
                                                value={values.weftWastage}
                                                error={touched.weftWastage && Boolean(errors.weftWastage)}
                                                helperText={touched.weftWastage && errors.weftWastage} placeholder={String.weftWastage_placeholder} name={"weftWastage"} autoComplete='off' id="outlined-basic" variant="outlined"></TextField>
                                        </div>
                                        <div className='inputs'>
                                            <InputLabel className="drawer_label" >
                                                {String.wefttpm_yarn}
                                            </InputLabel>
                                            <TextField onChange={handleChange}
                                                className='input'
                                                value={values.tpm}
                                                error={touched.tpm && Boolean(errors.tpm)}
                                                helperText={touched.tpm && errors.tpm} placeholder={String.wefttpm_yarn} name={"tpm"} autoComplete='off' id="outlined-basic" variant="outlined"></TextField>
                                        </div>
                                        <div className='btns'>
                                            <Stack direction="row" spacing={1}>
                                                <Buttons onClick={toggleDrawerWefts}  className={'btn_cancel'} variant={"outlined"} button_name={String.warp_Cancel}/> 
                                                <Buttons type={'submit'}  className={'btn_done'} variant={"contained"} button_name={String.warp_done}/> 
                                            </Stack>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </Drawer>
            <AddYarnDialog open={openAdd} onClose={handleCloseAddYarn} />
            <AddCompannyDialog open={openAddCompnay} onClose={handleCloseAddCompany} />
        </>
    )
}
