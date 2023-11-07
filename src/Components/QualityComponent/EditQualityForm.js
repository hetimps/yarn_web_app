import React from 'react'
import "../../style/Quality/AddQualityForm.scss"
import { Box, Button, FormControlLabel, IconButton, InputLabel, Paper, Radio, RadioGroup, Stack, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useState } from 'react';
import { Form, Formik } from 'formik';
import InputLabels from './InputLabels';
import TextFields from './TextFields';
import * as Yup from "yup";
import { Regex } from '../../constants/Regex';
import { useEditQualityMutation, useGetEditQualityQuery } from '../../api/Quality';
import ConformDialog from './ConformDialog';
import { useLocation, useNavigate } from 'react-router-dom';
import { String } from '../../constants/String';
import Loader from '../ComonComponent/Loader';
import { toast } from 'react-hot-toast';
import WarpDrawer from './WarpDrawer';
import WeftDrawer from './WeftDrawer';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import CancelIcon from '@mui/icons-material/Cancel';
import { useEffect } from 'react';


export default function EditQualityForm() {

    const { state } = useLocation();
    const [id, setId] = useState(state ? state?._id : '');
    const { data, isFetching, refetch } = useGetEditQualityQuery(id);
    const [qeditdata, setQEditdata] = useState([]);

    useEffect(() => {
        refetch();
    }, [refetch])

    useEffect(() => {
        if (state && !isFetching) {
            setId(state?._id);
        }
        if (data) {
            setQEditdata(data?.result);
            setSelectedOption(data?.result?.expenseType)
        }
    }, [state, isFetching, data]);

    const navigaet = useNavigate();
    const [selectedOption, setSelectedOption] = useState("");

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const [isDrawerOpenWeft, setIsDrawerOpenWeft] = useState(false);
    const toggleDrawerWeft = () => {
        setIsDrawerOpenWeft(!isDrawerOpenWeft);
    };

    const handleChanger = (event) => {
        setSelectedOption(event.target.value);
    };

    const defaultValue = {
        qulaity: data?.result?.qualityName,
        cost: data?.result?.cost,
        rpm: data?.result?.rpm || 0,
        eff: data?.result?.efficiency || 0,
        mach: data?.result?.machine,
        reed: data?.result?.info?.reed,
        border: data?.result?.info?.border,
        pasramani: data?.result?.info?.pasramani,
        steam: data?.result?.info?.steam,
        panno: data?.result?.info?.panno,
        nozzle: data?.result?.info?.nozzle,
        letis: data?.result?.info?.letis,
        gsm: data?.result?.info?.gsm,
    };

    const [wrapDataRequired, setWrapDataRequired] = useState(false);
    const [weftDataRequired, setWeftDataRequired] = useState(false);

    const validationSchema = Yup.object().shape({

        qulaity: Yup.string().required(String.quality_required).matches(Regex.quality_name, String.quality_required),
        eff: Yup.string().matches(Regex.quality_item, String.quality_item_valid),
        cost: Yup.string().matches(Regex.quality_item, String.quality_item_valid),
        rpm: Yup.string().matches(Regex.quality_item, String.quality_item_valid),
        mach: Yup.string().matches(Regex.quality_item, String.quality_item_valid),
        reed: Yup.string().matches(Regex.quality_item, String.quality_item_valid),
        border: Yup.string().matches(Regex.quality_item, String.quality_item_valid),
        pasramani: Yup.string().matches(Regex.quality_item, String.quality_item_valid),
        steam: Yup.string().matches(Regex.quality_item, String.quality_item_valid),
        panno: Yup.string().matches(Regex.quality_item, String.quality_item_valid),
        nozzle: Yup.string().matches(Regex.quality_item, String.quality_item_valid),
        letis: Yup.string().matches(Regex.quality_item, String.quality_item_valid),
        gsm: Yup.string().matches(Regex.quality_item, String.quality_item_valid),

    }).test('wrapData', `${String.wrapData_required}`, () => {
        if (qeditdata?.warp?.warpData > 0) {
            setWrapDataRequired(false);
        }
        return qeditdata?.warp?.warpData > 0;
    }).test('weftData', `${String.weftData_required}`, () => {
        if (qeditdata?.weft?.weftData > 0) {
            setWeftDataRequired(false);
        }
        return qeditdata?.weft?.weftData > 0;
    });

    const [EditQuality, { isLoading }] = useEditQualityMutation();

    const handleSubmit = async (value) => {
        if (wrapData.length === 0) {
            setWrapDataRequired(true);
        }
        else {
            setWrapDataRequired(false);
        }
        if (weftData.length === 0) {
            setWeftDataRequired(true);
        }
        else {
            setWeftDataRequired(false);
        }
        if (wrapData.length === 0 || weftData.length === 0) {
            return;
        }

        //api data
        const qualityName = value.qulaity
        const qualityWeight = totalWeights

        const qualityCost = selectedOption === "Fixed Cost"
            ? Number(totalCosts) + Number(value.cost)
            : Number(totalCosts) + Number(value.cost * sumOfPicks);

        const cost = Number(value.cost)

        const TotalBeamEnds = tars

        const TotalPick = sumOfPicks

        const TotalWidth = widths

        const totalefficiency = (isNaN(value.rpm) || isNaN(value.eff))
            ? 0
            : (((value.rpm / sumOfPicks / 39.37) * (value.eff / 100) * 720).toFixed(2));

        const body = {
            qualityName: qualityName,
            qualityWeight: qualityWeight,
            qualityCost: qualityCost,
            TotalBeamEnds: TotalBeamEnds,
            TotalPick: TotalPick,
            TotalWidth: TotalWidth,
            warp: {
                totalWarpWeight: WrapsumOfweights,
                totalWarpCost: WrapsumOfCosts,
                warpData: wrapData.map((element) => {
                    const { warpYarnName, warpCompnayName
                        , tpm, warpCompany, warpYarn, _id, ...rest } = element;
                    if (tpm !== "") {
                        rest.tpm = tpm;
                    }
                    rest.warpCompany = element?.warpCompany?._id || element?.warpCompany;
                    rest.warpYarn = element?.warpYarn?._id || element?.warpYarn;
                    return rest;
                })
            },
            weft: {
                totalWeftWeight: WeftsumOfweights,
                totalWeftCost: WeftsumOfCosts,
                weftData: weftData.map((element) => {
                    const { wefYarnName, wefCompnayName, weftCompnay, wetfYarn, _id, tpm, ...rest } = element;
                    if (tpm !== "") {
                        rest.tpm = tpm;
                    }
                    rest.weftCompany = element?.weftCompany?._id || element?.weftCompany;
                    rest.weftYarn = element?.weftYarn?._id || element?.weftYarn;
                    return rest;
                })
            },
            expenseType: selectedOption,
            expenseCost: selectedOption === "Fixed Cost" ? cost : cost * TotalPick,
            // cost: selectedOption === "Fixed Cost" ? cost : cost * TotalPick,
            cost: cost,
            totalefficiency: totalefficiency,
            rpm: value.rpm !== "" ? value.rpm : 0,
            efficiency: value.eff !== "" ? value.eff : 0,
            machine: value.mach !== "" ? value.mach : 1,
            info: {
                reed: value.reed,
                panno: value.panno,
                border: value.border,
                nozzle: value.nozzle,
                pasramani: value.pasramani,
                letis: value.letis,
                steam: value.steam,
                gsm: value.gsm
            }
        }
        try {
            const response = await EditQuality({ body, id })
            const status = response?.data?.statusCode;
            const message = response?.data?.message;
            if (status === 200) {
                toast.success(message)
                navigaet("/Quality")
            }
            else {
                toast.error(message)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    // dialog
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const handleOpenConfirmation = () => {
        setOpenConfirmation(true);
    };
    const handleCloseConfirmation = () => {
        setOpenConfirmation(false);
    };

    const [cancelWrapConfirmation, setcancelWrapConfirmation] = useState(false);
    const handleOpenWrapConfirmation = () => {
        setcancelWrapConfirmation(true);
    };
    const handleCloseWrapConfirmation = () => {
        setcancelWrapConfirmation(false);
    };

    const [cancelWeftConfirmation, setcancelWefConfirmation] = useState(false);
    const handleOpenWefConfirmation = () => {
        setcancelWefConfirmation(true);
    };
    const handleCloseWefConfirmation = () => {
        setcancelWefConfirmation(false);
    };

    const Back = () => {
        navigaet("/Quality")
    }

    // set data
    useEffect(() => {
        setWrapData(qeditdata?.warp?.warpData)
        setweftData(qeditdata?.weft?.weftData)
    }, [qeditdata])


    // wrap data
    const [wrapData, setWrapData] = useState([]);
    const [wrapSumCost, setWrapSumCost] = useState([])

    const [wrapSumweight, setWrapSumweight] = useState([])

    const WrapsumOfCost = wrapData?.length === 0 ? (0) : wrapSumCost.reduce((sum, cost) => sum + parseFloat(cost), 0);
    const WrapsumOfweight = wrapData?.length === 0 ? (0) : wrapSumweight.reduce((sum, weight) => sum + parseFloat(weight), 0);

    const [WrapsumOfCosts, setWrapsumOfCosts] = useState(0)

    const [WrapsumOfweights, setWrapsumOfweights] = useState(0)

    useEffect(() => {
        setWrapsumOfCosts(qeditdata?.warp?.totalWarpCost)
        setWrapsumOfweights(qeditdata?.warp?.totalWarpWeight)
    }, [qeditdata])


    useEffect(() => {
        setWrapsumOfCosts(Number(WrapsumOfCost.toFixed(2)))
        setWrapsumOfweights(Number(WrapsumOfweight.toFixed(2)))
    }, [WrapsumOfCost, WrapsumOfweight])


    // weft data
    const [weftData, setweftData] = useState(qeditdata?.weft?.weftData)

    const [weftSumCost, setweftSumCost] = useState([])
    const [weftSumweight, setweftSumweight] = useState([])

    const WeftsumOfCost = weftData?.length === 0 ? (0) : weftSumCost.reduce((sum, cost) => sum + parseFloat(cost), 0);
    const WeftsumOfweight = weftData?.length === 0 ? (0) : weftSumweight.reduce((sum, weight) => sum + parseFloat(weight), 0);

    const [WeftsumOfCosts, setWeftsumOfCosts] = useState(0);
    const [WeftsumOfweights, setWeftsumOfweights] = useState(0)

    useEffect(() => {
        setWeftsumOfCosts(qeditdata?.weft?.totalWeftCost)
        setWeftsumOfweights(qeditdata?.weft?.totalWeftWeight)
    }, [qeditdata])

    useEffect(() => {
        setWeftsumOfCosts(Number(WeftsumOfCost.toFixed(2)))
        setWeftsumOfweights(Number(WeftsumOfweight.toFixed(2)))
    }, [WeftsumOfCost, WeftsumOfweight])


    //total sum
    const [totalWeights, settotalWeights] = useState(0)
    const [totalCosts, settotalCosts] = useState(0)

    useEffect(() => {
        settotalWeights(qeditdata?.qualityWeight)
        settotalCosts(qeditdata?.qualityCost)
    }, [settotalWeights, settotalCosts, refetch])

    useEffect(() => {
        const totalWeight = parseFloat(WrapsumOfweights) + parseFloat(WeftsumOfweights);
        const totalCost = parseFloat(WrapsumOfCosts) + parseFloat(WeftsumOfCosts);
        settotalWeights(totalWeight.toFixed(2))
        settotalCosts(totalCost.toFixed(2))
    }, [WrapsumOfweights, WeftsumOfweights, WrapsumOfCosts, WeftsumOfCosts])


    //pick
    const [pickSum, setPickSum] = useState([]);
    const sumOfPick = weftData?.length === 0 ? (0) : pickSum.reduce((sum, pick) => sum + parseFloat(pick), 0);

    const sumOfPicks = Number(sumOfPick.toFixed(2))

    //width
    const [Width, setWidth] = useState([]);
    const widths = weftData?.length === 0 ? (0) : Width.reduce((sum, width) => sum + parseFloat(width), 0);

    //tar
    const [Tar, setTar] = useState([]);
    const tars = wrapData?.length === 0 ? (0) : Tar.reduce((sum, tar) => sum + parseFloat(tar), 0);

    const [editdata, seteditdata] = useState([]);
    const editData = (index) => {
        toggleDrawer();

        const editData = {
            index: index,
        }
        seteditdata(editData)
    }

    const removeWrapBox = (index) => {
        const updatedWrapData = [...wrapData];
        updatedWrapData.splice(index, 1);
        setWrapData(updatedWrapData);
        handleCloseWrapConfirmation();
    };

    const removeweftBox = (index) => {
        const updatedWeftData = [...weftData];
        updatedWeftData.splice(index, 1);
        setweftData(updatedWeftData);
        handleCloseWefConfirmation();
    }
    const [editweftData, seteditweftData] = useState([]);

    const editWeftData = (index) => {
        toggleDrawerWeft();
        const editData = {
            index: index,
        }
        seteditweftData(editData)
    }

    return (
        <>
            {isFetching ? (
                <div className='editpage_loader'>
                    <Loader />
                </div>

            ) : (<Formik initialValues={defaultValue}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}>
                {({
                    values,
                    handleChange,
                    errors,
                    touched,
                }) => (

                    <Form>
                        <div className='add_form'>
                            {/* heading */}
                            <div className='add_heading'>
                                <div className='first_heading' >
                                    <IconButton className='add_arrow' onClick={handleOpenConfirmation}>
                                        <ArrowBackIcon className='add_qicon' />
                                    </IconButton>
                                    <Typography variant="p" noWrap component="p" className='add_tital'>
                                        {String.edit_Qulaity}
                                    </Typography>
                                </div>

                                <div className='second_heading'>
                                    <Stack direction="row" spacing={1}>
                                        <Button className='btn_weight' variant="contained" >{String.weight} {totalWeights} {String.akg}</Button>
                                        <Button className='btn_cost' variant="contained" >
                                            {/* {(selectedOption === "Fixed Cost")
                                                ? (qeditdata?.cost !== values.cost
                                                    ? `${String.Cost} ${(Number(totalCosts) + Number(values.cost)).toFixed(2)} ${String.money}`
                                                    : `${String.Cost} ${(Number(totalCosts) + Number(values.cost * sumOfPicks)).toFixed(2)} ${String.money}`)
                                                : (`${String.Cost} ${qeditdata?.qualityCost} ${String.money}`)
                                            } */}

                                            {(selectedOption === "Fixed Cost")
                                                ? `${String.Cost} ${(Number(totalCosts) + Number(values.cost)).toFixed(2)} ${String.money}`
                                                : `${String.Cost} ${(Number(totalCosts) + Number(values.cost * sumOfPicks)).toFixed(2)} ${String.money}`
                                            }
                                        </Button>
                                    </Stack>
                                </div>

                                <div className='add_btn'>
                                    {isLoading ? <Loader /> : (<Button type='submit' className='btn_save' startIcon={<TurnedInNotIcon />} variant="contained">{String.save}</Button>)}
                                </div>
                            </div>

                            <Paper className='from_paper'>
                                <div className='add_form_filed'>
                                    <div className='qulaity_wrap'>
                                        <InputLabel className="qulaity_label">
                                            {String.Quality}
                                        </InputLabel>

                                        <TextFields onChange={handleChange}
                                            value={values.qulaity}
                                            error={touched.qulaity && Boolean(errors.qulaity)}
                                            helperText={touched.qulaity && errors.qulaity}
                                            placeholder={String.quality_placeholder} width={"50%"} name={"qulaity"} />
                                    </div>
                                    <div className='add_form_btns'>
                                        <Button className='btn_warp' variant="outlined"
                                            endIcon={
                                                <div className='add_waicons' onClick={toggleDrawer}>
                                                    <IconButton className='add_waicons_button' >
                                                        <ControlPointIcon />
                                                    </IconButton>
                                                </div>} >
                                            <div>{String.warp_b} </div>
                                            <div>{String.warp_w} {WrapsumOfweights.toFixed(2)} | {String.warp_c} {WrapsumOfCosts.toFixed(2)}
                                            </div>
                                        </Button>
                                        {wrapDataRequired && wrapData.length === 0 && (
                                            <div className="error-text">{String.wrapData_required}</div>
                                        )}
                                    </div>

                                    <div className='wrap_box' >
                                        {wrapData?.map((wrap, index) => {
                                            const value = (((wrap.warpDeniar * wrap.warpBeamEnds) * wrap.warpShortage / 100 + (wrap.warpDeniar * wrap.warpBeamEnds)) / 9000000)
                                            const weight = (value * 100).toFixed(2);
                                            const cost = (value * wrap.warpYarnRate).toFixed(2);
                                            return (
                                                <>
                                                    <Box className='box_content' component="span"
                                                        onClick={() => {
                                                            editData(
                                                                index,
                                                            );
                                                        }}>

                                                        <div className='close_icon' onClick={(e) => {
                                                            e.stopPropagation()
                                                            handleOpenWrapConfirmation()
                                                            // removeWrapBox(index);
                                                        }}>
                                                            <CancelIcon className='close' />
                                                        </div>
                                                        <div className='heading1' >
                                                            <div>
                                                                <Typography className='heading_text'
                                                                    variant="span"
                                                                    component="span">
                                                                    {wrap?.warpCompany?.yarnCompanyName || wrap?.warpYarnName}
                                                                </Typography>
                                                            </div>
                                                            <div>
                                                                <Typography className='heading_text'
                                                                    variant="span"
                                                                    component="span">
                                                                    {String.money} : {cost}
                                                                </Typography>
                                                            </div>
                                                        </div>
                                                        <div className='heading2' >
                                                            <div>
                                                                <Typography
                                                                    className='heading_text'
                                                                    variant="span"
                                                                    component="span">
                                                                    {wrap?.warpYarn?.yarnName || wrap?.warpYarnName}
                                                                </Typography>
                                                            </div>
                                                            <div>
                                                                <Typography
                                                                    className='heading_text'
                                                                    variant="span"
                                                                    component="span">
                                                                    {String.kg} : {weight}
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
                                                                    {wrap.warpDeniar}
                                                                </Typography>
                                                            </div>
                                                            <div className='dashed_border' />
                                                            <div>
                                                                <InputLabel className='heading_text' >{String.Shortage}</InputLabel>
                                                                <Typography
                                                                    className='heading_text'
                                                                    variant="span"
                                                                    component="span">
                                                                    {wrap.warpShortage}
                                                                </Typography>
                                                            </div>
                                                            <div className='dashed_border' />
                                                            <div>
                                                                <InputLabel className='heading_text' >{String.Ends}</InputLabel>
                                                                <Typography
                                                                    className='heading_text'
                                                                    variant="span"
                                                                    component="span">
                                                                    {wrap.warpBeamEnds}
                                                                </Typography>
                                                            </div>
                                                            <div className='dashed_border' />
                                                            <div>
                                                                <InputLabel className='heading_text' >{String.Y_Rate}</InputLabel>
                                                                <Typography
                                                                    className='heading_text'
                                                                    variant="span"
                                                                    component="span">
                                                                    {wrap.warpYarnRate}
                                                                </Typography>
                                                            </div>
                                                            <div className='dashed_border' />
                                                            <div>
                                                                <InputLabel className='heading_text' >{String.TPM}</InputLabel>
                                                                <Typography
                                                                    className='heading_text'
                                                                    variant="span"
                                                                    component="span">
                                                                    {wrap.tpm}
                                                                </Typography>
                                                            </div>
                                                        </div>
                                                    </Box >
                                                </>
                                            )
                                        })}
                                    </div>

                                    <div className='add_form_btns'>
                                        <Button className='btn_weft' variant="outlined"
                                            endIcon={
                                                <div className='add_weicons' onClick={toggleDrawerWeft}>
                                                    <IconButton className='add_weicons_button' >
                                                        <ControlPointIcon />
                                                    </IconButton>
                                                </div>}>
                                            <div>{String.weft_b}</div>
                                            <div>{String.warp_w} {WeftsumOfweights.toFixed(2)} | {String.Weft_c} {WeftsumOfCosts.toFixed(2)}</div>
                                        </Button>
                                        {weftDataRequired && weftData.length === 0 && (
                                            <div className="error-text">{String.WeftData_required}</div>
                                        )}
                                    </div>

                                    <div className='wrap_box' >
                                        {weftData?.map((weft, index) => {
                                            const value = (((weft.weftDeniar * weft.weftPick * weft.weftWidth) * weft.weftWastage / 100 + (weft.weftDeniar * weft.weftPick * weft.weftWidth)) / 9000000)
                                            const cost = Number((value * weft.weftYarnRate).toFixed(2));
                                            const weight = Number((value * 100).toFixed(2));
                                            return (
                                                <>
                                                    <Box className='box_content' component="span"
                                                        onClick={() => {
                                                            editWeftData(index,);
                                                        }}>

                                                        <div className='close_icon' onClick={(e) => {
                                                            e.stopPropagation()
                                                            // removeweftBox(index);
                                                            handleOpenWefConfirmation()
                                                        }}>
                                                            <CancelIcon className='close' />
                                                        </div>

                                                        <div className='heading1' >
                                                            <div>
                                                                <Typography className='heading_text'
                                                                    variant="span"
                                                                    component="span">
                                                                    {weft?.weftCompany?.yarnCompanyName || weft?.wefCompnayName}
                                                                </Typography>
                                                            </div>
                                                            <div>
                                                                <Typography className='heading_text'
                                                                    variant="span"
                                                                    component="span">
                                                                    {String.money} : {cost}
                                                                </Typography>
                                                            </div>
                                                        </div>
                                                        <div className='heading2' >
                                                            <div>
                                                                <Typography
                                                                    className='heading_text'
                                                                    variant="span"
                                                                    component="span">
                                                                    {weft?.weftYarn?.yarnName || weft?.wefYarnName}
                                                                </Typography>
                                                            </div>
                                                            <div>
                                                                <Typography
                                                                    className='heading_text'
                                                                    variant="span"
                                                                    component="span">
                                                                    {String.kg} : {weight}
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
                                                                    {weft.weftDeniar}
                                                                </Typography>
                                                            </div>
                                                            <div style={{ borderLeft: "1px dashed grey" }} />
                                                            <div>
                                                                <InputLabel className='heading_text' >{String.Pick}</InputLabel>
                                                                <Typography
                                                                    className='heading_text'
                                                                    variant="span"
                                                                    component="span">
                                                                    {weft.weftPick}
                                                                </Typography>
                                                            </div>
                                                            <div style={{ borderLeft: "1px dashed grey" }} />
                                                            <div>
                                                                <InputLabel className='heading_text' >{String.Wastage}</InputLabel>
                                                                <Typography
                                                                    className='heading_text'
                                                                    variant="span"
                                                                    component="span">
                                                                    {weft.weftWastage}
                                                                </Typography>
                                                            </div>
                                                            <div className='dashed_border' />
                                                            <div>
                                                                <InputLabel className='heading_text' >{String.Width}</InputLabel>
                                                                <Typography
                                                                    className='heading_text'
                                                                    variant="span"
                                                                    component="span">
                                                                    {weft.weftWidth}
                                                                </Typography>
                                                            </div>
                                                            <div className='dashed_border' />
                                                            <div>
                                                                <InputLabel className='heading_text' >{String.Y_Rate}</InputLabel>
                                                                <Typography
                                                                    className='heading_text'
                                                                    variant="span"
                                                                    component="span">
                                                                    {weft.weftYarnRate}
                                                                </Typography>
                                                            </div>
                                                            <div className='dashed_border' />
                                                            <div>
                                                                <InputLabel className='heading_text' >{String.TPM}</InputLabel>
                                                                <Typography
                                                                    className='heading_text'
                                                                    variant="span"
                                                                    component="span">
                                                                    {weft.tpm}
                                                                </Typography>
                                                            </div>
                                                        </div>
                                                    </Box>
                                                </>
                                            )
                                        })}
                                    </div>

                                    <Paper className='expense_pepar'>
                                        <div className='add_expense'>

                                            <InputLabel className="qulaity_label">
                                                {String.Expense}
                                            </InputLabel>

                                            <div className='costs'>
                                                <div className='expense_radios'>
                                                    <RadioGroup
                                                        className='radios'
                                                        row
                                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                                        name="row-radio-buttons-group"
                                                        value={selectedOption}
                                                        onChange={handleChanger}>
                                                        <FormControlLabel className='radio_fix' value="Fixed Cost" control={<Radio />} label={String.Fixed_Cost} />
                                                        <FormControlLabel value="Per Pick" control={<Radio />} label={String.Per_Pick} />
                                                    </RadioGroup>
                                                </div>

                                                <div className='cost_label'>
                                                    {console.log(values.cost, "const")}
                                                    <InputLabels name={String.Cost} m={"0 0.5rem 0 0"} />
                                                </div>

                                                {selectedOption === 'Fixed Cost' && (
                                                    <div className='expense_wrap'>
                                                        <TextFields onChange={handleChange}
                                                            value={values.cost} width={"12rem"} placeholder={String.Enter_Cost} name="cost"
                                                            error={touched.cost && Boolean(errors.cost)}
                                                            helperText={touched.cost && errors.cost} />
                                                    </div>
                                                )}

                                                {selectedOption === 'Per Pick' && (
                                                    <div className='expense_wraps'>
                                                        <TextFields error={touched.cost && Boolean(errors.cost)}
                                                            helperText={touched.cost && errors.cost} onChange={handleChange} value={values.cost} name="cost" width={"37.5%"} placeholder={String.Enter_Cost} />
                                                        <InputLabels name={`x ${sumOfPicks} =`} m={"0 0.7rem 0 0.7rem"} />
                                                        <TextFields name="costs" value={values.cost * sumOfPicks} width={"37.5%"} />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </Paper>

                                    <Paper className='productions_pepar'>
                                        <div className='add_production'>
                                            <div className='productions_lables'>
                                                <InputLabel className="qulaity_label">
                                                    {String.Production}
                                                </InputLabel>
                                            </div>

                                            <div className='production_input_wrap'>
                                                <div className='production_input'>
                                                    <InputLabels name={String.RPM} m={"0 0.5rem 0 0"} />
                                                    <TextFields width={"90%"} placeholder={String.RPM} name="rpm" error={touched.rpm && Boolean(errors.rpm)}
                                                        helperText={touched.rpm && errors.rpm} onChange={handleChange} value={values.rpm} />
                                                </div>

                                                <div className='production_input'>
                                                    <InputLabels name={String.Eff} m={"0 0.5rem 0 0"} />
                                                    <TextFields width={"90%"} placeholder={String.Eff}
                                                        name="eff" error={touched.eff && Boolean(errors.eff)}
                                                        helperText={touched.eff && errors.eff} onChange={handleChange} value={values.eff} />
                                                </div>
                                                <div className='production_input'>
                                                    <InputLabels name={String.Mach} m={"0 0.5rem 0 0"} />
                                                    <TextFields width={"90%"} placeholder={String.Mach}
                                                        name="mach" error={touched.mach && Boolean(errors.mach)}
                                                        helperText={touched.mach && errors.mach} onChange={handleChange} value={values.mach} />
                                                </div>

                                                <div className='production_input'>
                                                    <InputLabels name={String.qPick} m={"0 0.5rem 0 0"} />
                                                    <TextFields width={"90%"} value={sumOfPicks} />
                                                </div>

                                                <div className='production_input'>
                                                    <InputLabels name={String.efficiency} m={"0 0.5rem 0 0"} />
                                                    <div style={{ top: 0, left: 0 }}>
                                                        {sumOfPicks === 0 || values?.rpm === undefined || values?.eff === undefined ? (
                                                            <TextFields width={"90%"} value={`${(0).toFixed(2)} m/d`} m={"0 0 0 5rem"} />) : (<TextFields value={`${(((values.rpm / sumOfPicks / 39.37) * (values.eff / 100) * 720).toFixed(2))} m/d`} m={"0 0 0 5rem"} />)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Paper>

                                    <Paper className='info_pepar'>
                                        <div className='add_info'>
                                            <InputLabel className="qulaity_label">
                                                {String.Information}
                                            </InputLabel>
                                            <div className='add_info_wrap'>
                                                <div className='info_input'>
                                                    <InputLabels name={String.Reed} m={"0 0.5rem 0 0"} />
                                                    <TextFields width={"90%"} className="info_input_text" placeholder={String.Reed} name="reed" error={touched.reed && Boolean(errors.reed)}
                                                        helperText={touched.reed && errors.reed} onChange={handleChange} value={values.reed} />
                                                </div>
                                                <div className='info_input'>
                                                    <InputLabels name={String.Border} m={"0 0.5rem 0 0"} />
                                                    <TextFields width={"90%"} placeholder={String.Border} name="border" error={touched.border && Boolean(errors.border)}
                                                        helperText={touched.border && errors.border} onChange={handleChange} value={values.border} />
                                                </div>
                                                <div className='info_input'>
                                                    <InputLabels name={String.Pasramani} m={"0 0.5rem 0 0"} />
                                                    <TextFields width={"90%"} placeholder={String.Pasramani} name="pasramani" error={touched.pasramani && Boolean(errors.pasramani)}
                                                        helperText={touched.pasramani && errors.pasramani} onChange={handleChange} value={values.pasramani} />
                                                </div>
                                                <div className='info_input'>
                                                    <InputLabels name={String.Steam} m={"0 0.5rem 0 0"} />
                                                    <TextFields width={"90%"} placeholder={String.Steam} name="steam" error={touched.steam && Boolean(errors.steam)}
                                                        helperText={touched.steam && errors.steam} onChange={handleChange} value={values.steam} />
                                                </div>
                                            </div>
                                            <div className='add_info_wrap' >
                                                <div className='info_input'>
                                                    <InputLabels name={String.Panno} m={"0 0.5rem 0 0"} />
                                                    <TextFields width={"90%"} placeholder={String.Panno} name="panno" error={touched.panno && Boolean(errors.panno)}
                                                        helperText={touched.panno && errors.panno} onChange={handleChange} value={values.panno} />
                                                </div>
                                                <div className='info_input'>
                                                    <InputLabels name={String.Nozzle} m={"0 0.5rem 0 0"} />
                                                    <TextFields width={"90%"} placeholder={String.Nozzle} name="nozzle" error={touched.nozzle && Boolean(errors.nozzle)}
                                                        helperText={touched.nozzle && errors.nozzle} onChange={handleChange} value={values.nozzle} />
                                                </div>
                                                <div className='info_input'>
                                                    <InputLabels name={String.Letis} m={"0 0.5rem 0 0"} />
                                                    <TextFields width={"90%"} placeholder={String.Letis} name="letis" error={touched.letis && Boolean(errors.letis)}
                                                        helperText={touched.letis && errors.letis} onChange={handleChange} value={values.letis} />
                                                </div>
                                                <div className='info_input'>
                                                    <InputLabels name={String.Gsm} m={"0 0.5rem 0 0"} />
                                                    <TextFields width={"90%"} placeholder={String.Gsm} name="gsm" error={touched.gsm && Boolean(errors.gsm)}
                                                        helperText={touched.gsm && errors.gsm} onChange={handleChange} value={values.gsm} />
                                                </div>
                                            </div>
                                        </div>
                                    </Paper>
                                </div>
                            </Paper>
                        </div>
                    </Form>)}
            </Formik >)}
            <ConformDialog open={openConfirmation} onClose={handleCloseConfirmation} tital={String.con_dialog_tital} text={String.dialog_desc} back={Back} />
            <ConformDialog open={cancelWrapConfirmation} onClose={handleCloseWrapConfirmation} tital={String.wrapdialog_tital} back={removeWrapBox} />
            <ConformDialog open={cancelWeftConfirmation} onClose={handleCloseWefConfirmation} tital={String.weftdialog_tital} back={removeweftBox} />
            <WarpDrawer editdata={editdata} seteditdata={seteditdata} Tar={Tar} setTar={setTar} WrapSumweight={wrapSumweight} setWrapSumweight={setWrapSumweight} wrapSumCost={wrapSumCost} setWrapSumCost={setWrapSumCost} wrapData={wrapData} setWrapData={setWrapData} toggleDrawer={toggleDrawer} isDrawerOpen={isDrawerOpen} />
            <WeftDrawer editweftData={editweftData} seteditweftData={seteditweftData} setWidth={setWidth} Width={Width} pickSum={pickSum} setPickSum={setPickSum} weftSumweight={weftSumweight} setweftSumweight={setweftSumweight} weftSumCost={weftSumCost} setweftSumCost={setweftSumCost} weftData={weftData} setweftData={setweftData} toggleDrawerWeft={toggleDrawerWeft} isDrawerOpenWeft={isDrawerOpenWeft} />
        </>
    )
}
