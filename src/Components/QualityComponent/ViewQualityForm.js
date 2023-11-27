import React from 'react'
import "../../style/Quality/AddQualityForm.scss"
import { Box, Button, FormControlLabel, IconButton, InputLabel, Paper, Radio, RadioGroup, Stack, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useState } from 'react';
import { Form, Formik } from 'formik';
import InputLabels from './InputLabels';
import TextFields from './TextFields';
import { useGetEditQualityQuery } from '../../api/Quality';
import { useLocation, useNavigate } from 'react-router-dom';
import { String } from '../../constants/String';
import Loader from '../ComonComponent/Loader';
import WarpDrawer from './WarpDrawer';
import WeftDrawer from './WeftDrawer';
import { useEffect } from 'react';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';

export default function ViewQualityForm() {
    const { state } = useLocation();
    const [id, setId] = useState(state ? state?._id : '');
    const { data, isFetching, refetch } = useGetEditQualityQuery(id);
    const [qeditdata, setQEditdata] = useState([]);
    const navigaet = useNavigate();
    const [selectedOption, setSelectedOption] = useState("");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isDrawerOpenWeft, setIsDrawerOpenWeft] = useState(false);

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

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const toggleDrawerWeft = () => {
        setIsDrawerOpenWeft(!isDrawerOpenWeft);
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
    const WrapsumOfCost = wrapSumCost.reduce((sum, cost) => sum + parseFloat(cost), 0);
    const WrapsumOfweight = wrapSumweight.reduce((sum, weight) => sum + parseFloat(weight), 0);
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
    const WeftsumOfCost = weftSumCost.reduce((sum, cost) => sum + parseFloat(cost), 0);
    const WeftsumOfweight = weftSumweight.reduce((sum, weight) => sum + parseFloat(weight), 0);
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
    }, [qeditdata])

    useEffect(() => {
        const totalWeight = parseFloat(WrapsumOfweights) + parseFloat(WeftsumOfweights);
        const totalCost = parseFloat(WrapsumOfCosts) + parseFloat(WeftsumOfCosts);
        settotalWeights(totalWeight.toFixed(2))
        settotalCosts(totalCost.toFixed(2))
    }, [WrapsumOfweights, WeftsumOfweights, WrapsumOfCosts, WeftsumOfCosts])

    //pick
    const [pickSum, setPickSum] = useState([]);
    const sumOfPick = pickSum.reduce((sum, pick) => sum + parseFloat(pick), 0);
    const sumOfPicks = Number(sumOfPick.toFixed(2))
    const [Width, setWidth] = useState([]);
    const [Tar, setTar] = useState([]);
    const [editdata, seteditdata] = useState([]);
    const [editweftData, seteditweftData] = useState([]);

    return (
        <>
            {isFetching ? (
                <div className='editpage_loader'>
                    <Loader />
                </div>
            ) : (<Formik initialValues={defaultValue}>
                {({
                    values,
                }) => (
                    <Form>
                        <div className='add_form'>
                            {/* heading */}
                            <div className='add_heading'>
                                <div className='first_heading' >
                                    <IconButton className='add_arrow' onClick={Back}>
                                        <ArrowBackIcon className='add_qicon' />
                                    </IconButton>
                                    <Typography variant="p" noWrap component="p" className='add_tital'>
                                        {String.view_quality}
                                    </Typography>
                                </div>
                                <div className='second_heading' >
                                    <Stack direction="row" spacing={1}>
                                        <Button className='btn_weight' variant="contained" >{String.weight} {totalWeights} {String.akg}</Button>
                                        <Button className='btn_cost' variant="contained" >
                                            {selectedOption === "Fixed Cost"
                                                ? (`${String.Cost} ${(Number(totalCosts) + Number(values.cost)).toFixed(2)} ${String.money}`)
                                                : (`${String.Cost} ${(Number(totalCosts) + Number(values.cost * sumOfPicks)).toFixed(2)} ${String.money}`)
                                            }
                                        </Button>
                                    </Stack>
                                </div>
                                <div className='add_btn'>
                                    <Button type='submit' sx={{ display: "none" }} className='btn_save' startIcon={<TurnedInNotIcon />} variant="contained">{String.save}</Button>
                                </div>
                            </div>
                            <Paper className='from_paper'>
                                <div className='add_form_filed'>
                                    <div className='qulaity_wrap'>
                                        <InputLabel className="qulaity_label">
                                            {String.Quality}
                                        </InputLabel>
                                        <TextFields
                                            value={values.qulaity}
                                            placeholder={String.quality_placeholder} width={"50%"} name={"qulaity"} />
                                    </div>
                                    <div className='add_form_btns'>
                                        <Button className='btn_warp' variant="outlined"
                                            endIcon={

                                                <div className='add_waicons'>
                                                    <IconButton className='add_waicons_button' >
                                                        <ControlPointIcon />
                                                    </IconButton>
                                                </div>
                                            }>
                                            <div>
                                                {String.warp_b}
                                            </div>
                                            <div>
                                                {String.warp_w} {WrapsumOfweights.toFixed(2)} | {String.warp_c} {WrapsumOfCosts.toFixed(2)}
                                            </div>
                                        </Button>
                                    </div>
                                    <div className='wrap_box' >
                                        {wrapData?.map((wrap) => {
                                            const value = (((wrap.warpDeniar * wrap.warpBeamEnds) * wrap.warpShortage / 100 + (wrap.warpDeniar * wrap.warpBeamEnds)) / 9000000)
                                            const weight = (value * 100).toFixed(2);
                                            const cost = (value * wrap.warpYarnRate).toFixed(2);
                                            return (
                                                <>
                                                    <Box className='box_content' component="span">
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
                                                <div className='add_weicons' >
                                                    <IconButton className='add_weicons_button' >
                                                        <ControlPointIcon />
                                                    </IconButton>
                                                </div>}>
                                            <div>
                                                {String.weft_b}
                                            </div>
                                            <div>
                                                {String.warp_w} {WeftsumOfweights.toFixed(2)} | {String.Weft_c} {WeftsumOfCosts.toFixed(2)}
                                            </div>
                                        </Button>
                                    </div>
                                    <div className='wrap_box' >
                                        {weftData?.map((weft) => {
                                            const value = (((weft.weftDeniar * weft.weftPick * weft.weftWidth) * weft.weftWastage / 100 + (weft.weftDeniar * weft.weftPick * weft.weftWidth)) / 9000000)
                                            const cost = Number((value * weft.weftYarnRate).toFixed(2));
                                            const weight = Number((value * 100).toFixed(2));
                                            return (
                                                <>
                                                    <Box className='box_content' component="span">
                                                        <div className='heading1' >
                                                            <div>
                                                                <Typography className='heading_text'
                                                                    variant="span"
                                                                    component="span">
                                                                    {weft?.weftCompany?.yarnCompanyName || weft?.yarnCompanyName}
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
                                                                    {weft?.weftYarn?.yarnName || weft?.yarnName}
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
                                                        value={selectedOption}>
                                                        <FormControlLabel className='radio_fix' value="Fixed Cost" control={<Radio />} label={String.Fixed_Cost} />
                                                        <FormControlLabel value="Per Pick" control={<Radio />} label={String.Per_Pick} />
                                                    </RadioGroup>
                                                </div>
                                                <div className='cost_label'>
                                                    <InputLabels name={String.Cost} m={"0 0.5rem 0 0"} />
                                                </div>

                                                {selectedOption === 'Fixed Cost' && (
                                                    <div className='expense_wrap'>
                                                        <TextFields
                                                            value={values.cost} width={"12rem"} placeholder={String.Enter_Cost} name="cost"
                                                        />
                                                    </div>
                                                )}
                                                {selectedOption === 'Per Pick' && (
                                                    <div className='expense_wraps'>
                                                        <TextFields value={values.cost} name="cost" width={"37.5%"} placeholder={String.Enter_Cost} />
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
                                                    <TextFields width={"90%"} placeholder={String.RPM} name="rpm"
                                                        value={values.rpm} />
                                                </div>
                                                <div className='production_input'>
                                                    <InputLabels name={String.Eff} m={"0 0.5rem 0 0"} />
                                                    <TextFields width={"90%"} placeholder={String.Eff} name="eff" value={values.eff} />
                                                </div>
                                                <div className='production_input'>
                                                    <InputLabels name={String.Mach} m={"0 0.5rem 0 0"} />
                                                    <TextFields width={"90%"} placeholder={String.Mach}
                                                        name="mach" value={values.mach} />
                                                </div>
                                                <div className='production_input'>
                                                    <InputLabels name={String.qPick} m={"0 0.5rem 0 0"} />
                                                    <TextFields width={"90%"} value={sumOfPicks} />
                                                </div>
                                                <div className='production_input'>
                                                    <InputLabels name={String.efficiency} m={"0 0.5rem 0 0"} />
                                                    <div style={{ top: 0, left: 0 }}>
                                                        {sumOfPicks === 0 || values?.rpm === undefined || values?.eff === undefined ? (
                                                            <TextFields width={"90%"} value={`${(0).toFixed(2)} m/d`} m={"0 0 0 5rem"} />
                                                        ) : (
                                                            <TextFields
                                                                value={`${(((values.rpm / sumOfPicks / 39.37) * (values.eff / 100) * 720).toFixed(2))} m/d`}
                                                                m={"0 0 0 5rem"}
                                                            />
                                                        )}
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
                                                    <TextFields width={"90%"} className="info_input_text" placeholder={String.Reed} name="reed" value={values.reed} />
                                                </div>
                                                <div className='info_input'>
                                                    <InputLabels name={String.Border} m={"0 0.5rem 0 0"} />
                                                    <TextFields width={"90%"} placeholder={String.Border} name="border" value={values.border} />
                                                </div>
                                                <div className='info_input'>
                                                    <InputLabels name={String.Pasramani} m={"0 0.5rem 0 0"} />
                                                    <TextFields width={"90%"} placeholder={String.Pasramani} name="pasramani" value={values.pasramani} />
                                                </div>
                                                <div className='info_input'>
                                                    <InputLabels name={String.Steam} m={"0 0.5rem 0 0"} />
                                                    <TextFields width={"90%"} placeholder={String.Steam} name="steam" value={values.steam} />
                                                </div>
                                            </div>
                                            <div className='add_info_wrap' >
                                                <div className='info_input'>
                                                    <InputLabels name={String.Panno} m={"0 0.5rem 0 0"} />
                                                    <TextFields width={"90%"} placeholder={String.Panno} name="panno" value={values.panno} />
                                                </div>
                                                <div className='info_input'>
                                                    <InputLabels name={String.Nozzle} m={"0 0.5rem 0 0"} />
                                                    <TextFields width={"90%"} placeholder={String.Nozzle} name="nozzle" value={values.nozzle} />
                                                </div>
                                                <div className='info_input'>
                                                    <InputLabels name={String.Letis} m={"0 0.5rem 0 0"} />
                                                    <TextFields width={"90%"} placeholder={String.Letis} name="letis" value={values.letis} />
                                                </div>
                                                <div className='info_input'>
                                                    <InputLabels name={String.Gsm} m={"0 0.5rem 0 0"} />
                                                    <TextFields width={"90%"} placeholder={String.Gsm} name="gsm" value={values.gsm} />
                                                </div>
                                            </div>
                                        </div>
                                    </Paper>
                                </div>
                            </Paper>
                        </div>
                    </Form>
                )}
            </Formik >)}
            <WarpDrawer editdata={editdata} seteditdata={seteditdata} Tar={Tar} setTar={setTar} WrapSumweight={wrapSumweight} setWrapSumweight={setWrapSumweight} wrapSumCost={wrapSumCost} setWrapSumCost={setWrapSumCost} wrapData={wrapData} setWrapData={setWrapData} toggleDrawer={toggleDrawer} isDrawerOpen={isDrawerOpen} />
            <WeftDrawer editweftData={editweftData} seteditweftData={seteditweftData} setWidth={setWidth} Width={Width} pickSum={pickSum} setPickSum={setPickSum} weftSumweight={weftSumweight} setweftSumweight={setweftSumweight} weftSumCost={weftSumCost} setweftSumCost={setweftSumCost} weftData={weftData} setweftData={setweftData} toggleDrawerWeft={toggleDrawerWeft} isDrawerOpenWeft={isDrawerOpenWeft} />
        </>

    )
}
