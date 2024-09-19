import { IoSearchSharp } from 'react-icons/io5';

interface Address {
  main: string;
  detail: string | null;
}

interface UserLimit {
  item: number;
  detail: string | null;
}

interface EVStation {
  no: number;
  evStationId: string;
  operatingInstitution: string;
  evStationName: string;
  address: Address;
  userLimit: UserLimit;
  operatingStatus: number;
  registerDate: string;
}

interface TableProps {
  contents: EVStation[];
}

export function EVStationTable({ contents }: TableProps) {
  return (
    <div className="w-full bg-white border border-gray-300">
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="table-header">
            <th className="table-cell">No</th>
            <th className="table-cell">운영기관</th>
            <th className="table-cell">충전소 이름</th>
            <th className="table-cell">주소</th>
            <th className="table-cell">공용 구분</th>
            <th className="table-cell">운영 상태</th>
            <th className="table-cell">등록일</th>
            <th className="table-cell">상세보기</th>
          </tr>
        </thead>
        <tbody>
          {contents.map((station, index) => (
            <tr key={station.evStationId} className="table-row">
              <td className="table-cell">{index + 1}</td>
              <td className="table-cell">{station.operatingInstitution}</td>
              <td className="table-cell">{station.evStationName}</td>
              <td className="table-cell">
                {station.address.main}
                {station.address.detail && `, ${station.address.detail}`}
              </td>
              <td className="table-cell">{0 === station.userLimit.item ? '공용' : '개인'}</td>
              <td className="table-cell">
                {0 === station.operatingStatus ? '운영 중' : 1 === station.operatingStatus ? '일시 중단' : '운영 중지'}
              </td>
              <td className="table-cell">{new Date(station.registerDate).toLocaleDateString()}</td>
              <td className="table-cell">
                <IoSearchSharp size={20} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
