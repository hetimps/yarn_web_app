import { Box, Button, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Search from '../ComonComponent/Search'
import InfiniteScroll from 'react-infinite-scroll-component'
import "../../style/Quality/QualityTable.scss"
import { IoMdAdd } from "react-icons/io";
import { String } from '../../constants/String'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import EditIcon from "@mui/icons-material/Edit";
import { useDeleteQualityMutation, useGetQualityQuery } from '../../api/Quality'
import Loader from '../ComonComponent/Loader'
import { useNavigate } from 'react-router-dom'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { toast } from 'react-hot-toast'
import DeleteDialogs from './DeleteDialogs'

export default function QualityTable() {
    const [page, setPage] = useState(1);
    const limit = 20;
    const [hasmore, setHasMore] = useState(true);
    const [search, setsearch] = useState("");
    const [input, setinput] = useState("");
    const [QualityData, setQualityData] = useState([]);
    const [total, setTotal] = useState("")
    const [ref, setRef] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState(null);
    const navigate = useNavigate();
    const [DeleteQuality, { isLoading }] = useDeleteQualityMutation({});
    const { data, isFetching, refetch } = useGetQualityQuery({ page, limit, search: search });
    const ppp = useGetQualityQuery({ page, limit, search: search });

    console.log(ppp,"ppp")

    useEffect(() => {
        setRef(true);
    }, []);

    useEffect(() => {
        if (!ref) return;
        if (!isFetching) {
            setTotal(data?.result?.isTotalCount)
            if (page === 1) {

                setQualityData(data?.result?.data);
            } else {
                setQualityData((prevData) => [...prevData, ...data?.result?.data]);
            }
            setHasMore(data?.result?.data?.length === limit);
        }
    }, [data, page, ref, isFetching, search, input, limit]);

    useEffect(() => {
        refetch()
    }, [search, refetch]);

    const fetchData = () => {
        setPage(page + 1);
    };

    const [sortConfig, setSortConfig] = useState({
        columnName: '',
        direction: '',
    });


    const handleSort = (columnName) => {
        let direction = 'asc';
        if (sortConfig.columnName === columnName && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ columnName, direction });

    };
    const sortedData = QualityData ? [...QualityData].sort((a, b) => {
        if (sortConfig.columnName !== '') {
            const keyA = a[sortConfig.columnName];
            const keyB = b[sortConfig.columnName];

            if (keyA < keyB) return sortConfig.direction === 'asc' ? -1 : 1;
            if (keyA > keyB) return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    }) : [];


    const addQuality = () => {
        navigate("/Addquality")
    }
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event, rowId) => {
        setAnchorEl(event.currentTarget);
        setSelectedRowId(rowId);

    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        navigate("/Editquality", {
            state: {
                "_id": selectedRowId
            }
        });
    };

    const handleView = () => {
        navigate("/Viewquality", {
            state: {
                "_id": selectedRowId
            }
        });
    }

    const Delete_Quality = async () => {
        try {
            const response = await DeleteQuality({ id: selectedRowId });
            const status = response?.data?.statusCode;
            const message = response?.data?.message;

            if (status === 200) {
                toast.success(message);

                handleMenuClose();
                handleCloseConfirmation();
            } else {
                toast.error(message);
                handleMenuClose();
                handleCloseConfirmation();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const [openConfirmation, setOpenConfirmation] = useState(false);

    const handleOpenConfirmation = () => {
        setOpenConfirmation(true);
    };
    const handleCloseConfirmation = () => {
        setOpenConfirmation(false);
    };

    return (
        <>
            <div className='table_tital'>
                {/* <div className='tital_container'> */}
                <div>
                    <Typography className="data_count" variant="span" id="tableTitle" component="div">
                        {sortedData?.length === 0 ? (
                            <span> {null}</span>
                        ) : (
                            <>
                                {sortedData?.length.toString().padStart(2, '0')} {String.quality_on_screen}  ({total.toString().padStart(2, '0')} Found)
                            </>
                        )}
                    </Typography>
                </div>

                <div className='search_container_wraper'>
                    <Box className="table_search">
                        <Search
                            setinput={setinput}
                            input={input}
                            setsearch={setsearch}
                            setpage={setPage} />

                    </Box>
                    <Button startIcon={<IoMdAdd />} variant="outlined" className='add_buttons' onClick={addQuality} >
                        {String.add_quality}
                    </Button>
                </div>
                {/* </div> */}
            </div>

            <TableContainer component={Paper} className="Table_container">
                <InfiniteScroll
                    dataLength={sortedData?.length}
                    next={fetchData}
                    hasMore={hasmore}
                    height={"78vh"}
                    loader={page !== 1 ? (<Box sx={{
                        display: "flex", justifyContent: "center",
                    }}>
                        <Loader />
                    </Box>) : (null)}>
                    <Table aria-label="simple table">

                        <TableHead sx={{ position: 'sticky', top: 0 }}>
                            <TableRow className="table_header" >

                                <TableCell className="table_border tables_main_hading " colSpan={3} sx={{ borderBottom: "none" }}>
                                    <Box className="table_hading_cell" >
                                        {String.quality}
                                    </Box>
                                </TableCell>

                                <TableCell className="table_border" sx={{ borderBottom: "none" }} colSpan={-1}>
                                    <Box className="table_hading_cell"></Box>
                                </TableCell>

                                <TableCell className="table_border" sx={{ borderBottom: "none" }} colSpan={-1}>
                                    <Box className="table_hading_cell"></Box>
                                </TableCell>

                                <TableCell className="table_border" sx={{ borderBottom: "none" }} colSpan={-1}>
                                    <Box className="table_hading_cell"></Box>
                                </TableCell>

                                <TableCell className="table_border" sx={{ borderBottom: "none" }} colSpan={-1}>
                                    <Box className="table_hading_cell"></Box>
                                </TableCell>

                                <TableCell className="table_border tables_main_hading" colSpan={2} sx={{ borderBottom: "none" }}>
                                    <Box className="table_hading_cell">
                                        {String.weft}
                                    </Box>
                                </TableCell>

                                <TableCell className="table_border tables_main_hading" colSpan={2} sx={{ borderBottom: "none" }}>
                                    <Box className="table_hading_cell">
                                        {String.warp}
                                    </Box>
                                </TableCell>
                                <TableCell className="table_border" sx={{ borderBottom: "none" }} colSpan={-1}>
                                    <Box className="table_hading_cell"></Box>
                                </TableCell>
                            </TableRow>

                            <TableRow className="table_header">

                                <TableCell className="table_border table_cell"  >
                                    <Box className="table_hading_cell tables_hading_show" sx={{ width: "12rem" }}   >
                                        {String.quality_name}
                                        <UnfoldMoreIcon className='table_hading_icon' onClick={() => handleSort('qualityName')} />
                                    </Box>
                                </TableCell>


                                <TableCell className="table_border table_cell" sx={{ bordertop: "none" }}>
                                    <Box className="table_hading_cell">
                                        {String.kg}
                                        <UnfoldMoreIcon className='table_hading_icon' onClick={() => handleSort('qualityWeight')} />
                                    </Box>
                                </TableCell>

                                <TableCell className="table_border table_cell">
                                    <Box className="table_hading_cell" >
                                        {String.money}
                                        <UnfoldMoreIcon className='table_hading_icon' onClick={() => handleSort('qualityCost')} />
                                    </Box>
                                </TableCell>

                                <TableCell className="table_border table_cell" sx={{ borderTop: "none" }}   >
                                    <Box className="table_hading_cell" sx={{ marginTop: "-54px", borderBottom: "none" }}>
                                        {String.pick}
                                        <UnfoldMoreIcon className='table_hading_icon' onClick={() => handleSort('TotalPick')} />
                                    </Box>
                                </TableCell>

                                <TableCell className="table_border table_cell" >
                                    <Box className="table_hading_cell" sx={{ marginTop: "-54px" }} >
                                        {String.tar}
                                        <UnfoldMoreIcon className='table_hading_icon' onClick={() => handleSort('TotalBeamEnds')} />
                                    </Box>
                                </TableCell>

                                <TableCell className="table_border table_cell" >
                                    <Box className="table_hading_cell" sx={{ marginTop: "-54px" }} >
                                        {String.width}
                                        <UnfoldMoreIcon className='table_hading_icon' onClick={() => handleSort('TotalWidth')} />
                                    </Box>
                                </TableCell>

                                <TableCell className="table_border table_cell" >
                                    <Box className="table_hading_cell" sx={{ marginTop: "-54px" }} >
                                        {String.gsm}
                                        <UnfoldMoreIcon className='table_hading_icon' onClick={() => handleSort("gsm")} />
                                    </Box>
                                </TableCell>

                                <TableCell className="table_border table_cell" >
                                    <Box className="table_hading_cell">
                                        {String.kg}
                                        <UnfoldMoreIcon className='table_hading_icon' onClick={() => handleSort('totalWeftWeight')} />
                                    </Box>
                                </TableCell>

                                <TableCell className="table_border table_cell" >
                                    <Box className="table_hading_cell">
                                        {String.money}
                                        <UnfoldMoreIcon className='table_hading_icon' onClick={() => handleSort('totalWeftCost')} />
                                    </Box>
                                </TableCell>

                                <TableCell className="table_border table_cell" >
                                    <Box className="table_hading_cell">
                                        {String.kg}
                                        <UnfoldMoreIcon className='table_hading_icon' onClick={() => handleSort('totalWarpWeight')} />
                                    </Box>
                                </TableCell>

                                <TableCell className="table_border table_cell" >
                                    <Box className="table_hading_cell">
                                        {String.money}
                                        <UnfoldMoreIcon className='table_hading_icon' onClick={() => handleSort('totalWarpCost')} />
                                    </Box>
                                </TableCell>
                                <TableCell className="table_border table_cell" >
                                    <Box className="table_hading_cell" sx={{ marginTop: "-54px", width: "5px" }}    >
                                        {/* {String.action} */}
                                    </Box>
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        {(isFetching || isLoading) && page === 1 ? (<Box className="table_loading" >
                            <Loader />
                        </Box>) : (!isFetching && sortedData?.length <= 0) || (sortedData?.length <= 0 && search) ? (
                            <Box className="table_loading" >
                                {String.no_data_available}
                            </Box>
                        ) : (
                            <TableBody>
                                {sortedData.map((row, index) => {
                                    return (
                                        <TableRow
                                            key={index}
                                            sx={{
                                                '& td': { borderBottom: '1px solid rgba(224, 224, 224, 1)' },
                                                '&:last-child td': { borderBottom: '1px solid rgba(224, 224, 224, 1)' },
                                                '&:hover': { backgroundColor: '#f5f5f5' }
                                            }}>
                                            <TableCell className="table_border" component="th" scope="row">
                                                {row?.qualityName || '-'}
                                            </TableCell>
                                            <TableCell className="table_border" align="left">
                                                {row?.qualityWeight || '-'}
                                            </TableCell>
                                            <TableCell className="table_border" align="left">
                                                {row?.qualityCost || '-'}
                                            </TableCell>
                                            <TableCell className="table_border" align="left">
                                                {row?.TotalPick || '-'}
                                            </TableCell>
                                            <TableCell className="table_border" align="left">
                                                {row?.TotalBeamEnds || '-'}
                                            </TableCell>
                                            <TableCell className="table_border" align="left">
                                                {row?.TotalWidth || '-'}
                                            </TableCell>
                                            <TableCell className="table_border" align="left">
                                                {row?.info?.gsm || '-'}
                                            </TableCell>
                                            <TableCell className="table_border" align="left">
                                                {row?.weft?.totalWeftWeight || '-'}
                                            </TableCell>
                                            <TableCell className="table_border" align="left">
                                                {row?.weft?.totalWeftCost || '-'}
                                            </TableCell>
                                            <TableCell className="table_border" align="left">
                                                {row?.warp?.totalWarpWeight || '-'}
                                            </TableCell>
                                            <TableCell className="table_border" align="left">
                                                {row?.warp?.totalWarpCost || '-'}
                                            </TableCell>
                                            <TableCell className="table_border" align="left">
                                                <Box className="more_icons" onClick={(event) => handleMenuOpen(event, row._id)}>
                                                    <MoreVertIcon className='more_icon' />
                                                </Box>
                                            </TableCell>

                                            <Menu
                                                className="menus"
                                                anchorEl={anchorEl}
                                                open={Boolean(anchorEl)}
                                                onClose={handleMenuClose}>
                                                <MenuItem className='menu' onClick={() => handleEdit(row?._id
                                                )}>
                                                    <EditIcon className='edit' />
                                                    <span className='menu-text'>{String.edit_menu}</span>
                                                </MenuItem>

                                                <MenuItem className='menu' onClick={handleOpenConfirmation}>
                                                    <DeleteIcon className='edit' />
                                                    <span className='menu-text'>{String.delete_menu}</span>
                                                </MenuItem>

                                                <MenuItem className='menu' onClick={() => handleView(row?._id)}>
                                                    <VisibilityIcon className='edit' />
                                                    <span className='menu-text'>{String.view_menu}</span>
                                                </MenuItem>
                                            </Menu>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>)}
                    </Table>
                    <DeleteDialogs loading={isLoading} open={openConfirmation} onClose={handleCloseConfirmation} tital={String.delete_dialog_tital} text={String.delete_dialog_desc} Action={Delete_Quality} />
                </InfiniteScroll>
            </TableContainer>
        </>
    )
}
