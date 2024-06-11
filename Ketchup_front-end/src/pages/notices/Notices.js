
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../../components/contents/SearchBar';
import ButtonGroup from '../../components/contents/ButtonGroup';
import BootstrapTable from '../../components/contents/BootstrapTable';
import { callGetNoticeListAPI } from '../../apis/NoticeAPICalls';
import PaginationButtons from '../../components/contents/PaginationButtons';
import { decodeJwt } from '../../utils/tokenUtils';
import FormatDateTime from '../../components/contents/FormatDateTime';
import { BsMegaphone } from 'react-icons/bs';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';

const Notices = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const result = useSelector(state => state.noticeReducer);
  const noticeList = result?.noticelist?.noticesWithMemberNames || [];
  const loginToken = decodeJwt(window.localStorage.getItem("accessToken"));

  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(callGetNoticeListAPI({
      currentPage,
      title: searchKeyword.toLowerCase(),
      setTotalItems: setTotalItems
    })).finally(() => setLoading(false));
  }, [dispatch, currentPage, searchKeyword]);

  const pinnedNotices = noticeList
    .filter(notice => notice.noticeFix === 'Y')
    .map(notice => ({
      ...notice,
      noticeTitle: (
        <>
          <span style={{ marginRight: '5px' }}>
            [ 필독&nbsp;
            <span style={{ color: '#EC0B0B' }}>
              <BsMegaphone />
            </span>
            &nbsp;]
          </span>{notice.noticeTitle}
        </>
      ),
      memberName: `${notice.memberName} ${notice.positionName}`,
      noticeCreateDttm: FormatDateTime(notice.noticeCreateDttm)
    }));

  const normalNotices = noticeList.filter(notice => notice.noticeFix !== 'Y').map(notice => ({
    ...notice,
    memberName: `${notice.memberName} ${notice.positionName}`,
    noticeCreateDttm: FormatDateTime(notice.noticeCreateDttm)
  }));

  const mergedNoticeList = [...pinnedNotices, ...normalNotices];

  const columns = [
    ['noticeNo', '공지번호'],
    ['noticeTitle', '제목'],
    ['memberName', '작성자'],
    ['noticeCreateDttm', '등록일']
  ];

  const handleRowClick = (index) => {
    const noticeNo = mergedNoticeList[index].noticeNo;
    console.log("noticeNo : ", noticeNo);
    navigate(`/notices/${noticeNo}`);
  };

  const handleSearch = (searchKeyword) => {
    console.log("handleSearch searchKeyword : ", searchKeyword);
    setCurrentPage(1);
    setSearchKeyword(searchKeyword);
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }
  
  const noNotices = mergedNoticeList.length === 0;
  const noNormalNotices = normalNotices.length === 0;

  return (
    <main id="main" className="main">
      <div className="title">
        <h2>공지사항</h2>
        <SearchBar onSearch={handleSearch} value={searchKeyword} name={'제목 검색'} />
      </div>

      <div className="col-lg-12">
        <div className="row"></div>
        <div className="list">
          {(loginToken.role === "LV2" || loginToken.role === "LV3") && (
            <Link to="/notices/insert">
              <ButtonGroup buttons={[{ label: '등록', styleClass: 'move' }]} />
            </Link>
          )}
          {noNormalNotices && searchKeyword ? (
            <>
              <BootstrapTable data={mergedNoticeList} columns={columns} onRowClick={handleRowClick} />
              <Box height={'480px'} display="flex" flexDirection="column" justifyContent="center" alignItems="center" margin={'auto'}>
                <Typography fontSize={24} textAlign={'center'}>{searchKeyword} 공지가 없습니다.</Typography>
                <img src="/img/searchConditionRequired.png" alt="searchConditionRequired" style={{ display: "block", margin: "0 auto", maxWidth: "100%", height: "auto" }} />
              </Box>
            </>

          ) : (
            <>
              {noNotices ? (
                <Box height={'480px'} display="flex" flexDirection="column" justifyContent="center" alignItems="center" margin={'auto'}>
                  <Typography fontSize={24} textAlign={'center'}>공지가 없습니다.</Typography>
                  <img src="/img/searchConditionRequired.png" alt="searchConditionRequired" style={{ display: "block", margin: "0 auto", maxWidth: "100%", height: "auto" }} />
                </Box>
              ) : (
                <>
                  <BootstrapTable data={mergedNoticeList} columns={columns} onRowClick={handleRowClick} />
                </>
              )}
            </>
          )}
          <PaginationButtons
            totalItems={totalItems}
            itemsPerPage={10}
            currentPage={currentPage}
            onPageChange={(pageNumber) => setCurrentPage(pageNumber)} />
        </div>
      </div>
    </main >
  );
};

export default Notices;
