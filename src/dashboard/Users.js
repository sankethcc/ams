import Head from "./Head";
import SideNav from "./SideNav";
import TableData from "./components/subscription-data/TableData";
import Total from "./components/total-count/Total";

function Users() {
  return (
    <div className="screen" style={{ backgroundColor: "#eff3f4" }}>
      <SideNav xyz={"users"} />
      <div className="main-container" >
      <Head pageName="Users"/>
      <Total />
      <TableData />

      </div>
    </div>
  );
}

export default Users;
