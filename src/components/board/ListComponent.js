import { useEffect, useState } from "react";
import { createSearchParams } from "react-router-dom";
import { getList } from "../../api/boardAPI";

const initState = {
  dtoList:[],
  end:0,
  start:0,
  next:false,
  prev:false,
  pageNums:[],
  page:0,
  size:0,
  requestDTO: null
}

const ListComponent = ({queryObj, movePage}) => {

  const [listData, setListData] = useState(initState)
  
  useEffect(() => {

    getList(queryObj).then(data => {
      console.log(data)
      setListData(data)
    })

  },[queryObj])

  const handleClickPage = (pageNum) => {
    movePage(pageNum)
  }

  return ( 
    <div>
      <div> ListComponent</div>
      <div>
        <ul>
          {listData.dtoList.map( dto =>
            <li key={dto.bno}>{dto.bno} - {dto.title} - {dto.replyCount}</li>)}
        </ul>
      </div>

      <div className="flex m-4 p-2">
        <ul className="flex">

          {listData.prev ? <li 
            className="m-2 p-2 bg-blue-500 border-2 text-white font-bold"
            onClick={() => handleClickPage(listData.start -1)}
            >PREV</li>:<></>}  

          {listData.pageNums.map(num => 
            <li 
            className="m-2 p-2 bg-blue-500 border-2 text-white font-bold" 
            onClick={() => handleClickPage(num)}
            key={num}
            >
              {num}
            </li>)}

            {listData.next ? <li 
            className="m-2 p-2 bg-blue-500 border-2 text-white font-bold" 
            onClick={() => handleClickPage(listData.end + 1)}
            >NEXT</li>:<></>}    
        </ul>
      </div>      

    </div>
   );
}
 
export default ListComponent;