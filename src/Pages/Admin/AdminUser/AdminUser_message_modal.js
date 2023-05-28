import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Create__Admin_fun,
  Reset__Admin_fun,
  reset_Create__Admin_options,
} from "../../../Slice/Admin/AdminAllAdmins/AdminUserSlice";
import { CircularProgress } from "@mui/material";

export const ReseAdminPassoword = ({
  formData,
  setFormData,
  modal,
  setModal,
}) => {
  const dispatch = useDispatch();

  const { GetRole, Role_isSuccess, createRole_isSuccess } = useSelector(
    (state) => state?.reducer?.RoleSlice
  );

  const {
    get_All_Admin,
    Create__Admin,
    Create__Admin_isError,
    Create__Admin_isSuccess,
    Create__Admin_isLoading,
    Create__Admin_message,
  } = useSelector((state) => state?.reducer?.AdminUserSlice);

  const [userAdmin, setUserAdmin] = useState({
    password: "",
    confirm_password: "",
    user: formData.id,
  });

  useEffect(() => {
    if (Create__Admin_isSuccess) {
      setFormData({
        role: "",
        fullname: "",
        email: "",
        phone: "",
        id: null,
      });

      setModal(false);
    }

    return () => {};
  }, [Create__Admin_isSuccess]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserAdmin((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(Reset__Admin_fun(userAdmin));
  };

  return (
    <>
      {" "}
      <div className="fixed z-50 inset-0 overflow-y-auto ">
        <div className="flex items-center justify-center min-h-screen  px-4 ">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-25"></div>
          </div>
          <div className="bg-white   rounded-lg overflow-hidden w-[60%] lg:w-[40%]  shadow-xl transform transition-all ">
            <div className="border-b bord   ">
              <div className=" flex justify-between    px-7 py-3 items-center ">
                <div>
                  <h3 className="text-[20px] font-semibold ">Reset Password</h3>
                </div>

                <div>
                  <button
                    className="bg-[#B4B4B43D]  py-1 px-2 rounded-sm"
                    onClick={() => {
                      dispatch(reset_Create__Admin_options());
                      setModal(false);
                    }}
                  >
                    X
                  </button>
                </div>
              </div>

              <div>
                <div className="modal-content bg-white rounded-lg shadow-lg">
                  <form className="" onSubmit={handleSubmit}>
                    <div className="p-4">
                      <div className="mb-4">
                        <label htmlFor="" className="block mb-2">
                          password
                        </label>
                        <input
                          className="w-full p-2 border border-gray-300 rounded"
                          type="text"
                          name="password"
                          value={userAdmin.password}
                          placeholder="password"
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="" className="block mb-2">
                          password
                        </label>
                        <input
                          className="w-full p-2 border border-gray-300 rounded"
                          type="text"
                          name="confirm_password"
                          value={userAdmin.confirm_password}
                          placeholder="confirm_password"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="text-center flex justify-center pb-5">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-[70%]  block"
                      >
                        {Create__Admin_isLoading ? (
                          <CircularProgress style={{ color: "white" }} />
                        ) : (
                          "Submit"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const Create_Update_Admin_user = ({
  formData,
  setFormData,
  modal,
  setModal,
}) => {
  const dispatch = useDispatch();

  const { GetRole, Role_isSuccess, createRole_isSuccess } = useSelector(
    (state) => state?.reducer?.RoleSlice
  );

  const {
    get_All_Admin,

    Create__Admin,
    Create__Admin_isError,
    Create__Admin_isSuccess,
    Create__Admin_isLoading,
    Create__Admin_message,
  } = useSelector((state) => state?.reducer?.AdminUserSlice);

  const [userAdmin, setUserAdmin] = useState({
    role: formData.role,
    fullname: formData.fullname,
    email: formData.email,
    phone: formData.phone,
    id: formData.id,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserAdmin((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    setFormData({
      role: userAdmin.role,
      fullname: userAdmin.fullname,
      email: userAdmin.email,
      phone: userAdmin.phone,
      id: userAdmin.id,
    });
    dispatch(Create__Admin_fun(userAdmin));
  };

  return (
    <>
      {" "}
      <div className="fixed z-50 inset-0 overflow-y-auto ">
        <div className="flex items-center justify-center min-h-screen  px-4 ">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-25"></div>
          </div>
          <div className="bg-white   rounded-lg overflow-hidden w-[60%] lg:w-[40%]  shadow-xl transform transition-all ">
            <div className="border-b bord   ">
              <div className=" flex justify-between    px-7 py-3 items-center ">
                <div>
                  <h3 className="text-[20px] font-semibold ">Create Admin</h3>
                </div>

                <div>
                  <button
                    className="bg-[#B4B4B43D]  py-1 px-2 rounded-sm"
                    onClick={() => setModal(false)}
                  >
                    X
                  </button>
                </div>
              </div>

              <div>
                <div className="modal-content bg-white rounded-lg shadow-lg">
                  <form className="" onSubmit={handleSubmit}>
                    <div className="p-4">
                      <div className="mb-4">
                        <label htmlFor="" className="block mb-2">
                          Fullname
                        </label>
                        <input
                          className="w-full p-2 border border-gray-300 rounded"
                          type="text"
                          name="fullname"
                          value={userAdmin.fullname}
                          placeholder="fullname"
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="" className="block mb-2">
                          Email
                        </label>
                        <input
                          className="w-full p-2 border border-gray-300 rounded"
                          type="text"
                          name="email"
                          value={userAdmin.email}
                          placeholder="email"
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="" className="block mb-2">
                          Phone
                        </label>
                        <input
                          className="w-full p-2 border border-gray-300 rounded"
                          type="tel"
                          name="phone"
                          value={userAdmin.phone}
                          placeholder="phone"
                          onChange={handleInputChange}
                        />
                      </div>

                      <div>
                        <label htmlFor="" className="block mb-2">
                          Role
                        </label>

                        {formData?.id ? (
                          <>
                            <input
                              className="w-full p-2 border border-gray-300 rounded"
                              value={userAdmin.role}
                            />
                          </>
                        ) : (
                          <select
                            name="role"
                            value={userAdmin.role}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                          >
                            <>
                              <option value="">Select a grade</option>
                              {GetRole?.data.map((item) => (
                                <option
                                  key={item.id}
                                  value={item.name}
                                  className=" w-24"
                                >
                                  {item.name}
                                </option>
                              ))}
                            </>
                          </select>
                        )}
                      </div>
                    </div>
                    {/* {!Create__Admin_isLoading && (
                          <button className="form-submit" type="submit">
                            Submit
                          </button>
                        )} */}

                    <div className="text-center ">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
                      >
                        {Create__Admin_isLoading ? (
                          <CircularProgress style={{ color: "white" }} />
                        ) : (
                          "Submit"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
