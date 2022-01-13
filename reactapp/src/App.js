import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NewAppDialog from "./components/NewApplicationView";
import { setExpanded } from "./reducers/globalReducer";
import { setAppData, setSelectedApp } from "./reducers/applicationReducer";
function Sideview(props) {
  if (props.appData && props.appData.annualPayroll) {
    return (
      <div className="w-1/2 h-full py-5 flex-1 border-black border flex flex-col  items-start justify-start   bg-slate-200">
        <div className="w-full  h-12 text-2xl flex flex-row items-start justify-center">
          <div className="w-1/2 h-12 text-2xl font-extrabold">
            Buisness Name
          </div>
          <div className="w-1/2 h-12 text-2xl font-extrabold">
            {props.appData.buisnessName}
          </div>
        </div>
        <div className="w-full  h-12 text-2xl flex flex-row items-start justify-center">
          <div className="w-1/2 h-12 text-2xl font-extrabold">Industry</div>
          <div className="w-1/2 h-12 text-2xl font-extrabold">
            {props.appData.industry}
          </div>
        </div>
        <div className="w-full  h-12 text-2xl flex flex-row items-start justify-center">
          <div className="w-1/2 h-12 text-2xl font-extrabold">Sales</div>
          <div className="w-1/2 h-12 text-2xl font-extrabold">
            $ {(props.appData.annualSales * 1000).toLocaleString()}
          </div>
        </div>
        <div className="w-full  h-12 text-2xl flex flex-row items-start justify-center">
          <div className="w-1/2 h-12 text-2xl font-extrabold">Payroll</div>
          <div className="w-1/2 h-12 text-2xl font-extrabold">
            $ {(props.appData.annualPayroll * 1000).toLocaleString()}
          </div>
        </div>
        <div className="w-full  h-12 text-2xl flex flex-row items-start justify-center">
          <div className="w-1/2 h-12 text-2xl font-extrabold">Email</div>
          <div className="w-1/2 h-12 text-2xl font-extrabold">
            {props.appData.email}
          </div>
        </div>
        <div className="w-full  h-12 text-2xl flex flex-row items-start justify-center">
          <div className="w-1/2 h-12 text-2xl font-extrabold">Zip Code</div>
          <div className="w-1/2 h-12 text-2xl font-extrabold">
            {props.appData.zipCode}
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
function ListApplicationRows(props) {
  const dispatch = useDispatch();
  var selectedColor = " bg-slate-50 odd:bg-slate-100 ";
  var selectedIdx = useSelector((state) => state.application.selectedApp);

  if (props.apps?.length > 0) {
    return props.apps.map((ele, idx) => {
      if (idx == selectedIdx) {
        selectedColor = " bg-yellow-300";
      } else {
        selectedColor = " bg-slate-50 odd:bg-slate-100 ";
      }
      return (
        <div
          onClick={() => {
            dispatch(setSelectedApp(idx));
          }}
          key={idx}
          className={`w-full px-2 text-xl h-8 select-none hover:bg-yellow-400 active:bg-yellow-700 border-y  border-black flex font-extrabold flex-row items-center justify-centertext-lg ${selectedColor}`}
        >
          {ele.buisnessName}
        </div>
      );
    });
  } else {
    return (
      <div className="w-full flex flex-1 font-bold flex-row items-center justify-center bg-slate-50 text-lg">
        No Records Exist
      </div>
    );
  }
}

export default function Home() {
  const appList = useSelector((state) => state.application.list);
  const dispatch = useDispatch();
  const appData = useSelector((state) => state.application.appData);
  useEffect(async () => {
    let response = await fetch("http://localhost:3005/Application");
    let AppList = await response.json();
    console.log(AppList);
    dispatch(setAppData(AppList));
  }, []);

  return (
    <div className="w-screen flex flex-col items-center justify-center min-h-screen h-screen py-2 px-10">
      <NewAppDialog />

      <main
        style={{ fontFamily: "Open Sans" }}
        className="flex flex-1 h-screen space-x-2 flex-row items-center justify-center w-full  text-center"
      >
        <div className="w-1/2 h-full flex flex-col border-black border  bg-slate-200">
          <div className="w-full font-extrabold h-12 flex flex-row items-center justify-center border-black bg-slate-300 border-b text-2xl">
            Application List
          </div>
          <div className="w-full flex flex-1 flex-col items-center justify-start bg-white">
            <ListApplicationRows apps={appList}></ListApplicationRows>
            <div
              onClick={() => {
                dispatch(setSelectedApp(-1));
              }}
              className="w-full flex-1 bg-slate-50"
            ></div>
          </div>
          <div className="w-full h-12 flex flex-row items-center justify-center border-black bg-slate-100 border-t text-2xl">
            <div
              onClick={() => {
                dispatch(setExpanded(true));
              }}
              className="w-24 h-8 rounded bg-sky-300 text-xl flex flex-row justify-center items-center font-extrabold select-none active:bg-sky-400 hover:bg-sky-200"
            >
              Add
            </div>
          </div>
        </div>
        <Sideview appData={appData}></Sideview>
      </main>
      <footer style={{ fontFamily: "Open Sans" }} className="w-full">
        <div className="h-6 px-2 my-2 w-full flex flex-row ">
          Coeterie Submission by Zachary Moran
        </div>
      </footer>
    </div>
  );
}
