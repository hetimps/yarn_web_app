import { Box, Button,  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Search from '../ComonComponent/Search'
import InfiniteScroll from 'react-infinite-scroll-component'
import "../../style/Quality/QualityTable.scss"
import { IoMdAdd } from "react-icons/io";
import { String } from '../../constants/String'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import EditIcon from "@mui/icons-material/Edit";
import { useGetQualityQuery } from '../../api/Quality'
import Loader from '../ComonComponent/Loader'

export default function QualityTable() {

    const [page, setPage] = useState(1);
    const limit = 15;
    const [hasmore, setHasMore] = useState(true);
    const [search, setsearch] = useState("");
    const [input, setinput] = useState("");
    const { data, isFetching, refetch } = useGetQualityQuery({ page, limit, search: search });
    const [QualityData, setQualityData] = useState([]);
    const [total, setTotal] = useState("")
    const [ref, setRef] = useState(false);


    useEffect(() => {
        setRef(true);
    }, []);

    useEffect(() => {
        if (!ref) return;
        if (!isFetching) {
            setTotal(data?.result?.totalCount)
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
    const sortedData = [...QualityData].sort((a, b) => {
        if (sortConfig.columnName !== '') {
            const keyA = a[sortConfig.columnName];
            const keyB = b[sortConfig.columnName];
            if (keyA < keyB) return sortConfig.direction === 'asc' ? -1 : 1;
            if (keyA > keyB) return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });


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
                    <Button startIcon={<IoMdAdd />} variant="outlined" className='add_buttons' >
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
                                        <UnfoldMoreIcon className='table_hading_icon' onClick={() => handleSort('totalWarpCost')} />

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
                                        <UnfoldMoreIcon className='table_hading_icon' onClick={() => handleSort('gsm')} />

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
                                    <Box className="table_hading_cell" sx={{ marginTop: "-54px"}}   >
                                        {String.action}
                                    </Box>
                                </TableCell>



                            </TableRow>
                        </TableHead>

                        {isFetching && page === 1 ? (<Box className="table_loading" >
                            <Loader />
                        </Box>) : (!isFetching && sortedData?.length < 0) || (sortedData?.length <= 0 && search) ? (
                            <Box className="table_loading" >
                                {String.no_data_available}
                            </Box>
                        ) : (

                            <TableBody>
                                {sortedData.map((row, index) => (
                                    <TableRow

                                        sx={{
                                            '& td': { borderBottom: '1px solid rgba(224, 224, 224, 1)' },
                                            '&:last-child td': { borderBottom: '1px solid rgba(224, 224, 224, 1)' },
                                            '&:hover': { backgroundColor: '#f5f5f5' },
                                        }}
                                    >
                                        <TableCell className="table_border" component="th" scope="row">
                                            {row.qualityName || '-'}
                                        </TableCell>
                                        <TableCell className="table_border" align="left">
                                            {row.qualityWeight || '-'}
                                        </TableCell>
                                        <TableCell className="table_border" align="left">
                                            {row.qualityCost || '-'}
                                        </TableCell>
                                        <TableCell className="table_border" align="left">
                                            {row.TotalPick || '-'}
                                        </TableCell>
                                        <TableCell className="table_border" align="left">
                                            {row.TotalBeamEnds || '-'}
                                        </TableCell>
                                        <TableCell className="table_border" align="left">
                                            {row.TotalWidth || '-'}
                                        </TableCell>
                                        <TableCell className="table_border" align="left">
                                            {row.qualityName || '-'}
                                        </TableCell>
                                        <TableCell className="table_border" align="left">
                                            {row.weft.totalWeftWeight || '-'}
                                        </TableCell>
                                        <TableCell className="table_border" align="left">
                                            {row.weft.totalWeftCost || '-'}
                                        </TableCell>
                                        <TableCell className="table_border" align="left">
                                            {row.warp.totalWarpWeight || '-'}
                                        </TableCell>
                                        <TableCell className="table_border" align="left">
                                            {row.warp.totalWarpCost || '-'}
                                        </TableCell>
                                        <TableCell className="table_border" align="left">
                                            <Box className="edit_icon" >
                                                
                                                <EditIcon onClick={console.log("hello24356")} />
                                            </Box>

                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>)}
                    </Table>
                </InfiniteScroll>
            </TableContainer>
        </>
    )
}
