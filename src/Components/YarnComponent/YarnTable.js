import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { Box, Button, IconButton, ListItemSecondaryAction, Typography } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { String } from '../../constants/String';
import Search from '../ComonComponent/Search';
import Loader from '../ComonComponent/Loader';
import { IoMdAdd } from "react-icons/io";
import AddYarnDialog from '../QualityComponent/AddYarnDialog';
import EditIcon from '@mui/icons-material/Edit';
import RestoreIcon from '@mui/icons-material/Restore';
import "../../style/Yarn/YarnTable.scss"
import { useGetYarnQuery } from '../../api/Yarn';
import YarnHistory from './YarnHistory';
import EditYarnDrawer from './EditYarnDrawer';
import { useNavigate } from 'react-router-dom';

export default function YarnTable({ Userdata, UserisFetching }) {

    const [page, setPage] = useState(1);
    const limit = 20;
    const [hasmore, setHasMore] = useState(true);
    const [search, setsearch] = useState("");
    const [input, setinput] = useState("");
    const { data, isFetching, refetch } = useGetYarnQuery({ page, limit, search: search });
    const [yarnData, setYarnData] = useState([]);
    const [total, setTotal] = useState("")
    const [ref, setRef] = useState(false);
    const navigate = useNavigate();
    const [showAddYarnButton, setShowAddYarnButton] = useState(true);
    const [showEditHistoryYarnButton, setShowEditHistoryYarnButton] = useState(true);
    const [adminshowEditHistoryYarnButton, setAdminshowEditHistoryYarnButton] = useState(false);

    useEffect(() => {
        if (!UserisFetching) {
            if (Userdata?.result?.role === "view") {
                setShowAddYarnButton(false)
                setShowEditHistoryYarnButton(false)
            } else if (Userdata?.result?.role === "admin" || Userdata?.result?.role === "root") {
                setAdminshowEditHistoryYarnButton(true)
            } else if (Userdata?.result?.role === "write" || Userdata?.result?.role === "view") {
                setAdminshowEditHistoryYarnButton(false)
            }
            Userdata?.result?.requestStatus === "rejected" && navigate("/Company")
        }
    }, [Userdata, UserisFetching, navigate])

    useEffect(() => {
        setRef(true);
    }, []);

    useEffect(() => {
        if (!ref) return;
        if (!isFetching) {
            setTotal(data?.result?.totalCount)
            if (page === 1) {

                setYarnData(data?.result?.data);
            } else {
                setYarnData((prevData) => [...prevData, data?.result?.data]);
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

    const sortedData = yarnData ? [...yarnData]?.sort((a, b) => {
        if (sortConfig.columnName !== '') {
            const keyA = a[sortConfig.columnName];
            const keyB = b[sortConfig.columnName];
            if (keyA < keyB) return sortConfig.direction === 'asc' ? -1 : 1;
            if (keyA > keyB) return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    }) : [];


    // add yarn
    const [openAdd, setOpenAdd] = useState(false);

    const [selectrdYarn, setSelectrdYarn] = useState(null);

    const handleCloseAddYarn = () => {
        setOpenAdd(false);
    };
    const handleOpenAddYarn = (sortedData) => {
        setOpenAdd(true);
    };

    // drawer
    const [isUpdateDrawerOpen, setIsUpdateDrawerOpen] = useState(false);

    const toggleUpdateDrawer = (sortedData) => {
        setIsUpdateDrawerOpen(!isUpdateDrawerOpen);
        setSelectrdYarn(sortedData)
    };

    // history

    const [openHistory, setOpenHistory] = useState(false);

    const handleCloseHistoryYarn = () => {
        setOpenHistory(false);
        setSelectrdYarn(null)
    };
    const handleOpenHistoryYarn = (sortedData) => {
        setOpenHistory(true);
        setSelectrdYarn(sortedData)
    };

    return (
        <>
            <Box className='table_tital'>
                <Typography className="data_count" variant="span" id="tableTitle" component="div">
                    {sortedData?.length === 0 ? (
                        <span> {null}</span>
                    ) : (
                        <>
                            {sortedData?.length.toString().padStart(2, '0')} {String.yarn_on_screen} ({total.toString().padStart(2, '0')} Found)
                        </>
                    )}
                </Typography>

                <div className='search_container_wraper'>
                    <Box className="table_search">
                        <Search
                            setinput={setinput}
                            input={input}
                            setsearch={setsearch}
                            setpage={setPage} />
                    </Box>
                    {showAddYarnButton && <Button startIcon={<IoMdAdd />} variant="outlined" className='add_buttons' onClick={handleOpenAddYarn} >
                        {String.add_yarn}
                    </Button>}
                </div>
            </Box>

            <TableContainer component={Paper} className="Table_container"   >
                <InfiniteScroll
                    dataLength={100}
                    next={fetchData}
                    hasMore={hasmore}
                    height={"78vh"}
                    loader={page !== 1 ? (<Box sx={{
                        display: "flex", justifyContent: "center"
                    }}>
                        <Loader />
                    </Box>) : (null)}>

                    <Table aria-label="simple table">
                        <TableHead sx={{ position: 'sticky', top: 0 }}>
                            <TableRow className="table_header">
                                <TableCell className="table_border table_cell">
                                    <Box className="table_hading_cell" sx={{ width: "28rem " }}>
                                        {String.yarnName}
                                        <UnfoldMoreIcon className='table_hading_icon' onClick={() => handleSort('yarnName')} />
                                    </Box>
                                </TableCell>

                                <TableCell className="table_border table_cell">
                                    <Box className="table_hading_cell" sx={{ width: "27rem " }} >
                                        {String.yarnRate}
                                        <UnfoldMoreIcon className='table_hading_icon' onClick={() => handleSort('yarnRate')} />
                                    </Box>
                                </TableCell>

                                {showEditHistoryYarnButton && <TableCell className="table_border table_cell" sx={{ width: "-1rem" }}  >
                                    {(Userdata?.result?.role === "write")}
                                    <Box className="table_hading_cell tables_hading_show"  >
                                    </Box>
                                </TableCell>}
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
                                {sortedData.map((row, index) => {
                                    return (
                                        <TableRow
                                            key={index}
                                            sx={{
                                                '& td': { borderBottom: '1px solid rgba(224, 224, 224, 1)' },
                                                '&:last-child td': { borderBottom: '1px solid rgba(224, 224, 224, 1)' },
                                                '&:hover': { backgroundColor: '#f5f5f5' },
                                            }}>
                                            <TableCell className="table_border data" align="left">
                                                {row?.yarnName || '-'}
                                            </TableCell>
                                            <TableCell className="table_border data" align="left">
                                                {row?.yarnRate || '-'}
                                            </TableCell>
                                            {showEditHistoryYarnButton && <TableCell className="table_border data" align="left" sx={{ width: "5px" }} >
                                                {((Userdata?.result?.role === "write" && Userdata?.result?.createdBy === row?.createdBy) || adminshowEditHistoryYarnButton) ? (<div className='yarn_icon'>
                                                    {/* <EditIcon className='yarn_icon_edit' onClick={() => handleOpenUpdateYarn(row)} /> */}
                                                    <EditIcon className='yarn_icon_edit' onClick={() => toggleUpdateDrawer(row)} />

                                                    <RestoreIcon className='yarn_icon_history' onClick={() => handleOpenHistoryYarn(row)} />
                                                </div>) : (null)}

                                            </TableCell>}
                                        </TableRow>)
                                })}
                            </TableBody>
                        )}
                    </Table>
                </InfiniteScroll>
            </TableContainer>

            <AddYarnDialog open={openAdd} onClose={handleCloseAddYarn} />
            {selectrdYarn && <EditYarnDrawer toggleDrawer={toggleUpdateDrawer} isDrawerOpen={isUpdateDrawerOpen} selectrdYarn={selectrdYarn} />}
            {selectrdYarn && <YarnHistory open={openHistory} onClose={handleCloseHistoryYarn} selectrdYarn={selectrdYarn} />}
        </>
    );
}