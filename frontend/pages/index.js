import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import NewAppDialog from "../components/NewApplicationView";
import { setExpanded } from "../reducers/globalReducer";

function ListApplicationRows(props) {
  if (props.apps.length > 0) {
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

  return (
    <div className="w-screen flex flex-col items-center justify-center min-h-screen h-screen py-2 px-10">
      <NewAppDialog />
      <Head>
        <title>Application Tracker</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main
        style={{ fontFamily: "Open Sans" }}
        className="flex flex-1 h-screen space-x-2 flex-row items-center justify-center w-full  text-center"
      >
        <div className="w-1/2 h-full flex flex-col border-black border  bg-slate-200">
          <div className="w-full font-extrabold h-12 flex flex-row items-center justify-center border-black bg-slate-300 border-b text-2xl">
            Application List
          </div>
          <div className="w-full flex flex-1 flex-row items-start justify-start bg-white">
            <ListApplicationRows apps={appList}></ListApplicationRows>
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
        <div className="w-1/2 h-full flex-1 border-black border   bg-slate-200"></div>
      </main>
      <footer style={{ fontFamily: "Open Sans" }} className="w-full">
        <div className="h-6 px-2 my-2 w-full flex flex-row ">
          Coeterie Submission by Zachary Moran
        </div>
      </footer>
    </div>
  );
}
