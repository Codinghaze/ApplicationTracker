import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setExpanded } from "../reducers/globalReducer";
import { setAppData } from "../reducers/applicationReducer";

export default function NewDocumentDialog(props) {
  const [data, setData] = useState({
    buisnessName: "",
    industry: "",
    email: "",
    annualSales: 0,
    annualPayroll: 0,
    empCount: 0,
    zipCode: "",
  });
  const dispatch = useDispatch();
  const expanded = useSelector((state) => state.global.expanded);

  if (expanded) {
    return (
      <div className="w-full h-screen absolute flex flex-row items-center justify-start">
        <div
          className="absolute w-full h-screen left-0 top-0 bg-white opacity-40"
          onClick={() => {
            setData({
              buisnessName: "",
              industry: "",
              email: "",
              annualSales: 0,
              annualPayroll: 0,
              empCount: 0,
              zipCode: "",
            });
            dispatch(setExpanded(false));
          }}
        />
        <div className="w-full z-10 flex flex-col px-20 items-center justify-center rounded-xl">
          <form
            onSubmit={async (evt) => {
              evt.preventDefault();
              let goodRes = await fetch("http://localhost:3005/Application", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(data),
              }).catch((err) => {
                console.log(err);
              });
              let response = await fetch("http://localhost:3005/Application");
              let AppList = await response.json();
              console.log(AppList);
              dispatch(setAppData(AppList));
              dispatch(setExpanded(false));
            }}
            className="w-full z-10 flex flex-col shadow-md items-center justify-center rounded-xl"
          >
            <div className="w-full bg-slate-300 text-black h-8 text-2x text-2xl flex flex-row items-center justify-center px-2 py-2 rounded-t-xl">
              New Application
            </div>

            <div className="w-full bg-slate-100 text-md flex flex-col items-start justify-center px-2 py-2 text-black ">
              <div className="w-full flex flex-col items-center justify-start h-full">
                <div className="w-96 h-8 text-lg text-black flex flex-row items-center justify-center">
                  <div className="w-1/2 items-center justify-center flex flex-row ">
                    Buisness Name
                  </div>
                  <input
                    onChange={(evt) =>
                      setData({ ...data, buisnessName: evt.target.value })
                    }
                    value={data.buisnessName}
                    className="w-1/2 px-2 items-center justify-center flex flex-row "
                  ></input>
                </div>
                <div className="w-96 h-8 text-lg text-black flex flex-row items-center justify-center">
                  <div className="w-1/2 items-center justify-center flex flex-row ">
                    Industry
                  </div>
                  <input
                    onChange={(evt) =>
                      setData({ ...data, industry: evt.target.value })
                    }
                    value={data.industry}
                    className="w-1/2 px-2 items-center justify-center flex flex-row "
                  ></input>
                </div>
                <div className="w-96 h-8 text-lg text-black flex flex-row items-center justify-center">
                  <div className="w-1/2 items-center justify-center flex flex-row ">
                    Email
                  </div>
                  <input
                    onChange={(evt) =>
                      setData({ ...data, email: evt.target.value })
                    }
                    value={data.email}
                    className="w-1/2 px-2 items-center justify-center flex flex-row "
                  ></input>
                </div>
                <div className="w-96 h-8 text-lg text-black flex flex-row items-center justify-center">
                  <div className="w-1/2 items-center justify-center flex flex-row ">
                    Annual Sales
                  </div>
                  <select
                    onChange={(evt) =>
                      setData({ ...data, annualSales: evt.target.value })
                    }
                    value={data.annualSales}
                    className="w-1/2 px-2 items-center justify-center flex flex-row "
                  >
                    <option value="0">0</option>
                    <option value="50">50K</option>
                    <option value="75">75K</option>
                    <option value="100">100K</option>
                    <option value="150">150K</option>
                    <option value="200">200K</option>
                  </select>
                </div>
                <div className="w-96 h-8 text-lg text-black flex flex-row items-center justify-center">
                  <div className="w-1/2 items-center justify-center flex flex-row ">
                    Annual Payroll
                  </div>
                  <select
                    onChange={(evt) =>
                      setData({ ...data, annualPayroll: evt.target.value })
                    }
                    value={data.annualPayroll}
                    className="w-1/2 px-2 items-center justify-center flex flex-row "
                  >
                    <option value="0">0</option>
                    <option value="50">50K</option>
                    <option value="75">75K</option>
                    <option value="100">100K</option>
                    <option value="150">150K</option>
                    <option value="200">200K</option>
                  </select>
                </div>
                <div className="w-96 h-8 text-lg text-black flex flex-row items-center justify-center">
                  <div className="w-1/2 items-center justify-center flex flex-row ">
                    Zip Code
                  </div>
                  <input
                    onChange={(evt) =>
                      setData({ ...data, zipCode: evt.target.value })
                    }
                    value={data.zipCode}
                    className="w-1/2 px-2 items-center justify-center flex flex-row "
                  ></input>
                </div>
              </div>
            </div>
            <div className="w-full bg-slate-100 h-12 text-2xl flex flex-row items-center justify-center py-2 text-black rounded-b-xl">
              <input
                className="w-96 h-8  px-2 bg-slate-400 hover:text-yellow-500 select-none active:text-yellow-700 flex flex-row items-center justify-center rounded-sm"
                type="submit"
                value="Submit"
              />
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
